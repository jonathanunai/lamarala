import { d as defineEventHandler, r as readMultipartFormData, c as createError, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import { v2 } from 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const uploadImage_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  v2.config({
    cloud_name: config.public.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, message: "No form data received" });
  }
  const filePart = formData.find((f) => f.name === "file");
  const publicIdPart = formData.find((f) => f.name === "public_id");
  if (!filePart) {
    throw createError({ statusCode: 400, message: "No file provided" });
  }
  const publicId = publicIdPart ? `images/${publicIdPart.data.toString().trim()}` : "images/upload";
  const base64 = `data:${filePart.type};base64,${filePart.data.toString("base64")}`;
  const result = await v2.uploader.upload(base64, {
    public_id: publicId,
    overwrite: true,
    invalidate: true
  });
  return { url: result.secure_url };
});

export { uploadImage_post as default };
//# sourceMappingURL=upload-image.post.mjs.map
