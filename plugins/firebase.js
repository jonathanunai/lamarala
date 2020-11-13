import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyB8AdROVoE8bOFOLQoonf9sPgDbOeY29hg',
    authDomain: 'la-mar-sala.firebaseapp.com',
    databaseURL: 'https://la-mar-sala.firebaseio.com',
    projectId: 'la-mar-sala',
    storageBucket: 'la-mar-sala.appspot.com',
    messagingSenderId: '272277224213',
    appId: '1:272277224213:web:5998318a4969fcdf61c71c',
    measurementId: 'G-51DYL1QNRS',
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  inject('firebase', firebase)
  inject('auth', firebase.auth())
}
