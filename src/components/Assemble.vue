<template>
  <div>
    <div>
      <section>
        <h3>一、应用场景</h3>
        <p>拿到了一批 id，需要添加前、后缀组装成完整的链接。</p>
      </section>
      <section>
        <h3>二、操作步骤</h3>
        <ol>
          <li>根据实际需要，分别在【前缀】和【后缀】输入框中填入相应的文本，只需要组装一侧时将另一侧留空即可；</li>
          <li>在【主体】文本框中填入 id，一行一个；</li>
          <li>【结果】区域会自动生成组装后的链接，点击【复制】按钮可以一键复制。</li>
        </ol>
      </section>
    </div>
    <br>
    <div>
      <h3>前缀</h3>
      <a-input
        placeholder="填入位于主体左侧的内容"
        v-model="prefix"
      />
      <br>
      <br>
      <h3>后缀</h3>
      <a-input
        placeholder="填入位于主体右侧的内容"
        v-model="postfix"
      />
      <br>
      <br>
      <h3>主体</h3>
      <a-textarea
        placeholder="填入主体内容，一行一个"
        v-model="source"
        :rows="6"
      />
      <br>
      <br>
      <h3>结果</h3>
      <a-textarea
        placeholder="自动生成结果链接"
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
      prefix: '',
      postfix: '',
      source: ''
    }
  },
  computed: {
    result () {
      return this.source ? this.source.split('\n')
        .map(item => item.trim())
        .filter(item => item == '' ? false : true)
        .map(item => `${this.prefix}${item}${this.postfix}`)
        .join('\n') : '';
    }
  },
  methods: {
    onCopy () {
      this.$copyText(this.result).then(function () {
        this.$message.info('复制成功');
      }.bind(this), function (error) {
        window.console.log('error: ' + error);
        this.$message.error('复制失败');
      }.bind(this));
    },
    onReset () {
      this.prefix = '',
      this.postfix = '',
      this.source = ''
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