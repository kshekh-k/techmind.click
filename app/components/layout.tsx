import React from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
