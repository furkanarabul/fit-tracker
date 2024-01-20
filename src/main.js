import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue3-toastify";
import tooltip from "./directives/tooltip.js";
import "./directives/tooltip.css";

import "vue3-toastify/dist/index.css";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faSignOut,
	faSignIn,
	faDumbbell,
	faPersonRunning,
	faPenToSquare,
	faTrashCan,
	faSquareMinus,
	faCalendar,
	faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
	faSignOut,
	faSignIn,
	faDumbbell,
	faPersonRunning,
	faPenToSquare,
	faTrashCan,
	faSquareMinus,
	faCalendar,
	faPlus
);

createApp(App)
	.use(router)
	.use(Toast)
	.directive("tooltip", tooltip)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app");
