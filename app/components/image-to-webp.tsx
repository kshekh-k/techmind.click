'use client';

import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

import { Progress } from '@/app/components/ui/progress';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface ConvertedFile {
    originalFile: File;
    name: string;
    blob?: Blob;
    status: 'Pending' | 'Converting' | 'Done' | 'Failed';
    progress: number;
}

const ImageToWebp = () => {
    const [convertedImages, setConvertedImages] = useState<ConvertedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const updateFileStatus = (index: number, update: Partial<ConvertedFile>) => {
        setConvertedImages((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], ...update };
            return copy;
        });
    };

    const convertFile = async (file: File, index: number) => {
        updateFileStatus(index, { status: 'Converting', progress: 10 });

        const options = {
            maxSizeMB: 5,
            fileType: 'image/webp',
            maxWidthOrHeight: 2000,
            useWebWorker: true,
            onProgress: (p: number) => {
                updateFileStatus(index, { progress: 10 + Math.floor((p * 80) / 100) });
            },
        };

        try {
            const blob = await imageCompression(file, options);
            updateFileStatus(index, {
                blob,
                status: 'Done',
                progress: 100,
            });
        } catch (err) {
            console.error('Error converting file:', file.name, err);
            updateFileStatus(index, { status: 'Failed', progress: 0 });
        }
    };

    const handleFiles = async (files: FileList | File[]) => {
        const newFiles: ConvertedFile[] = Array.from(files).map((file) => ({
            originalFile: file,
            name: file.name.replace(/\.[^/.]+$/, '.webp'),
            status: 'Pending',
            progress: 0,
        }));
        setConvertedImages((prev) => [...prev, ...newFiles]);

        newFiles.forEach((file, idx) => {
            const globalIndex = convertedImages.length + idx;
            convertFile(file.originalFile, globalIndex);
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) handleFiles(files);
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        },
        [convertedImages]
    );

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDownloadZip = async () => {
        const zip = new JSZip();
        convertedImages.forEach(({ blob, name }) => {
            if (blob) {
                zip.file(name, blob);
            }
        });
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'converted-images.zip');
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Image to WebP Converter</h1>
                    <p className="text-muted-foreground mt-2">
                        Convert images to modern WebP format with adjustable quality.
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors relative ${isDragging
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary'
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center space-y-3">
                                <ImageIcon className="w-10 h-10 text-muted-foreground" />
                                {isDragging ? (
                                    <p className="font-medium">Drop images here...</p>
                                ) : (
                                    <>
                                        <p className="font-medium">Drag & drop images here</p>
                                        <p className="text-sm text-muted-foreground">
                                            or click to browse files
                                        </p>
                                    </>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Supported: JPG, PNG (Max 10 files)
                                </p>
                            </div>
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleInputChange}
                                className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                            />
                        </div>
                    </CardContent>
                </Card>

                {convertedImages.length > 0 && (
                    <div className="space-y-4">
                        <Button onClick={handleDownloadZip} variant="secondary">
                            Download All as ZIP
                        </Button>

                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                            {convertedImages.map(({ name, status, blob, progress }, idx) => (
                                <Card key={idx}>
                                    <CardContent className="p-4 space-y-3">
                                        <div className="font-medium">{name}</div>
                                        <div className="text-sm">
                                            Status:{' '}
                                            <span
                                                className={
                                                    status === 'Done'
                                                        ? 'text-green-600'
                                                        : status === 'Converting'
                                                            ? 'text-blue-500'
                                                            : status === 'Failed'
                                                                ? 'text-red-500'
                                                                : 'text-muted-foreground'
                                                }
                                            >
                                                {status}
                                            </span>
                                        </div>
                                        <Progress value={progress} className="h-2" variant={status === 'Done' ? 'success' : 'default'} />
                                        {status === 'Done' && blob && (
                                            <a
                                                href={URL.createObjectURL(blob)}
                                                download={name}
                                                className="inline-block"
                                            >
                                                <Button size="sm" variant="success">
                                                    Download
                                                </Button>
                                            </a>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageToWebp;
