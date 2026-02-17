
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Code, ImageIcon, LayoutDashboard, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";


export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">About TechMind</h1>
                <p className="text-muted-foreground max-w-4xl mx-auto">Welcome to TechMind Click, a reliable online platform built to simplify everyday text formatting tasks. Our goal is to provide fast, accurate, and easy-to-use tools that help students, professionals, writers, and businesses manage and format text content efficiently.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle as="h2" className="text-2xl">Who We Are</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            TechMind Click was created to solve common text editing challenges. Whether you need to convert text case, clean unwanted formatting, or quickly edit content, our tools are designed to save time and improve productivity without requiring complex software.

                        </p>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">Our Expertise</h3>
                            <p className="text-muted-foreground">
                                We specialize in browser-based text formatting solutions that deliver instant and accurate results. Our tools are developed with a focus on:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-5">
                                <li>Speed and performance</li>
                                <li>Accuracy and reliability</li>
                                <li>Simple and user-friendly design</li>
                                <li>Cross-device compatibility</li>
                                <li>Secure processing</li>
                            </ul>
                            <p className="text-muted-foreground">Every feature is carefully tested to ensure consistent performance and ease of use.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">Our Commitment to Quality</h3>
                            <p className="text-muted-foreground">
                                We continuously monitor and improve our tools to maintain high standards of usability and functionality. Our platform is updated regularly to ensure smooth performance and a better user experience.
                            </p>

                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">Privacy & Security</h3>
                            <p className="text-muted-foreground">
                                User trust is important to us. Our text formatter works directly in your browser, and we do not store, save, or track the content you process. Your data remains private and secure at all times.
                            </p>

                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">Who We Serve</h3>
                            <p className="text-muted-foreground">
                                TechMind Click is built for:
                            </p>
                            <ul className="text-muted-foreground list-disc pl-5">
                                <li>Students preparing assignments and academic projects</li>
                                <li>Writers and bloggers formatting content</li>
                                <li>Professionals drafting reports and emails</li>
                                <li>Anyone who needs quick and efficient text formatting</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                            <p className="text-muted-foreground">
                                Our vision is to become a trusted destination for smart online productivity tools. We aim to expand our platform with practical and reliable utilities while maintaining transparency, security, and user satisfaction.
                            </p>

                        </div>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle as="h2" className="text-2xl">Our Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Advanced Text Formatting</h3>
                                    <p className="text-muted-foreground">
                                        Transform your plain text into beautifully formatted content with our powerful tools. Whether you need Markdown conversion, code formatting, or rich text editing, we've got you covered.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <ImageIcon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Image Processing</h3>
                                    <p className="text-muted-foreground">
                                        Enhance, resize, convert, and optimize your images with our intuitive tools. From basic cropping to advanced filters, we provide everything you need for perfect visuals.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <LayoutDashboard className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">User-Friendly Interface</h3>
                                    <p className="text-muted-foreground">
                                        Our tools are designed with simplicity in mind. No technical expertise required -
                                        just instant results with minimal effort.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Secure Processing</h3>
                                    <p className="text-muted-foreground">
                                        Your data privacy is our priority. All processing happens in your browser when possible,
                                        with no unnecessary data storage.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle as="h2" className="text-2xl">Why Choose TechMind?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full mt-1">
                                <Rocket className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Speed & Efficiency</h3>
                                <p className="text-muted-foreground">
                                    Our tools are optimized for performance, delivering instant results without compromising quality.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full mt-1">
                                <Rocket className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">No Hidden Costs</h3>
                                <p className="text-muted-foreground">
                                    We believe in transparent pricing with no surprise fees. Many of our tools are completely free to use.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full mt-1">
                                <Rocket className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Continuous Innovation</h3>
                                <p className="text-muted-foreground">
                                    We&apos;re constantly updating our tools with new features based on user feedback and industry trends.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center mt-8">
                    <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Content?</h2>
                    <Button asChild>
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}