import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import {Form, Field} from "vee-validate";
import "primeflex/primeflex.css"
import "primevue/resources/themes/bootstrap4-light-blue/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css"
import "./plugins/axios"
import router from "./plugins/vue-router";


const app = createApp(App);
app.component("InputText", InputText);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Button", Button);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Card", Card);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toolbar", Toolbar);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Textarea", Textarea);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Dialog", Dialog);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Menubar", Menubar);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Form", Form);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Field", Field);

app.use(PrimeVue);
app.use(router);
app.mount("#app");
