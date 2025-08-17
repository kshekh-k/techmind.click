import { strapi } from "@strapi/client";

export const strapiClient = strapi({
  baseURL: process.env.STRAPI_URL + "/api" || "",
  auth: process.env.STRAPI_API_TOKEN,
});
