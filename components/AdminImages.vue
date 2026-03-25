<template>
  <div class="image-upload image-grid">
    <div v-for="image in images" :key="image.name" class="card">
      <label for="imageUrl">Imagen de {{ image.name }}:</label>
      <img :src="longUrl(image.fileName)" class="img" alt="" />

      <button
        :disabled="isUploadingImage"
        class="admin-button"
        type="button"
        @click="launchImageFile(image)"
      >
        {{ isUploadingImage ? 'Subiendo...' : 'Cambiar imagen' }}
      </button>
      <!-- This is the real file input element. -->
      <input
        :ref="image.fileName"
        type="file"
        accept="image/png, image/jpeg"
        class="hidden"
        @change.prevent="uploadImageFile($event.target.files, image)"
      />
    </div>

    <div class="flex-row">
      <div class="admin-button" @click="$emit('cancel')">Volver</div>
    </div>
  </div>
</template>
<script>
import { useAppStore } from '~/stores/app'

function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  })
}

export default {
  emits: ['cancel'],
  setup() {
    return { store: useAppStore() }
  },
  data() {
    return {
      fixedImages: {
        portada: { fileName: 'la-mar-sala-portada.jpg', name: 'la portada' },
        menuDegustacion: {
          fileName: 'menu-degustacion.jpg',
          name: 'Menú degustación',
        },
      },
      isUploadingImage: false,
    }
  },
  computed: {
    images() {
      const aux = {}
      for (let i = 1; i <= 8; i++) {
        const name = `section${i}`
        aux[name] = {
          fileName: `${name}.jpeg`,
          name: `la seccion de Menú ${name}`,
        }
      }
      return { ...this.fixedImages, ...aux }
    },
  },
  methods: {
    launchImageFile(image) {
      this.$refs[image.fileName][0].click()
    },
    longUrl(file) {
      if (this.store.imageUrls[file]) return this.store.imageUrls[file]
      const publicId = file.replace(/\.[^.]+$/, '')
      return `https://res.cloudinary.com/dk7j4vigg/image/upload/images/${publicId}`
    },
    async uploadImageFile(files, image) {
      if (!files.length) return
      const file = renameFile(files[0], image.fileName)
      if (!file.type.match('image.*')) {
        alert('Sólo imágenes.')
        return
      }
      this.isUploadingImage = true
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('public_id', image.fileName.replace(/\.[^.]+$/, ''))
        const result = await $fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })
        this.store.setImageUrl(image.fileName, result.url)
      } catch (error) {
        alert(`Error subiendo imagen: ${error.message || error}`)
      } finally {
        this.isUploadingImage = false
      }
    },
  },
}
</script>
<style lang="scss">
.image-upload {
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2rem;
  gap: 2rem;
  .card {
    background: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    border-radius: 0.2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.2),
      0 1em 2em -1em rgba(0, 0, 0, 0.2);
  }
  button.admin-button {
    margin: 0 0 2.5rem 0;
  }
  .hidden {
    display: none;
  }
  .img {
    width: 100%;
    max-width: 350px;
    padding: 1rem 0;
    display: block;
  }
  label {
    font-size: 1.3rem;
    color: lighten($colorTurq, 20%);
  }
  button {
    display: block;
  }
}
@media (max-width: 700px) {
  .image-upload {
    grid-template-columns: 1fr;
    button.admin-button {
      margin: 0 0 2.5rem 0;
    }

    .img {
      width: 100%;
    }
  }
}
</style>
