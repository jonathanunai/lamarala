import { useAppStore } from '~/stores/app'

export default defineNuxtPlugin({
  name: 'config-loader',
  dependsOn: ['firebase'],
  setup(nuxtApp) {
  const { $firebase } = nuxtApp
  const store = useAppStore()

  $firebase
    .firestore()
    .collection('Config')
    .doc('values')
    .get()
    .then((doc) => {
      if (!doc.exists) return
      const data = doc.data()
        if (data.textos) store.loadTxt(data.textos)
      if (data.imageUrls) store.loadImageUrls(data.imageUrls)
    })
  },
})
