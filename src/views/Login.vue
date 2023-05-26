<template>
    <div class="main">
        <el-card class="box-card" :body-style="{ padding: 0 }">
            <div class="cont">
                <div class="imgbox"><img src="@/assets/login.png" alt=""></div>
                <div class="w300">
                    <h1>丹红商品录入平台</h1>
                    <el-form :label-position="'top'">
                        <el-form-item label="用户名">
                            <el-input v-model="formLabelAlign.username" size="large" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="formLabelAlign.password" show-password
                                placeholder="请输入密码" size="large" />
                        </el-form-item>
                    </el-form>
                    <div class="btnbox">
                        <el-button type="primary" @click="loginSub" size="large">
                            <el-icon v-show="loading">
                                <Loading />
                            </el-icon>
                            <span style="margin:0 8px;">登录</span>
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { login } from '@utils/api';
import { useRouter } from 'vue-router';
import { Loading } from '@element-plus/icons-vue'
const router = useRouter();

const formLabelAlign = reactive({
    username: '',//admin
    password: ''//t/F98il4DxA=
})
const loading = ref(false)
async function loginSub() {
    if (!formLabelAlign.username.trim()) return ElMessage.warning('请输入用户名');
    if (!formLabelAlign.password.trim()) return ElMessage.warning('请输入密码');
    if (loading.value) return
    loading.value = true
    const { data, code, msg } = await login({
        username: formLabelAlign.username,
        password: formLabelAlign.password,
        noToken: true,
        formData: true
    })
    code === 0 ? (() => {
        localStorage.setItem('YYDANHONGTOKEN', data);
        localStorage.setItem('USERINFO', JSON.stringify({ userName: formLabelAlign.username }))
        ElMessage.success('登录成功')
        router.push('/')
    })() : ElMessage.warning(msg)
    loading.value = false
}

</script>


<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;


    .cont {
        display: flex;

        .imgbox {
            width: 500px;
            height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #eee;
            backdrop-filter: blur(5px);

            img {
                max-width: 400px;
            }
        }

        .w300 {
            width: 340px;
            padding: 20px;

            h1 {
                padding: 50px 0 80px;
                text-align: center;
                color: #444;
            }
        }

        .btnbox {
            width: 100%;
            display: flex;
            justify-content: center;

        }
    }

}


.bgs {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#c {
    width: 100%;
    height: 100%;
}
</style>