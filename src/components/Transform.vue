<template>
  <div>
    <div>
      <section>
        <h3>一、应用场景</h3>
        <p>抓取完成后导出了结果文件，格式为 csv，如果内容中存在换行符，用 Excel 打开会错行，需要修正并转为 xlsx。</p>
      </section>
      <section>
        <h3>二、操作步骤</h3>
        <ol>
          <li>点击【选择 csv 文件】按钮，选中需要转换的文件；</li>
          <li>点击转换并导出，转换完成后会触发自动导出结果文件。</li>
        </ol>
      </section>
    </div>
    <br>
    <div>
      <div class="row-between">
        <a-upload
          accept=".csv"
          :showUploadList="false"
          :beforeUpload="() => false"
          @change="onFileChange"
        >
          <a-button>
            <a-icon type="file" />选择 csv 文件
          </a-button>
          &nbsp;&nbsp;{{fileInfo}}
        </a-upload>
        <div>
          <a-button
            type="primary"
            :disabled="false"
            :loading="false"
            @click="onExecute"
            style="margin-right: 8px;"
          >
            <a-icon type="export" />转换并导出
          </a-button>
          <a-button @click="onReset">
            <a-icon type="hourglass" />重置
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  name: 'Transform',
  data () {
    return {
      file: null,
      fileInfo: '',
      loading: false
    }
  },
  methods: {
    onFileChange (e) {
      this.file = e.file;
      this.fileInfo = this.assembleFileInfo(e.file.name, e.file.size);
    },
    assembleFileInfo (name, size) {
      if (size > 1000000) {
        return `${name}（${(size / 1000000).toFixed(1)} MB）`;
      } else {
        return `${name}（${(size / 1000).toFixed(1)} KB）`;
      }
    },
    onExecute () {
      this.loading = true;
      const reader = new FileReader();

      reader.onload = function (e) {
        const source = e.target.result;
        const tmpRows = source.replace(/\n/g, '').replace(/("\d{10}-\d+")/g, '\n$1').split('\n').filter(row => row);
        const rows = tmpRows.map((row, idx) => {
          if (idx === 0) {
            return row.split(',');
          } else {
            const tmpRow = row.split('","');
            const finalRow = tmpRow.map((cell, idx) => {
              if (cell.length > 32767 ) {
                return cell.slice(0, 32766);
              } else if (idx === 0 || idx == tmpRow.length - 1) {
                return cell.replace(/"/g, '');
              } else {
                return cell;
              }
            });
            return finalRow;
          }
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${this.file.name.replace('.csv', '')}.xlsx`);
      }.bind(this);

      reader.onerror = function (err) {
        this.onError('读取 csv 文件失败', err);
      }.bind(this);

      reader.readAsText(this.file);
    },
    onError (msg, err) {
      window.console.log(err);
      this.$message.error(msg);
      this.onReset();
    },
    onReset () {
      this.fileInfo = '';
      this.loading = false;
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
.row-between {
  display: flex;
  justify-content: space-between;
}
</style>