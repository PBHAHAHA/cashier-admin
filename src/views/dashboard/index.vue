<template>
  <div class="dashborad-container">
    <Left-Nav></Left-Nav>
    <div class="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column align="center" prop="date" label="房间名" width="150" />
        <el-table-column align="center" prop="name" label="单价" width="120" />
        <el-table-column align="center" prop="state" label="开始时间"  />
        <el-table-column align="center" prop="city" label="结束时间"  />
        <el-table-column align="center" prop="address" label="当前时长" />
        <el-table-column align="center" prop="zip" label="暂停时长"  />
        <el-table-column align="center" prop="address" label="总费用" />
        <el-table-column align="center" prop="zip" label="订单"  min-width="200">
          <template #default>

          </template>
        </el-table-column>
        <el-table-column prop="zip" label="暂停/恢复" width="120" >
          <template #default>
            
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="开单/结单" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
              >开单</el-button
            >
            <el-button link type="primary" size="small">结单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import LeftNav from '../../components/left-nav.vue';
const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<style lang="scss" scoped>
.dashborad-container {
  background-color: #f6f6f6;
  width: 100%;
  height: calc(100% );
  display: flex;
  gap: 0 20px;
  .content {
    background-color: #fff;
    flex: 1;
    padding: 10px;
    width: calc(100% - 80px);
  }
}
</style>