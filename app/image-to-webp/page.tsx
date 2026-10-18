import ImageToWebp from "@/app/components/image-to-webp";
import Layout from "@/app/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to WebP Converter",
  description:
    "Convert PNG and JPG images to high-efficiency WebP format in your browser. Fast, private, and free with no file uploads.",
  alternates: {
    canonical: "/image-to-webp",
  },
};

const ImageConverter = () => {
  return (
    <Layout>
      <ImageToWebp />
    </Layout>
  );
};

export default ImageConverter;
