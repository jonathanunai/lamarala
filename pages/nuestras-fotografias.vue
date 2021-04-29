<template>
  <div class="container gallery-wrapper">
    <div class="left-col">
      <div class="thumbnails">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="square"
          :style="'background-image: url(\'/img/fotos/' + img.foto + '\')'"
          @click="loadImg(index)"
        ></div>
      </div>
    </div>
    <transition name="show">
      <div
        class="right-col"
        :class="showModal ? 'showModal' : ''"
        @click="closeRight"
      >
        <div class="image-display-wrapper">
          <div
            class="img-container"
            :style="'background-image: url(\'/img/fotos/' + image.foto + '\')'"
          ></div>
          <div class="img-footer">
            <div class="arrows" @click.stop="goLeft">
              <i class="arrow left"></i>
            </div>
            <div class="img-info">{{ image.text }}</div>
            <div class="arrows" @click.stop="goRight">
              <i class="arrow right"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedImage: 0,
      showModal: false,
      images: [
        {
          foto: 'arroz-carabinero-640.jpg',
          text: 'Arroz con carabinero de Huelva',
        },
        { foto: 'mariscos-640.jpg', text: 'Marisco' },
        { foto: 'anchoa-640.jpg', text: 'Anchoas costeras del cantábrico 000' },
        {
          foto: 'sardina-640.jpg',
          text:
            'Sardina ahumada sobre quinoa y salmorejo, microensalada con vinagreta de maracuyá y helado de pepino y menta',
        },
        {
          foto: 'torrija-640.jpg',
          text: 'Torrija de chocolate blanco con fresas en vinagre de modena',
        },
        { foto: 'kokotxas-640.jpg', text: 'Kokotxas de merluza al ajillo' },
        {
          foto: 'tartar-640.jpg',
          text: 'Tartar de atún rojo de almadraba con helado de wasabi',
        },
        {
          foto: 'ensalada-foie-640.jpg',
          text:
            'Ensalada de foie y atún rojo con algas wakama y sésamo tostado',
        },
        {
          foto: 'alcachofas-640.jpg',
          text: 'Alcachofas de huerta fritas con almejas de carril',
        },
        {
          foto: 'tataki-640.jpg',
          text:
            'Tataki de tarantelo de atún rojo de almadraba con reducción de cítricos y mahonesa de wasabi',
        },
        {
          foto: 'chipiron-640.jpg',
          text:
            'Chipirón de potera con crema de foie glaseada y huevo de corral',
        },
        {
          foto: 'tarta-640.jpg',
          text:
            'Tarta de queso manchego con espuma de tomillo, nueces caramelizadas y reducción de vino tinto',
        },
        {
          foto: 'bacalao-640.jpg',
          text:
            'Bacalao de anzuelo confitado con jamón, tirabetes y crema de patata',
        },
        {
          foto: 'steak-tartar-640.jpg',
          text:
            'Steak tartar con trufa, tomate especiado, confitura de limón con encurtidos, helado de mostaza y crujiente de parmesado',
        },
        {
          foto: 'carpaccio-640.jpg',
          text:
            'Carpaccio de carabineros con vinagreta de kumato, albahaca y huevas de Tobiko',
        },
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
      this.showModal = true
      this.selectedImage = index
    },
    goLeft() {
      if (this.selectedImage === 0) this.selectedImage = this.images.length - 1
      else this.selectedImage = this.selectedImage - 1
    },
    goRight() {
      if (this.selectedImage === this.images.length - 1) this.selectedImage = 0
      else this.selectedImage = this.selectedImage + 1
    },
    closeRight() {
      this.showModal = false
    },
  },
}
</script>
<style lang="scss">
.gallery-wrapper {
  justify-content: left;
  @include md {
    padding-top: 90px;
  }

  .left-col {
    width: 100%;
    @include md {
      width: 50%;
      padding: 0 56px;
    }
  }
  .right-col {
    display: flex;
    height: 0;
    max-height: 0;
    opacity: 0;
    position: fixed;
    align-items: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: -1;
    transition: all 0.4s ease;
    left: 0;
    @include md {
      height: 100vh;
      max-height: 100vh;
      opacity: 1;
      background: #ffffff;
      width: 50%;
      left: 50%;
      top: 0;
    }
  }
  .showModal {
    height: 100vh;
    max-height: 100vh;
    opacity: 1;
    z-index: 6;
  }

  .thumbnails {
    width: 100%;
    margin: 0 auto;
    @include md {
      width: 80%;
    }
    .square {
      float: left;
      position: relative;
      width: 18%;
      padding-bottom: 18%;
      margin: 1%;
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
      @include md {
        width: 30%;
        padding-bottom: 30%;
        margin: 1.66%;
      }
    }
  }
  .image-display-wrapper {
    width: 100%;
    margin: 0 auto;
    color: $colorTurq;
    font-style: italic;
    @include md {
      margin-right: 2rem;
    }
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
    background: #ffffff;
    padding: 1rem;
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
