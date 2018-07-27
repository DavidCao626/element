<script>
  export default {
    data() {
    return {
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中

      dialogVisible: false,
      deleteOpen: true,
      importOpen: true,
      exportOpen: true,
      newOpen: true,
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      action:"https://jsonplaceholder.typicode.com/posts/"
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onMultipleSelectionDel() {
      this.$confirm("此操作将永久删除该学生数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$emit("onSelectionDel", this.multipleSelection);
      });
    },
    onExportExcel() {
      this.$emit("onExportExcel");
    },
    onUploadSuccess() {
      this.$emit("onUploadSuccess");
    },
    onNew() {
      this.$emit("onNew");
    }
  }
};
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .demo-table .name-wrapper {
    display: inline-block;
  }

  .demo-table .demo-table-expand {
    label {
      width: 90px;
      color: #99a9bf;
    }


  }
   .el-form-item {
      margin-bottom: 0px;
    }
    .demo-form-inline{
      display: inline !important;
    }
</style>

## elx-table-layout 表格布局

### 基础布局

基础的表格布局展示用法。

:::demo 基本表格布局，提供了四个基本位置插槽，每个插槽结合 element 原生组件，实现复杂布局。

```html
  <template>
    <div>
      <el-dialog title="导入数据" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
        <el-upload class="upload-demo" drag :action="action" :limit='1' @onSuccess="onUploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
        </el-upload>
      </el-dialog>

      <elx-table-layout>
        <template slot="headerRight">
           <el-button-group>
          <el-tooltip class="item" effect="dark" content="导入数据" placement="bottom" v-if="importOpen">
            <el-button plain size="mini" @click="dialogVisible = true">
              <i class="el-icon-download"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出数据" placement="bottom" v-if="exportOpen">
            <el-button plain size="mini" @click="onExportExcel">
              <i class="el-icon-upload2"></i>
            </el-button>
          </el-tooltip>
        </template>

         <template slot="headerLeft">
          <span v-if="deleteOpen && isMultipleSelection">
            <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
              <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
            </el-button>
          </span>
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
              <el-form-item label="学号:">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="姓名:">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
        </template>

        <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="38" v-if="deleteOpen">
          </el-table-column>

          <el-table-column prop="date" sortable label="姓名">
            </el-table-column>
            <el-table-column prop="name" sortable label="学号">
            </el-table-column>
            <el-table-column prop="address" label="性别">
           </el-table-column>

          <el-table-column label="操作" width="88" header-align="left" align="center">
            <template slot-scope="scope">
                <el-dropdown>
                    <el-button size="mini" @click="">
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>详情12</el-dropdown-item>
                        <el-dropdown-item>任职2</el-dropdown-item>
                        <el-dropdown-item>审核2</el-dropdown-item>
                        <el-dropdown-item>删除2</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column type="expand" label="#" width="42">
            <template slot-scope="props" style="background-color:#f7f8f9">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="身份证号码:">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="高考成绩:">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="备注资料:">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                </el-form>
            </template>
           </el-table-column>
        </el-table>

        <template slot="footer">
          <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </template>

      </elx-table-layout>
    </div>
  </template>

  <script>
  export default {
    data() {
    return {
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中

      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      newOpen: false,
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      action:"https://jsonplaceholder.typicode.com/posts/"
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onMultipleSelectionDel() {
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$emit("onSelectionDel", this.multipleSelection);
        })
    },
    onExportExcel() { 
      this.$emit("onExportExcel");
    },
    onUploadSuccess() {
      this.$emit("onUploadSuccess");
    },
    onNew() {
      this.$emit("onNew");
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline{
  display: inline !important;
}
</style>
```

:::

### Table Slot

| name        | 说明               |
| ----------- | ------------------ |
| headerLeft  | 表格头部左侧区域   |
| headerRight | 表格头部右侧侧区域 |
| default     | 主内容区           |
| footer      | 表格尾部           |
