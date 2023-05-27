<template>
  <el-dialog v-model="historyVisible" title="房间1 点单" width="900" center>
    <div class="order-container">

      <div class="yidian">
        <div class="desc">已点</div>
        <div class="box">
          <div class="item" v-for="(item, index) in goodsData">
            {{item.name}} x {{ item.num }}
            <el-button size="small" link type="danger" @click="delHandle(index)">删除</el-button>
          </div>
        </div>
      </div>
      <div class="goods-wrap">
        <div class="desc">商品</div>
        <div class="goods-box">
          <el-button class="item" v-for="item in allGoodsList" @dblclick="handleGoods(item)">
            <span class="name">{{item.name}}</span>
            <span class="price">{{item.price}}元</span>
          </el-button>
        </div>
      </div>
      <div class="choose-wrap">
        <div class="choose-item">
          {{ choosedItemName }}
        </div>
        <div class="handle-box">
          <el-input-number v-show="choosedItemName" v-model="num" :min="1" :max="999" @change="handleChange" />
          <el-button type="primary" @click="confirmFunc">确定</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'

const goodsData = ref([
  {
    name: "红牛",
    num: 3
  },{
    name: "薯片",
    num: 2
  },{
    name: "啤酒",
    num: 1
  },{
    name: "花生",
    num: 5
  },{
    name: "咖啡",
    num: 1
  }
])

const allGoodsList = ref([
  {
    name: "红牛",
    price: 10
  },{
    name: "薯片",
    price: 8.5
  },{
    name: "啤酒",
    price: 6
  },{
    name: "花生",
    price: 12
  },{
    name: "咖啡",
    price: 20
  }
])

const choosedItemName = ref("")
let choosedItemIndex
function handleGoods(row) {
  choosedItemName.value = row.name
  choosedItemIndex = goodsData.value.findIndex(item => item.name === row.name)
}

// 删除已点商品
function delHandle(index){
  ElMessageBox.confirm(
    '确认删除?',
    '注意',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      goodsData.value.splice(index,1)
    })
    .catch(() => {
    })
  
}
//确认添加商品
function confirmFunc() {
  if(!choosedItemName.value) return
  let obj = {
    name: choosedItemName.value,
    num: num.value
  }
  if(choosedItemIndex === -1){
    goodsData.value.push(obj)
  }else{
    goodsData.value[choosedItemIndex] = obj
  }

  num.value = 1
  choosedItemName.value = ""
}

const num = ref(1)
const handleChange = (value) => {
  console.log(value)
}

const handleClick = () => {
  console.log("click");
};

let historyVisible = ref(false);
function show() {
  historyVisible.value = true;
}
function close() {
  historyVisible.value = false;
}
defineExpose({
  show,
});
// historyListData.value
</script>
<style lang="scss" scoped>
.order-container {
  display: flex;
  flex-direction: column;
}
.yidian {
  display: flex;
  height: 200px;
  // margin-bottom: 10px;
  .desc {
    padding-top: 12px;
    width: 100px;
    height: 100%;
    font-size: 24px;
    font-weight: 600;
    background-color: #fff;
    color: #000;
    text-align: center;
  }
  .box {
    flex: 1;
    padding: 10px;
    display: flex;
    align-content: baseline;
    flex-wrap: wrap;
    overflow: hidden;
    gap: 10px 10px;
    .item {
      margin: 0;
      border: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      padding: 5px;
      border-radius: 2px;
      font-size: 12px;
    }
  }
}
.goods-wrap {
  border-top: 1px solid #ccc;
  display: flex;
  height: 200px;
  .desc {
    padding-top: 12px;
    height: 100%;
    background-color: #fff;
    width: 100px;
    color: #000;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    
  }
  .goods-box {
    flex: 1;
    padding: 10px;
    display: flex;
    align-content: baseline;
    flex-wrap: wrap;
    overflow: hidden;
    gap: 10px;
    .name {
      margin-right: 5px;
    }
    .item {
      margin: 0;
      padding: 4px 5px;
      font-size: 12px;
      // line-height: 30px;
    }
  }
}
.choose-wrap {
  border-top: 1px solid #ccc;
  height: 80px;
  display: flex;
  align-items: center;
  .choose-item {
    flex: 3;
    text-align: center;
  }
  .handle-box {
    display: flex;
    gap: 0 10px;
  }
}
</style>
