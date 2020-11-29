import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import KProgress from 'k-progress';
import KnobControl from 'vue-knob-control'

Vue.config.productionTip = false


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    // Le Service Worker est déclaré !
    console.log('Service Worker déclaré !');
  })
      .catch(error => {
        // Il y a eu un problème
        console.error('Erreur: ', error);
      });
}


new Vue({
  vuetify,
  router,KProgress,KnobControl,
  render: h => h(App)
}).$mount('#app')



