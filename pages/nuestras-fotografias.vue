<template>
  <div class="container galeria-wrapper">
    <div class="left-col">
      <logo />

      <div class="thumbnails">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="square"
          :style="'background-image: url(\'/img/' + img.foto + '\')'"
          @click="loadImg(index)"
        ></div>
      </div>
    </div>
    <div class="right-col">
      <div class="image-display-wrapper">
        <div
          class="img-container"
          :style="'background-image: url(\'/img/' + image.foto + '\')'"
        ></div>
        <div class="img-footer">
          <div class="arrows" @click="goLeft"><i class="arrow left"></i></div>
          <div class="img-info">{{ image.text }}</div>
          <div class="arrows" @click="goRight"><i class="arrow right"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedImage: 0,
      images: [
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
        { foto: 'percebe-gallego.jpg', text: 'Percebe gallego' },
        { foto: 'gambita-roja-fresca.jpg', text: 'Gambita roja fresca' },
      ],
    }
  },
  computed: {
    image() {
      return this.images[this.selectedImage]
    },
  },
  methods: {
    loadImg(index) {
      this.selectedImage = index
    },
    goLeft() {
      if (this.selectedImage === 0) this.selectedImage = this.images.length - 1
      else this.selectedImage = this.selectedImage - 1
    },
    goRight() {
      console.log(this.selectedImage)
      console.log(this.images.length)
      if (this.selectedImage === this.images.length - 1) this.selectedImage = 0
      else this.selectedImage = this.selectedImage + 1
    },
  },
}
</script>
<style lang="scss">
.galeria-wrapper {
  justify-content: left;

  .left-col {
    padding: 0 56px;
    width: 50%;
  }
  .square {
    float: left;
    position: relative;
    width: 30%;
    padding-bottom: 30%; /* = width for a 1:1 aspect ratio */
    margin: 1.66%;
    border-radius: 0.2em;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover; /* you change this to "contain" if you don't want the images to be cropped */
    background-color: #996622;
    cursor: pointer;
    &:hover:after {
      content: '';
      display: block;
      width: 50%;
      height: 50%;
      background: white;
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
      box-shadow: 0px 5px 80px 0px;
      transition: all 0.5s ease;
    }
  }

  .thumbnails {
    width: 80%;
    @include md {
    }
  }
  .right-col {
    position: fixed;
    width: 50%;
    height: 100vh;
    left: 50%;
    top: 0;
    display: flex;
    align-items: center;
  }
  .image-display-wrapper {
    width: 100%;
    margin: 0 auto;
    color: $colorTurq;
    font-style: italic;
  }
  .img-container {
    width: 100%;
    padding-bottom: 70%;
    background-position: center;
    background-size: cover;
    margin: 0 auto;
    transition: all 1s ease;
  }
  .img-info {
  }
  .img-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .arrows {
    width: 35px;
    padding: 8px;
  }
  .arrow {
    border: solid $colorGrey;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 8px;
    cursor: pointer;
  }
  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
}
</style>
