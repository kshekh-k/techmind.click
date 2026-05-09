"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpDown, FileText, ImageIcon, Loader2, Move, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { formatFileSize } from "@/app/lib/utils";

type PreviewItem = {
  file: File;
  url: string;
};

const ACCEPTED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MAX_FILES = 10;

function pickAcceptedImages(list: FileList | null): File[] {
  if (!list) {
    return [];
  }

  return Array.from(list).filter((file) => ACCEPTED_TYPES.has(file.type));
}

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [outputFilename, setOutputFilename] = useState("converted");
  const [isDraggingItem, setIsDraggingItem] = useState<number | null>(null);
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);

  const downloadRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo<PreviewItem[]>(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files]
  );

  useEffect(() => {
    return () => {
      for (const preview of previews) {
        URL.revokeObjectURL(preview.url);
      }
    };
  }, [previews]);

  const appendFiles = useCallback((newFiles: File[]) => {
    if (newFiles.length === 0) {
      return;
    }

    setFiles((current) => [...current, ...newFiles].slice(0, MAX_FILES));
  }, []);

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selected = pickAcceptedImages(event.target.files);
      appendFiles(selected);
      event.target.value = "";
    },
    [appendFiles]
  );

  const handleDropzoneDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDropzoneActive(true);
  }, []);

  const handleDropzoneDragLeave = useCallback(() => {
    setIsDropzoneActive(false);
  }, []);

  const handleDropzoneDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDropzoneActive(false);
      appendFiles(pickAcceptedImages(event.dataTransfer.files));
    },
    [appendFiles]
  );

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  }, []);

  const moveFile = useCallback((fromIndex: number, toIndex: number) => {
    setFiles((current) => {
      const next = [...current];
      const [removed] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, removed);
      return next;
    });
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setIsDraggingItem(index);
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>, index: number) => {
      event.preventDefault();
      if (isDraggingItem === null || isDraggingItem === index) {
        return;
      }
      moveFile(isDraggingItem, index);
      setIsDraggingItem(index);
    },
    [isDraggingItem, moveFile]
  );

  const handleDragEnd = useCallback(() => {
    setIsDraggingItem(null);
  }, []);

  const sortByName = useCallback(() => {
    setFiles((current) => [...current].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const sortBySize = useCallback(() => {
    setFiles((current) => [...current].sort((a, b) => a.size - b.size));
  }, []);

  const convertToPdf = useCallback(async () => {
    if (files.length === 0) {
      return;
    }

    setIsConverting(true);

    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append("images", file);
      }

      const response = await fetch("/api/image-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Conversion failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (downloadRef.current) {
        downloadRef.current.href = url;
        downloadRef.current.download = `${(outputFilename || "converted").trim() || "converted"}.pdf`;
        downloadRef.current.click();
      }

      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      alert("Failed to convert images to PDF. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [files, outputFilename]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">Image to PDF Converter</h1>
          <p className="text-muted-foreground">Convert multiple images into a single PDF document</p>
        </header>

        <Card>
          <CardContent className="p-6">
            <div
              onDragOver={handleDropzoneDragOver}
              onDragLeave={handleDropzoneDragLeave}
              onDrop={handleDropzoneDrop}
              onClick={openFilePicker}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openFilePicker();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload images for PDF conversion"
              className={`border-2 border-dashed p-8 rounded-lg text-center transition-colors cursor-pointer ${
                isDropzoneActive ? "border-primary bg-primary/10" : "border-border hover:border-primary"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="flex flex-col items-center space-y-3">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
                {isDropzoneActive ? (
                  <p className="font-medium">Drop images here...</p>
                ) : (
                  <>
                    <p className="font-medium">Drag and drop images here</p>
                    <p className="text-sm text-muted-foreground">or press Enter / click to browse files</p>
                  </>
                )}
                <p className="text-xs text-muted-foreground">Supported: JPG, PNG, WEBP (Max {MAX_FILES} files)</p>
              </div>
            </div>

            {files.length > 0 && (
              <section className="mt-6 space-y-4" aria-label="Selected files">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <h2 className="font-medium">Selected Images ({files.length})</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={sortByName} className="gap-1" aria-label="Sort images by name">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort by Name</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={sortBySize} className="gap-1" aria-label="Sort images by file size">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort by Size</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {previews.map((preview, index) => (
                    <div
                      key={`${preview.file.name}-${preview.file.size}-${index}`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(event) => handleDragOver(event, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-3 p-2 border rounded-md ${
                        isDraggingItem === index ? "bg-accent/50" : "bg-background"
                      }`}
                    >
                      <Move className="h-4 w-4 text-muted-foreground cursor-move" aria-hidden="true" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-muted rounded overflow-hidden">
                            <img
                              src={preview.url}
                              alt={preview.file.name}
                              width={40}
                              height={40}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{preview.file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(preview.file.size)}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${preview.file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="filename">Output Filename</Label>
                    <Input
                      id="filename"
                      value={outputFilename}
                      onChange={(event) => setOutputFilename(event.target.value)}
                      placeholder="Enter filename"
                    />
                  </div>

                  <Button variant="blue" onClick={convertToPdf} disabled={isConverting} className="w-full gap-2">
                    {isConverting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Convert to PDF
                      </>
                    )}
                  </Button>
                </div>
              </section>
            )}

            <a ref={downloadRef} className="hidden" />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Move className="w-5 h-5 text-primary" />,
              title: "Rearrange Images",
              text: "Drag and drop to reorder images before converting to PDF.",
            },
            {
              icon: <ArrowUpDown className="w-5 h-5 text-primary" />,
              title: "Sort Options",
              text: "Sort images by name or size with one click.",
            },
            {
              icon: <FileText className="w-5 h-5 text-primary" />,
              title: "Custom Naming",
              text: "Choose your preferred filename for the output PDF.",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">{item.icon}</div>
                  <CardTitle className="text-base font-medium">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
