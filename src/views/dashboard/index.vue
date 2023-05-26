<template>
  <div class="dashborad-container">
    <div class="left-nav">
      <div class="nav-item">
        房间设置
      </div>
      <div class="nav-item">
        商品设置
      </div>
      <div class="nav-item">
        历史订单
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.dashborad-container {
  background-color: #f6f6f6;
  height: calc(100% );
  .left-nav {
    padding: 10px;
    width: 60px;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .nav-item {
      font-weight: 600;
      background-color: #f48400;
      padding: 20px 5px;
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 10px #dbcbb9;
      }
    }
  }
}
</style>