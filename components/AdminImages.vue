<template>
  <div class="image-upload">
    <div v-for="image in images" :key="image.name">
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
function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  })
}

export default {
  data() {
    return {
      fixedImages: {
        portada: {
          fileName: 'la-mar-sala-portada.jpg',
          name: 'la portada',
        },
        menuDegustacion: {
          fileName: 'menu-degustacion.jpg',
          name: 'Menú degustación',
        },
      },
      isUploadingImage: false,
      isDeletingImage: false,
      rndCache: +new Date(),
    }
  },
  computed: {
    images() {
      const aux = {}
      for (let i = 1; i <= 8; i++) {
        const name = `section${i}`
        aux[name] = {
          fileName: `${name}.jpeg`,
          name: ` la seccion de Menú ${name}`,
        }
      }
      return { ...this.fixedImages, ...aux }
    },
  },
  created() {
    // this.images.map(i => {return {...i, imageUrl: ''}})
  },
  methods: {
    launchImageFile(image) {
      // Trigger the file input click event.
      const ref = this.$refs[image.fileName][0]
      ref.click()
    },
    longUrl(file) {
      return `https://firebasestorage.googleapis.com/v0/b/la-mar-sala.appspot.com/o/images%2F${file}?alt=media&rnd=${this.rndCache}`
    },
    uploadImageFile(files, image) {
      if (!files.length) {
        return
      }

      const file = renameFile(files[0], image.fileName)

      if (!file.type.match('image.*')) {
        alert('Sólo imágenes.')
        return
      }

      const metadata = {
        contentType: file.type,
      }

      this.isUploadingImage = true

      // Create a reference to the destination where we're uploading the file
      const storage = this.$firebase.storage()
      const imageRef = storage.ref(`images/${image.fileName}`)

      const uploadTask = imageRef
        .put(file, metadata)
        .then((snapshot) => {
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          return snapshot.ref.getDownloadURL().then((url) => {
            return url
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error uploading image', error)
        })

      // When the upload ends, set the value of the image URL
      // and signal that uploading is done.
      uploadTask.then((url) => {
        this.rndCache = +new Date()
        this.isUploadingImage = false
      })
    },
  },
}
</script>
<style lang="scss">
.image-upload {
  padding: 2rem 1rem;
  button.admin-button {
    margin: 0 0 2.5rem 0;
  }
  .hidden {
    display: none;
  }
  .img {
    width: 90%;
    max-width: 350px;
    padding: 1rem 0;
    display: block;
  }
  label {
    font-size: 1.3rem;
  }
  button {
    display: block;
  }
}
</style>
