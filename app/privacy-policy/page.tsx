import { Metadata } from "next";
import Layout from '../components/layout'
import Privacypolicy from '../components/privacy-policy'
export const metadata: Metadata = {
    title: "Privacy Policy | Techmin.click",
    description: "Privacy policy for Techmin.click Text Formatter",
};
function PrivacyPlocypage() {
    return (
        <Layout>
            <Privacypolicy />
        </Layout>
    )
}

export default PrivacyPlocypage
