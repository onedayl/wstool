import Vue from 'vue';
import App from './App.vue';
import './plugins/ant-design-vue.js';
import Clipboard from 'vue-clipboard2';
import { Menu, Icon, Upload, Button, Input, message, Progress} from 'ant-design-vue';

Vue.prototype.$message = message;
Vue.config.productionTip = false;
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Input);
Vue.use(Progress);
Vue.use(Clipboard);

new Vue({
  render: h => h(App),
}).$mount('#app');
