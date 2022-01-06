<template>
  <div class="image-upload">
    <label for="imageUrl">Imágen:</label>
    <div v-if="images.imageUrl">
      <!-- A preview of the image. -->
      <img
        :src="images.imageUrl"
        class="w-24 md:w-32 h-auto object-cover inline-block"
        alt=""
      />
      <!-- Delete button for deleting the image. -->
      <button
        v-if="images.imageUrl"
        :disabled="isDeletingImage"
        type="button"
        class="bg-red-500 border-red-300 text-white"
        @click="deleteImage"
      >
        {{ isDeletingImage ? 'Borrando...' : 'Borrar' }}
      </button>
    </div>
    <!-- Clicking this button triggers the "click" event of the file input. -->
    <button
      v-if="!images.imageUrl"
      :disabled="isUploadingImage"
      type="button"
      @click="launchImageFile"
    >
      {{ isUploadingImage ? 'Subiendo...' : 'Subir' }}
    </button>
    <!-- This is the real file input element. -->
    <input
      ref="imageFile"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
      @change.prevent="uploadImageFile($event.target.files)"
    />
    <div class="flex-row">
      <div class="admin-button" @click="$emit('cancel')">Volver</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: {},
      isUploadingImage: false,
      isDeletingImage: false,
    }
  },
  methods: {
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click()
    },
    uploadImageFile(files) {
      if (!files.length) {
        return
      }
      const file = files[0]

      if (!file.type.match('image.*')) {
        alert('Sólo imágenes.')
        return
      }

      const metadata = {
        contentType: file.type,
      }

      this.isUploadingImage = true

      // Create a reference to the destination where we're uploading
      // the file.
      const storage = this.$firebase.storage()
      const imageRef = storage.ref(`images/${file.name}`)

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
        this.images.imageUrl = url
        this.isUploadingImage = false
      })
    },
    deleteImage() {
      this.$firebase
        .storage()
        .refFromURL(this.images.imageUrl)
        .delete()
        .then(() => {
          this.images.imageUrl = ''
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Error deleting image', error)
        })
    },
  },
}
</script>
<style lang="scss">
.image-upload {
  padding: 2rem 1rem;
  button {
    margin: 1rem 0;
  }
  .hidden {
    display: none;
  }
}
</style>
