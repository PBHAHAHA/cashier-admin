<template>
  <div class="history-container">
    <h2>历史订单</h2>
    <el-collapse v-if="historyListData.length" v-model="activeName" accordion>
      <el-collapse-item :name="item.time" v-for="item in historyListData">
        <template #title>
          <div class="title-wrap">
            <span>{{ item.date }}</span>
            <div class="handle-box">
              <span>小记： {{ item.subtotal }} 元</span>
              <el-button
                type="danger"
                size="small"
                @click.stop="delOrder(item.id)"
                >删除</el-button
              >
            </div>
          </div>
        </template>
        <el-table border :data="item.orders" style="width: 100%">
          <el-table-column
            align="center"
            prop="room_name"
            label="房间名"
            width="150"
          />
          <el-table-column align="center" prop="start_time" label="开始时间" />
          <el-table-column align="center" prop="end_time" label="结束时间" />
          <el-table-column align="center" prop="total_time" label="总时长" />

          <el-table-column
            align="center"
            prop="order"
            label="订单"
            min-width="200"
          >
            <template #default="{ row }">
              <div v-if="row.order_info.length" class="order-box">
                <span class="g-item" v-for="g in row.order_info">
                  {{ g.order_content }} x {{ g.count }}
                </span>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="cost" label="总费用" />
          <el-table-column align="center" fixed="right" width="140">
            <template #default="{ row }">
              <el-button
                type="danger"
                size="small"
                @click="delOrder(row.order_id)"
                >删除该条数据</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <div v-else class="no-data">
      <el-empty description="暂无数据" />
    </div>
  </div>
</template>
<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { delHistoryOrderInfo } from "@/utils/api";
import { ElMessage } from "element-plus";
import { getHistoryOrderInfo } from "../../utils/api";

const historyListData = ref([
  {
    id: "001",
    date: "2023-03-01",
    subtotal: "600",
    orders: [
      {
        order_id: "2016-05-03",
        room_name: "Tom",
        price: "104",
        start_time: "2021-02-22 12:22:32",
        end_time: "2021-02-22 12:22:32",
        total_time: "2021-02-22 12:22:32",
        overtime: "2021-02-22 12:22:32",
        isStop: true,
        isEnd: false,
        order_info: "香烟",
      },
    ],
  },
]);
const activeName = ref(historyListData.value[0].time)
const handleClick = () => {
  console.log("click");
};
// 获取历史订单
async function getOrder(){
    const res = await getHistoryOrderInfo()
    if(res.code === 200){
        historyListData.value = res.data
    }
}
getOrder()
//
function delHistory(e){

}
// 删除历史订单
async function delOrder(id){
    console.log(id)
    try {
        ElMessageBox.confirm(
    '确认删除?',
    '注意',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
        const res = await delHistoryOrderInfo({
            id
        })
        if(res.code == 200){
            ElMessage.success("删除成功")
            getOrder()
        }else{
            ElMessage.error(res.msg)
        }
    })
    .catch(() => {
    })


    } catch (error) {
        ElMessage.error(error)
    }

}

let historyVisible = ref(false);
function show() {
  historyVisible.value = true;
}
function close() {
  historyVisible.value = false;
}
</script>
<style lang="scss" scoped>
.history-container {
  padding: 30px 50px;
  background: #fff;
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
}
.title-wrap {
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-right: 10px;
  .handle-box {
    display: flex;
    align-items: center;
    margin: 0 10px;
    .el-button {
      margin-left: 10px;
    }
  }
}

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
</style>
