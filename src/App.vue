<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <Layout />
    </div>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import Layout from './components/Layout.vue';

export default {
  name: 'app',
  data() {
    return {
      zh_CN,
    }
  },
  components: {
    Layout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.row-center {
  display: flex;
  justify-content: center;
}
.row-between {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>