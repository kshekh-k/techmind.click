
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Code, ImageIcon, LayoutDashboard, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";


export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">About TechMind</h1>
                <p className="text-muted-foreground">Transforming content with precision and creativity</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Story</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            Welcome to <strong>TechMind.click</strong>, where we bridge the gap between technology and creativity.
                            Founded with a vision to simplify digital content creation, we specialize in advanced text formatting
                            and image processing solutions that empower individuals and businesses alike.
                        </p>
                        <p>
                            Based in Jaipur, India, our team of developers and designers came together with a shared passion
                            for creating tools that make content formatting effortless and efficient.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Our Services</CardTitle>
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
                                        Transform your plain text into beautifully formatted content with our powerful tools.
                                        Whether you need Markdown conversion, code formatting, or rich text editing, we've got you covered.
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
                                        Enhance, resize, convert, and optimize your images with our intuitive tools.
                                        From basic cropping to advanced filters, we provide everything you need for perfect visuals.
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
                        <CardTitle className="text-2xl">Why Choose TechMind?</CardTitle>
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
                                    We're constantly updating our tools with new features based on user feedback and industry trends.
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