// app/contact/page.tsx
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
// import { toast } from "@/app/components/ui/use-toast";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
export default function Contactus() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                <p className="text-muted-foreground max-w-4xl mx-auto">We’d love to hear from you. If you have any questions, feedback, or suggestions about our text formatting tools, feel free to reach out. Our team is here to assist you and will respond as quickly as possible during business hours.
</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action="/api/contact" method="POST" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input id="name" name="name" placeholder="Enter your name" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Your Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Enter your message"
                                        rows={5}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                            <div className="mt-6 flex items-center justify-center gap-4">
                                <a
                                    href="https://www.facebook.com/kshekh01011986"
                                    aria-label="Facebook"
                                    className="rounded-full border p-2 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Facebook className="size-5" />
                                </a>
                                <a
                                    href="https://x.com/kamranshekh"
                                    aria-label="X"
                                    className="rounded-full border p-2 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <FaXTwitter className="size-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/kshekh/"
                                    aria-label="LinkedIn"
                                    className="rounded-full border p-2 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Linkedin className="size-5" />
                                </a>
                                <a
                                    href="https://www.instagram.com/kshekh/"
                                    aria-label="Instagram"
                                    className="rounded-full border p-2 text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Instagram className="size-5" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Mail className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Email Us</h3>
                                    
                                    <p className="text-muted-foreground">
                                        <a
                                            href="mailto:kshekh@gmail.com"
                                            className="hover:text-primary hover:underline"
                                        >
                                            kshekh@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <MapPin className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Our Location</h3>
                                    <p className="text-muted-foreground">
                                       Narayanpuri, Jhotwara
                                    </p>
                                    <p className="text-muted-foreground">Jaipur, Rajasthan 302012</p>
                                    <p className="text-muted-foreground">India</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Business Hours</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monday - Sunday</span>
                                    <span>24/7</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Contact</span>
                                    <span>Via Email</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
