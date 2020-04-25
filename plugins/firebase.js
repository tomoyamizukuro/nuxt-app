import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDU78Exvrn1xo0caE3rqqP9_qZozjLFpbw",
    authDomain: "nuxt-app-779f8.firebaseapp.com",
    databaseURL: "https://nuxt-app-779f8.firebaseio.com",
    projectId: "nuxt-app-779f8",
    storageBucket: "nuxt-app-779f8.appspot.com",
    messagingSenderId: "279151332120",
    appId: "1:279151332120:web:7503398ec22c612814ec6d",
    measurementId: "G-61BH867STG"
};
// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase