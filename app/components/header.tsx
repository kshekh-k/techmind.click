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
const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto flex h-14 items-center justify-between">
                <div className="mr-4 hidden md:flex justify-between flex-1">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image src="/techmind-click-logo.svg" alt="logo" width={40} height={40} className="w-40 h-auto" />
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Case Converter
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            {/* <NavigationMenuItem>
                                <Link href="/image-to-webp" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Image to WebP
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem> */}
                            <NavigationMenuItem>
                                <Link href="/image-to-pdf" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Image to PDF
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden items-center space-x-2">
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
