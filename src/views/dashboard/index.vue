<template>
  <div class="dashborad-container">
    <div class="left-nav">
      <div class="nav-item" @click="handleRoomSet">
        房间设置
      </div>
      <div class="nav-item" @click="handleGoodsSet">
        商品设置
      </div>
      <router-link to="/history">
        <div class="nav-item">
          历史订单
        </div>
      </router-link>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="房间名"
          width="150"
        />
        <el-table-column align="center" prop="price" label="单价" width="120" />
        <el-table-column align="center" prop="start_time" label="开始时间" />
        <el-table-column align="center" prop="end_time" label="结束时间" />
        <el-table-column align="center" prop="total_time" label="当前时长" />
        <el-table-column align="center" prop="pause_time" label="暂停时长" />
        <el-table-column align="center" prop="cost" label="总费用" />
        <el-table-column
          align="center"
          prop="order_info"
          label="订单"
          min-width="200"
        >
          <template #default="{row}"> 
            <div class="order-box" @click="handleOrder">
              <!-- {{ row.order_info.join(",") }} -->
              <span class="g-item" v-for="g in row.order_info">
                {{ g }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="zip" label="暂停/恢复" width="120">
          <template #default="{row}">
            <el-button size="small" type="primary" v-if="row.pause_status === 'running'">暂停</el-button>
            <el-button type="danger" size="small" v-else>恢复</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="开单/结单" width="120">
          <template #default="{row}">
            <el-button type="primary" size="small" @click="handleClick" v-if="row.order_status === 'pause'"
              >开单</el-button 
            >
            <el-button type="danger" size="small" v-else @click="handleClick">结单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <RoomSet ref="RoomSetRef"></RoomSet>
  <GoodsSet ref="GoodsSetRef"></GoodsSet>
  <Order ref="OrderRef"></Order>
</template>

<script setup>
import RoomSet from "./components/RoomSet.vue";
import GoodsSet from "./components/GoodsSet.vue";
import Order from "./components/Order.vue";
import randomcolor from "randomcolor"
const handleClick = () => {
  console.log("click");
  ElMessageBox.confirm(
    '确认结束当前订单？',
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
};

const tableData = [
  {
    id: "2016-05-03",
    name: "Tom",
    price: "104",
    start_time: "2021-02-22 12:22:32",
    end_time: "2021-02-22 12:22:32",
    total_time: "2021-02-22 12:22:32",
    pause_time: "2021-02-22 12:22:32",
    pause_status: "running",//"pause" "running"
    order_status: "pause",
    cost: "1233",
    order_info: ["香烟","啤酒"]
  },
  
];

// ----弹窗操作 start------
let RoomSetRef = ref(null)
function handleRoomSet(){
  console.log('123')
  RoomSetRef.value.show()
}

let GoodsSetRef = ref(null)
function handleGoodsSet(){
  GoodsSetRef.value.show()
}

let OrderRef = ref(null)
function handleOrder(){
  OrderRef.value.show()
}
// ----弹窗操作 end------
</script>

<style lang="scss" scoped>
.dashborad-container {
  background-color: #f6f6f6;
  width: 100%;
  height: calc(100%);
  display: flex;
  gap: 0 20px;
  .left-nav {
    padding: 10px;
    width: 60px;
    height: 100%;
    background-color: $primary-color;
    display: flex;
    flex-direction: column;
    .nav-item {
      font-weight: 600;
      background-color: #fff;
      padding: 20px 5px;
      text-align: center;
      margin-bottom: 20px;
      color: $primary-color;
      cursor: pointer;
      line-height: 20px;
      &:hover {
        box-shadow: 0 0 10px #dbcbb9;
      }
      a {
        color: #fff;
      }
    }
  }
  .content {
    background-color: #fff;
    flex: 1;
    padding: 10px;
    width: calc(100% - 80px);
    .order-box {
      padding: 4px 10px;
      background-color: #fff;
      // box-shadow: 0 0 5px #ccc;
      line-height: 26px;
      cursor: pointer;
      margin: 10px 0;
      color: $primary-color;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 2px 4px;
      .g-item {
        padding: 2px;
        // border: 1px solid #dbcbb9;
        border-radius: 2px;
        background: #ea4444;
        color: #fff;
      }
    }
  }
}
</style>
