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
        <el-table-column align="center" prop="price" label="单价" width="120" >
          <template #default="{row}">
            {{ row.price }} 元
          </template>
        </el-table-column>
        <el-table-column align="center" prop="start_time" label="开始时间" />
        <el-table-column align="center" prop="end_time" label="结束时间" />
        <el-table-column align="center" prop="total_time" label="当前时长" />
        <el-table-column align="center" prop="pause_time" label="暂停时长" />
        <el-table-column align="center" prop="cost" label="总费用">
          <template #default="{row}">
            {{ row.cost }} 元
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="order_info"
          label="订单"
          min-width="200"
        >
        <template #default="{row}"> 
            <div class="order-box" v-if="row.order_info.length > 0" @click="handleOrder(row)">
              <!-- {{ row.order_info.join(",") }} -->
              <span class="g-item" v-for="g in row.order_info">
                {{ g.order_content }} x {{ g.count }}
              </span>
            </div>
            <a class="no-data-link c-p" v-else @click="handleOrder(row)">去添加商品</a>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" prop="zip" label="暂停/恢复" width="120">
          <template #default="{row}">
            <el-button size="small" type="primary" v-if="row.pause_status === 'running'" @click="changePauseStatus(row)">暂停</el-button>
            <el-button type="danger" size="small" v-else @click="changePauseStatus(row)">恢复</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="开单/结单" width="120">
          <template #default="{row}">
            <el-button type="primary" size="small" @click="changeOpen(row)" v-if="row.order_status === 'ending'"
              >开单</el-button 
            >
            <el-button type="danger" size="small" v-else @click="changeOpen(row)">结单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <RoomSet :data="tableData" @reload-list="getRoomData" ref="RoomSetRef"></RoomSet>
  <GoodsSet @reload-list="getRoomData" ref="GoodsSetRef"></GoodsSet>
  <Order ref="OrderRef" @reload-list="getRoomData"></Order>
</template>

<script setup>
import RoomSet from "./components/RoomSet.vue";
import GoodsSet from "./components/GoodsSet.vue";
import Order from "./components/Order.vue";
import randomcolor from "randomcolor"
import { getRoomInfoApi,pauseOrderApi,openEndOrderApi } from "../../utils/api";
import { forEach } from "lodash";
import { ElMessage } from "element-plus";
 function changeOpen (row) {
  console.log("click");
  ElMessageBox.confirm(
    `确认${row.order_status == 'ending' ? '开始' : '结束'}当前订单？`,
    '注意',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      // goodsData.value.splice(index,1)
      const res = await openEndOrderApi({
        id: row.id,
        action: row.order_status === 'ending' ? 'open' : 'end'
      })
      getRoomData()
      console.log(res)
    })
    .catch(() => {
    })
};

async function changePauseStatus(row) {
  console.log(row.pause_status)
  const res = await pauseOrderApi({
    id: row.id,
    action: row.pause_status === 'running' ? 'pause' : 'run'
  })
  if(res.code ==200){
    ElMessage.success("操作成功")
    getRoomData()
  }else{
    ElMessage.success(res.msg)
  }
}

const tableData = ref([]);
// for(let i =0;i<20;i++){
//   tableData.push({})
// }
// 获取 房间列表数据
async function getRoomData(){
  const res = await getRoomInfoApi()
  console.log(res)
  if(res.code == 200){
    tableData.value = res.data
  }
}

getRoomData()


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
function handleOrder(row){
  OrderRef.value.show(row)
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
    overflow: auto;
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
.no-data-link {
  color: $primary-color;
  border-bottom: 1px solid $primary-color;
}
</style>
