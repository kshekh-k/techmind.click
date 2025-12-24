import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
    {
        href: "/",
        label: "Case Converter"
    },
    {
        href: "/image-to-pdf",
        label: "Image to PDF"
    },
    {
        href: "/blogs",
        label: "Blogs"
    }
]

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto flex h-14 items-center justify-between">
                <div className="px-3 md:px-4 flex justify-center md:justify-between flex-1">
                    <Link href="/" title="Techmind.click" className="mr-6 flex items-center space-x-2">
                        <Image src="/techmind-click-logo.svg" alt="Techmind.click logo" title="Techmind.click" width={40} height={40} className="w-40 h-auto" />
                    </Link>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {LINKS.map(link => (
                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuLink href={link.href} title={link.label} className={navigationMenuTriggerStyle()}>
                                        {link.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden items-center space-x-2">
                    <Button variant="outline" asChild>
                        <Link href="/login" title="Login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup" title="Sign Up">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
