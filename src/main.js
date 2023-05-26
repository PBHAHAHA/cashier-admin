import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "default-passive-events";
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
    locale: zhCn
});
app.mount("#app");
