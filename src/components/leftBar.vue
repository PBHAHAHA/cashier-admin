<template>
    <el-scrollbar>
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :router="true" :unique-opened="true">
            <el-menu-item index="/goods">
                <span>房间设置</span>
            </el-menu-item>
            <el-menu-item index="/goods-setting">
                <span>商品设置</span>
            </el-menu-item>
            <el-menu-item index="/imageSearch">
                <span>历史订单</span>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const defaultActive = ref(route.path);
watch(route, () => {
    defaultActive.value = route.path
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
    border-right: none;

    .el-menu-item {
        transition: all .25s;
        user-select: none;

        &.is-active {
            background: #ecf5ff;
            box-shadow: 0 0 3px rgba(0, 0, 0, .2);
            border-right: 3px solid #3f61e2;
            font-size: 18px;
            font-weight: 600;
        }
    }
}
</style>