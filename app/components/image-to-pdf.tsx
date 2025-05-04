'use client';

import { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Loader2, ImageIcon, FileText, ArrowUpDown, Move, X } from 'lucide-react';
import { formatFileSize } from '@/app/lib/utils';
import Image from 'next/image';  // Import Next.js Image component

export default function ImageToPdf() {
    const [files, setFiles] = useState<File[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [outputFilename, setOutputFilename] = useState('converted');
    const [isDragging, setIsDragging] = useState<number | null>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
        maxFiles: 10,
        onDrop: acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles]),
    });

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const moveFile = (fromIndex: number, toIndex: number) => {
        const newFiles = [...files];
        const [removed] = newFiles.splice(fromIndex, 1);
        newFiles.splice(toIndex, 0, removed);
        setFiles(newFiles);
    };

    const handleDragStart = (index: number) => setIsDragging(index);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        if (isDragging === null || isDragging === index) return;
        moveFile(isDragging, index);
        setIsDragging(index);
    };

    const handleDragEnd = () => setIsDragging(null);

    const sortByName = () => {
        const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
        setFiles(sorted);
    };

    const sortBySize = () => {
        const sorted = [...files].sort((a, b) => a.size - b.size);
        setFiles(sorted);
    };

    const convertToPdf = async () => {
        if (files.length === 0) return;
        setIsConverting(true);
        try {
            const formData = new FormData();
            files.forEach(file => formData.append('images', file));

            const response = await fetch('/api/image-to-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Conversion failed');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            if (downloadRef.current) {
                downloadRef.current.href = url;
                downloadRef.current.download = `${outputFilename}.pdf`;
                downloadRef.current.click();
            }
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Failed to convert images to PDF. Please try again.');
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Image to PDF Converter</h1>
                    <p className="text-muted-foreground">Convert multiple images into a single PDF document</p>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed p-8 rounded-lg text-center transition-colors cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'}`}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center space-y-3">
                                <ImageIcon className="w-10 h-10 text-muted-foreground" />
                                {isDragActive ? (
                                    <p className="font-medium">Drop images here...</p>
                                ) : (
                                    <>
                                        <p className="font-medium">Drag & drop images here</p>
                                        <p className="text-sm text-muted-foreground">or click to browse files</p>
                                    </>
                                )}
                                <p className="text-xs text-muted-foreground">Supported: JPG, PNG, WEBP (Max 10 files)</p>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">Selected Images ({files.length})</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={sortByName} className="gap-1">
                                            <ArrowUpDown className="h-4 w-4" /> <span>Sort by Name</span>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={sortBySize} className="gap-1">
                                            <ArrowUpDown className="h-4 w-4" /> <span>Sort by Size</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDragEnd={handleDragEnd}
                                            className={`flex items-center gap-3 p-2 border rounded-md ${isDragging === index ? 'bg-accent/50' : 'bg-background'}`}
                                        >
                                            <Move className="h-4 w-4 text-muted-foreground cursor-move" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10 bg-muted rounded overflow-hidden">
                                                        {/* Use Next.js Image component for optimization */}
                                                        <Image
                                                            src={URL.createObjectURL(file)}
                                                            alt={file.name}
                                                            width={40}
                                                            height={40}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFile(index)} className="text-muted-foreground hover:text-destructive">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 space-y-4">
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="filename">Output Filename</Label>
                                        <Input id="filename" value={outputFilename} onChange={(e) => setOutputFilename(e.target.value)} placeholder="Enter filename" />
                                    </div>
                                    <Button variant={'blue'} onClick={convertToPdf} disabled={isConverting} className="w-full gap-2">
                                        {isConverting ? (
                                            <><Loader2 className="h-4 w-4 animate-spin" /> Converting...</>
                                        ) : (
                                            <><FileText className="h-4 w-4" /> Convert to PDF</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                        <a ref={downloadRef} className="hidden" />
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    {[{
                        icon: <Move className="w-5 h-5 text-primary" />,
                        title: 'Rearrange Images',
                        text: 'Drag and drop to reorder images before converting to PDF.'
                    }, {
                        icon: <ArrowUpDown className="w-5 h-5 text-primary" />,
                        title: 'Sort Options',
                        text: 'Sort images by name or size with one click.'
                    }, {
                        icon: <FileText className="w-5 h-5 text-primary" />,
                        title: 'Custom Naming',
                        text: 'Choose your preferred filename for the output PDF.'
                    }].map((item, i) => (
                        <Card key={i}>
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
