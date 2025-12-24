import { strapi } from "@strapi/client";

const base = process.env.STRAPI_URL ? `${process.env.STRAPI_URL.replace(/\/$/, "")}/api` : "";

export const strapiClient = strapi({
  baseURL: base,
  auth: process.env.STRAPI_API_TOKEN,
});
