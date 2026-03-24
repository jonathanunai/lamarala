import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    databaseURL: config.public.firebaseDatabaseUrl,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return {
    provide: {
      firebase,
      auth: firebase.auth(),
    },
  }
})
