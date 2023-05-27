<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h2 style="color: #3f61e2"> <router-link to="/dashboard">聚点棋牌记账</router-link> </h2>
            </el-header>
            <el-container>
                <el-main>
                    <router-view v-slot="{ Component }">
                        <component :is="Component" />
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import { ArrowDown, SwitchButton } from '@element-plus/icons-vue';
import LeftBar from '@components/leftBar.vue';

const isPROD = import.meta.env.PROD

const userName = ref(
    (JSON.parse(localStorage.getItem('USERINFO')) || {})?.userName
)

function exit() {
    localStorage.clear()
    window.location.reload()
}
</script>

<style lang="scss" scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $primary-color;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    position: sticky;
    top: 0;
    z-index: 20;

    .el-dropdown-link {
        cursor: pointer;
    }
    h2 {
        a {
            color: #fff !important;
        }
    }
}

.el-aside {
    background: #fff;
    height: calc(100vh - 61px);
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.el-main {
    padding: 10px;
    position: relative;
    height: calc(100vh - 60px);
}
</style>
