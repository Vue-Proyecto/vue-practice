import "./assets/main.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";


import App from "./App.vue";
import VueSweetalert2  from 'vue-sweetalert2';

import { createApp } from "vue";
import { createPinia } from "pinia";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(createPinia());
app.use(vuetify);
app.use(VueSweetalert2);
app.mount("#app");
