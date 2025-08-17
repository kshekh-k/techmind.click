import Layout from "@/app/components/layout";
import Privacypolicy from "@/app/components/privacy-policy";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | Techmin.click",
  description: "Privacy policy for Techmin.click Text Formatter",
};
function PrivacyPlocypage() {
  return (
    <Layout>
      <Privacypolicy />
    </Layout>
  );
}

export default PrivacyPlocypage;
