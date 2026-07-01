export type QRInputType = "url" | "text" | "phone" | "email" | "wifi";

export type QRDotType =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";

export type QRCornerType = "square" | "extra-rounded" | "dot";

export type QRFormat = "png" | "svg" | "pdf";

export type WifiEncryption = "WPA" | "WEP" | "nopass";

export type WifiConfig = {
  ssid: string;
  password: string;
  hidden: boolean;
  encryption: WifiEncryption;
};

export type LabelStyle = {
  color: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
};

export type QRSettings = {
  inputType: QRInputType;
  url: string;
  text: string;
  phone: string;
  email: string;
  wifi: WifiConfig;
  fgColor: string;
  bgColor: string;
  cornerSquareColor: string;
  cornerDotColor: string;
  size: number;
  dotType: QRDotType;
  cornerType: QRCornerType;
  margin: number;
  logo: string | null;
  logoSize: number;
  label: string;
  labelColor: string;
  labelFontSize: number;
  labelBold: boolean;
  labelItalic: boolean;
  fileName: string;
};

export const DEFAULT_QR_SETTINGS: QRSettings = {
  inputType: "url",
  url: "",
  text: "",
  phone: "",
  email: "",
  wifi: { ssid: "", password: "", hidden: false, encryption: "WPA" },
  fgColor: "#000000",
  bgColor: "#ffffff",
  cornerSquareColor: "#000000",
  cornerDotColor: "#000000",
  size: 300,
  dotType: "square",
  cornerType: "square",
  margin: 10,
  logo: null,
  logoSize: 0.3,
  label: "",
  labelColor: "#000000",
  labelFontSize: 14,
  labelBold: false,
  labelItalic: false,
  fileName: "qr-code",
};

export const DOT_TYPE_OPTIONS: { value: QRDotType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "extra-rounded", label: "Extra Round" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy Round" },
];

export const CORNER_TYPE_OPTIONS: { value: QRCornerType; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "extra-rounded", label: "Rounded" },
  { value: "dot", label: "Dot" },
];

export const SIZE_OPTIONS: { value: number; label: string }[] = [
  { value: 200, label: "SM" },
  { value: 300, label: "MD" },
  { value: 400, label: "LG" },
  { value: 500, label: "XL" },
];

export type SocialPreset = {
  name: string;
  brandColor: string;
  logoUrl: string;
  fgColor: string;
  bgColor: string;
  cornerSquareColor: string;
  cornerDotColor: string;
  dotType: QRDotType;
  cornerType: QRCornerType;
};

export const SOCIAL_PRESETS: SocialPreset[] = [
  { name: "Instagram", brandColor: "#E1306C", logoUrl: "https://cdn.simpleicons.org/instagram/E1306C", fgColor: "#E1306C", bgColor: "#ffffff", cornerSquareColor: "#833AB4", cornerDotColor: "#833AB4", dotType: "dots", cornerType: "dot" },
  { name: "Facebook",  brandColor: "#1877F2", logoUrl: "https://cdn.simpleicons.org/facebook/1877F2", fgColor: "#1877F2", bgColor: "#ffffff", cornerSquareColor: "#1877F2", cornerDotColor: "#1877F2", dotType: "dots", cornerType: "dot" },
  { name: "YouTube",   brandColor: "#FF0000", logoUrl: "https://cdn.simpleicons.org/youtube/FF0000",  fgColor: "#FF0000", bgColor: "#ffffff", cornerSquareColor: "#282828", cornerDotColor: "#282828", dotType: "dots", cornerType: "dot" },
  { name: "LinkedIn",  brandColor: "#0A66C2", logoUrl: "/icons/social/linkedin.svg", fgColor: "#0A66C2", bgColor: "#ffffff", cornerSquareColor: "#0A66C2", cornerDotColor: "#0A66C2", dotType: "dots", cornerType: "dot" },
  { name: "Pinterest", brandColor: "#E60023", logoUrl: "https://cdn.simpleicons.org/pinterest/E60023",fgColor: "#E60023", bgColor: "#ffffff", cornerSquareColor: "#E60023", cornerDotColor: "#E60023", dotType: "dots", cornerType: "dot" },
  { name: "X",         brandColor: "#000000", logoUrl: "https://cdn.simpleicons.org/x/000000",        fgColor: "#000000", bgColor: "#ffffff", cornerSquareColor: "#000000", cornerDotColor: "#000000", dotType: "dots", cornerType: "dot" },
  { name: "TikTok",    brandColor: "#010101", logoUrl: "https://cdn.simpleicons.org/tiktok/010101",   fgColor: "#010101", bgColor: "#ffffff", cornerSquareColor: "#FE2C55", cornerDotColor: "#FE2C55", dotType: "dots", cornerType: "dot" },
  { name: "WhatsApp",  brandColor: "#25D366", logoUrl: "https://cdn.simpleicons.org/whatsapp/25D366", fgColor: "#25D366", bgColor: "#ffffff", cornerSquareColor: "#128C7E", cornerDotColor: "#128C7E", dotType: "dots", cornerType: "dot" },
  { name: "Snapchat",  brandColor: "#FFFC00", logoUrl: "https://cdn.simpleicons.org/snapchat/000000", fgColor: "#000000", bgColor: "#FFFC00", cornerSquareColor: "#000000", cornerDotColor: "#000000", dotType: "dots", cornerType: "dot" },
  { name: "Telegram",  brandColor: "#26A5E4", logoUrl: "https://cdn.simpleicons.org/telegram/26A5E4", fgColor: "#26A5E4", bgColor: "#ffffff", cornerSquareColor: "#1A7DB5", cornerDotColor: "#1A7DB5", dotType: "dots", cornerType: "dot" },
  { name: "Google",       brandColor: "#4285F4", logoUrl: "/icons/social/google.svg",                          fgColor: "#4285F4", bgColor: "#ffffff", cornerSquareColor: "#EA4335", cornerDotColor: "#34A853", dotType: "dots", cornerType: "dot" },
  { name: "App Store",   brandColor: "#0D96F6", logoUrl: "/icons/social/appstore.svg",   fgColor: "#0D96F6", bgColor: "#ffffff", cornerSquareColor: "#0D96F6", cornerDotColor: "#007AFF", dotType: "dots", cornerType: "dot" },
  { name: "Google Play", brandColor: "#34A853", logoUrl: "/icons/social/googleplay.svg", fgColor: "#34A853", bgColor: "#ffffff", cornerSquareColor: "#EA4335", cornerDotColor: "#FBBC04", dotType: "dots", cornerType: "dot" },
];
