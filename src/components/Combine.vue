<template>
  <div>
    <div>
      <section>
        <h3>一、应用场景</h3>
        <p>拿到了一批链接，需要与配置模板合成为新的抓取配置。</p>
      </section>
      <section>
        <h3>二、操作步骤</h3>
        <ol>
          <li>在【链接】文本框中填入链接，一行一个；</li>
          <li>在【模板】文本框中填入 json 配置，请注意格式，如果无法解析会提示错误，需自行修正；</li>
          <li>在【名称】输入框中填入合成后新配置的名称，只能是英文字母、数字、下划线（_）和短横线（-）的组合，如果名称留空，会使用时间戳自动重命名；</li>
          <li>点击【合成】按钮，【结果】区域会自动合成抓取配置，点击【复制】按钮可以一键复制。</li>
        </ol>
      </section>
    </div>
    <br>
    <div>
      <h3>链接</h3>
      <a-textarea
        placeholder="填入链接，一行一个"
        v-model="source"
        :rows="6"
      />
      <br>
      <br>
      <h3>模板</h3>
      <a-textarea
        placeholder="填入模板 json 配置"
        v-model="template"
        :rows="6"
      />
      <br>
      <br>
      <h3>名称</h3>
      <a-input
        placeholder="填入合成后的配置名称，不能和模板配置的名称相同"
        v-model="name"
      />
      <br>
      <br>
      <a-button
        type="primary"
        :disabled="this.source && this.template ? false: true"
        @click="onCombine"
      >
        <a-icon type="deployment-unit" />合成
      </a-button>
      <br>
      <br>
      <h3>结果</h3>
      <a-textarea
        placeholder="自动合成配置"
        v-model="result"
        :rows="6"
      />
      <br>
      <br>
      <a-button
        type="primary"
        @click="onCopy"
        style="margin-right: 8px;"
      >
        <a-icon type="copy" />复制
      </a-button>
      <a-button @click="onReset">
        <a-icon type="hourglass" />重置
      </a-button>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Assemble',
  data () {
    return {
      source: '',
      template: '',
      name: '',
      result: ''
    }
  },
  methods: {
    checkName () {
      return /^[a-zA-Z0-9|\-|_]+$/.test(this.name);
    },
    onCombine () {
      // 校验模板配置
      let config = null
      try {
        config = JSON.parse(this.template);
      } catch (err) {
        window.console.log(err);
        this.$message.error('模板配置格式错误，请检查修正');
        return;
      }

      // 校验配置名称
      if (this.name) {
        if (!this.checkName(this.name)) {
          this.$message.error('模板名称非法，请修改');
          return;
        } else if (this.name == config._id) {
          this.$message.error('名称不能和模板配置相同，请修改');
          return;
        }
      }

      const urls = this.source.split('\n')
        .map(item => item.trim())
        .filter(item => item == '' ? false : true)
      const timestamp = new Date().getTime();
      config.startUrl = urls;
      config._id = this.name == '' ? `${config._id}_${timestamp}` : this.name;
      this.result = JSON.stringify(config);
    },
    onCopy () {
      this.$copyText(this.result).then(function () {
        this.$message.info('复制成功');
      }.bind(this), function (error) {
        window.console.log('error: ' + error);
        this.$message.error('复制失败');
      }.bind(this));
    },
    onReset () {
      this.source = '';
      this.template = '';
      this.name = '';
      this.result = '';
    }
  }
}
</script>

<style scoped>
* {
  text-align: left;
}
h3 {
  font-weight: bold;
}
</style>