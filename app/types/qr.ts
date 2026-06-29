export type QRInputType = "url" | "text" | "phone" | "wifi";

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

export type QRSettings = {
  inputType: QRInputType;
  url: string;
  text: string;
  phone: string;
  wifi: WifiConfig;
  fgColor: string;
  bgColor: string;
  size: number;
  dotType: QRDotType;
  cornerType: QRCornerType;
  margin: number;
  logo: string | null;
  logoSize: number;
  label: string;
  fileName: string;
};

export const DEFAULT_QR_SETTINGS: QRSettings = {
  inputType: "url",
  url: "",
  text: "",
  phone: "",
  wifi: { ssid: "", password: "", hidden: false, encryption: "WPA" },
  fgColor: "#000000",
  bgColor: "#ffffff",
  size: 300,
  dotType: "square",
  cornerType: "square",
  margin: 10,
  logo: null,
  logoSize: 0.4,
  label: "",
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
