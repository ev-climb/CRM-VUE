import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import messagePlagin from './utils/message.plagin'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlagin)
Vue.filter('date', dateFilter)
Vue.use(Vuelidate)


firebase.initializeApp({
    apiKey: "AIzaSyCHnAYOrH5cNL191lYGDxt5sug9y9wNzcg",
    authDomain: "crm-vue-59ddb.firebaseapp.com",
    projectId: "crm-vue-59ddb",
    storageBucket: "crm-vue-59ddb.appspot.com",
    messagingSenderId: "44396286852",
    appId: "1:44396286852:web:fd9884a48b6582776103d1",
    measurementId: "G-R2JXZKQN0K"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  
})





