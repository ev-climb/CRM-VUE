import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import tooltipDirective from './directives/tooltip.directive';
import messagePlagin from './utils/message.plagin';
import Loader from '@/components/app/Loader';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlagin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyC0O_-Ks6RyXYEfoHYmfOyCuA3pqztGT4k',
  authDomain: 'srm-vue.firebaseapp.com',
  projectId: 'srm-vue',
  storageBucket: 'srm-vue.appspot.com',
  messagingSenderId: '143643369716',
  appId: '1:143643369716:web:b670cdb95cc979dd7f3ea1',
  measurementId: 'G-9T8B0F0EWB',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
