import React from 'react'
import Layout from '../components/layout'
import { Metadata } from "next";
import AboutPage from '../components/about-us';
export const metadata: Metadata = {
    title: "About Us | TechMind",
    description: "Learn about TechMind - your solution for advanced text formatting and image processing needs.",
};

function Aboutuspage() {
    return (
        <Layout>
            <AboutPage />
        </Layout>
    )
}

export default Aboutuspage
