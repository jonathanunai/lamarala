/**
 * Migrates images from Firebase Storage to Cloudinary.
 * Run once: node scripts/migrate-images.mjs
 */

import { v2 as cloudinary } from 'cloudinary'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load .env manually (no dotenv dependency needed in Node 20+)
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => l.split('=').map((s) => s.trim()))
)

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

const BUCKET = 'la-mar-sala.appspot.com'

// All images stored under images/ in Firebase Storage
const images = [
  { file: 'la-mar-sala-portada.jpg' },
  { file: 'menu-degustacion.jpg' },
  ...Array.from({ length: 8 }, (_, i) => ({ file: `section${i + 1}.jpeg` })),
]

function firebaseUrl(fileName) {
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/images%2F${encodeURIComponent(fileName)}?alt=media`
}

async function migrate(image) {
  const url = firebaseUrl(image.file)
  const publicId = `images/${image.file.replace(/\.[^.]+$/, '')}`

  process.stdout.write(`  Uploading ${image.file} … `)

  try {
    const result = await cloudinary.uploader.upload(url, {
      public_id: publicId,
      overwrite: true,
    })
    console.log(`✓  ${result.secure_url}`)
  } catch (err) {
    console.log(`✗  ${err.message}`)
  }
}

console.log(`\nMigrating ${images.length} images to Cloudinary (${env.CLOUDINARY_CLOUD_NAME})…\n`)

for (const image of images) {
  await migrate(image)
}

console.log('\nDone.')
