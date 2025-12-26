
import "./globals.css";
export const metadata = {
    title: {
        default: "TechMind",
        template: "%s | TechMind",
    },
    description: "TechMind - Free online tools for text formatting and image conversion.",
    keywords: [
        "TechMind – Online Text Formatting & Editing Tools",
        "text case converter",
        "text formatter",
        "slug converter",
        "case converter online",
        "uppercase to lowercase",
        "lowercase to uppercase",
        "sentence case converter",
    ].join(', ')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">            
                {children}      
            </body>
        </html>
    );
}
