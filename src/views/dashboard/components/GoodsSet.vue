<template>
    <el-dialog v-model="visible" title="商品设置" width="600" center>
      <div class="room-container">
        <div class="title">
          <span>商品名称</span>
          <span>单价(元)</span>
          <span></span>
        </div>
        <div class="content">
          <div class="item del-items" v-for="item in listData" :key="item.name">
            <el-input placeholder="请输入商品名称" v-model="item.name"></el-input>
            <el-input placeholder="请输入单价" v-model="item.price"></el-input>
            <el-button type="danger" @click="delItem(item)">删除</el-button>
          </div>
          <div class="item add-item">
            <el-input v-model="addNameVal" placeholder="请输入商品名称"></el-input>
            <el-input v-model.number="addPriceVal" placeholder="请输入单价"></el-input>
            <el-button type="primary" @click="addItem">添加</el-button>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close()">取消</el-button>
          <el-button type="primary" @click="submit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { ref } from 'vue';
  
  // 数据
  const listData = ref([
    {
      id: "001",
      name: "香烟",
      price: "60"
    }
  ])
  let addNameVal = ref("")
  let addPriceVal = ref("")
  
  // 添加
  function addItem(){
    if(!addNameVal.value){
      ElMessage.error("请先填入商品名称")
      return
    }else if(!addPriceVal.value){
      ElMessage.error("请先填入价格")
      return
    }
    const obj = {
      id: "",
      name: addNameVal.value,
      price: addPriceVal.value
    }
    listData.value.push(obj)
    addNameVal.value = ""
    addPriceVal.value = ""
  }
  // 删除
  function delItem(row) {
    let index = listData.value.findIndex(item => item.name == row.name)
    listData.value.splice(index, 1)
    // post 接口
  }
  
  let visible = ref(false)
  function show(){
      visible.value = true
  }
  function close(){
      visible.value = false
  }
  function submit() {
      console.log("提交");
      console.log(listData.value)
  }
  
  defineExpose({
      show
  })
  </script>
  <style lang="scss" scoped>
  .room-container {
    margin: 20px 0;
    .title {
      display: flex;
      text-align: center;
      span {
        flex: 2;
        line-height: 30px;
        // width: 100px;
        // border: 1px solid #ccc;
        &:last-child {
          flex: 1;
        }
      }
    }
    .content {
      .item {
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        margin-top: 10px;
        gap: 0 10px;
        .el-input {
          flex: 2;
        }
        .el-button {
          flex:1;
          padding: 0;
        }
      }
    }
  }
  </style>
  