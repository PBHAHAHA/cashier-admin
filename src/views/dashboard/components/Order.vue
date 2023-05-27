<template>
  <el-dialog v-model="historyVisible" :title="dialogTitle" width="900" center>
    <div class="order-container">

      <div class="yidian">
        <div class="desc">已点</div>
        <div class="box">
          <div class="item" v-for="(item, index) in goodsData" :key="item.order_id">
            {{item.order_content}} x {{ item.count }}
            <el-button size="small" link type="danger" @click="delHandle(index)">删除</el-button>
          </div>
        </div>
      </div>
      <div class="goods-wrap">
        <div class="desc">商品</div>
        <div class="goods-box">
          <el-button class="item" v-for="item in allGoodsList" @click="handleGoods(item)" @dblclick="handleDBGoods(item)">
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
          <el-input-number v-show="choosedItemName" v-model="count" :min="1" :max="999" @change="handleChange" />
          <el-button v-show="choosedItemName" type="primary" @click="confirmFunc">确定</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import _ from "lodash"
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCommodityInfoApi,setOrderInfoApi } from "../../../utils/api";

const goodsData = ref([])

const allGoodsList = ref([])
// 获取所有商品
async function getGoodsData(){
  allGoodsList.value = []
  const res = await getCommodityInfoApi()
  if(res.code == 200){
    res.data.forEach(item => {
        allGoodsList.value.push(item)
    })
  }
}


const choosedItemName = ref("")
let choosedItemIndex
function handleGoods(row) {
  choosedItemName.value = row.name
  choosedItemIndex = goodsData.value.findIndex(item => item.order_content === row.name)
}
function handleDBGoods(row){
  console.log(row)
  choosedItemName.value = row.name
  choosedItemIndex = goodsData.value.findIndex(item => item.order_content === row.name)
  confirmFunc()
}

// 删除已点商品
function delHandle(index){
  console.log(index)
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
      console.log(goodsData.value)
      goodsData.value = goodsData.value
    })
    .catch(() => {
    })
  
}
//确认添加商品
function confirmFunc() {
  if(!choosedItemName.value) return
  let obj = {
    order_content: choosedItemName.value,
    count: count.value,

  }
  if(choosedItemIndex === -1){
    goodsData.value.push(obj)
  }else{
    goodsData.value[choosedItemIndex] = obj
  }

  count.value = 1
  choosedItemName.value = ""
}

const count = ref(1)
const handleChange = (value) => {
  console.log(value)
}

const emits = defineEmits([
  "reloadList"
])
async function submit () {
  console.log("click");
  goodsData.value.forEach(item => {
    if(!item?.order_id){
      item.order_id = ""
    }
  })
  let obj = {
    id: roomId.value,
    data: goodsData.value
  }
  console.log(obj)
  const res = await setOrderInfoApi(obj)
  if(res.code == 200){
    ElMessage.success("编辑成功")
    emits("reloadList")
    close()
  }else{
    ElMessage.error(res.msg)
  }
};

// 弹窗标题
const dialogTitle = ref("")


// 弹窗显示与隐藏
let historyVisible = ref(false);
let roomId = ref("")
function show(row) {
  historyVisible.value = true;
  roomId.value = row.id
  dialogTitle.value = row.name + '点单'
  getGoodsData()
  // 回填  已选商品
  goodsData.value = _.cloneDeep(row.order_info)
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
