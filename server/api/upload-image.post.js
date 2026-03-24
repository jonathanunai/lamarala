import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  cloudinary.config({
    cloud_name: config.public.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  })

  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, message: 'No form data received' })
  }

  const filePart = formData.find((f) => f.name === 'file')
  const publicIdPart = formData.find((f) => f.name === 'public_id')

  if (!filePart) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const publicId = publicIdPart
    ? `images/${publicIdPart.data.toString().trim()}`
    : 'images/upload'

  const base64 = `data:${filePart.type};base64,${filePart.data.toString('base64')}`

  const result = await cloudinary.uploader.upload(base64, {
    public_id: publicId,
    overwrite: true,
    invalidate: true,
  })

  return { url: result.secure_url }
})
