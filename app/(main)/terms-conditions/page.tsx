import React from 'react'
import { Metadata } from "next";
import Terms from '../components/terms-and-conditions';
import Layout from '../components/layout';
export const metadata: Metadata = {
        title: "Terms and Conditions | TechMind",
        description: "Read our Terms and Conditions to understand the rules and guidelines for using our services.",
};
function TermsPage() {
        return (
                <Layout>
                        <Terms />
                </Layout>
        )
}

export default TermsPage
