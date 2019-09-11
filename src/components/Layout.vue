<template>
  <div style="padding-top: 48px;">
    <div style="position: fixed; width: 100%; top: 0; background-color: #fff; z-index: 1000;">
      <a-menu
        v-model="current"
        mode="horizontal"
        @click="onClick"
      >
        <a-menu-item key="assemble">
          <a-icon type="api" />组装链接
        </a-menu-item>
        <a-menu-item key="combine">
          <a-icon type="deployment-unit" />合成配置
        </a-menu-item>
        <a-menu-item key="transform">
          <a-icon type="experiment" />转换格式
        </a-menu-item>
      </a-menu>
    </div>
    <div style="margin-top: 32px" class="row-center">
      <div style="width: 800px">
        <keep-alive>
          <component v-bind:is="currentTab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Assemble from './Assemble.vue';
import Combine from './Combine.vue';
import Transform from './Transform.vue';

export default {
  name: 'Layout',
  components: {
    Assemble,
    Combine,
    Transform
  },
  data () {
    return {
      current: ['assemble'],
      currentTab: 'Assemble'
    }
  },
  methods: {
    onClick (e) {
      switch (e.key) {
        case 'assemble':
          this.currentTab = 'Assemble';
          break;
        case 'combine':
          this.currentTab = 'Combine';
          break;
        case 'transform':
          this.currentTab = 'Transform';
      }
    }
  }
}
</script>

<style scoped>
li {
  display: inline-block;
  margin: 0 16px;
}
</style>
