import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.devtools = false;
Vue.config.productionTip = false;

beforeEach(function () {
  document.body.innerHTML = '';
});
