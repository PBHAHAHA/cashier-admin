<template>
  <el-dialog v-model="visible" :title="title" width="600" center>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
        <el-form-item label="日期" prop="ymd">
            <el-date-picker
                v-model="ruleForm.ymd"
                type="date"
                placeholder="选择时间"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
            />
        </el-form-item>
        <el-form-item label="时间" prop="hms">
            <el-time-picker value-format="HH:mm:ss" v-model="ruleForm.hms" placeholder="开始时间" />
        </el-form-item>
        <el-form-item label="手动调差金额" prop="adjust_money">
            <el-input @keyup="handlePrice" v-model="ruleForm.adjust_money" />
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确认</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import moment from "moment"
import { ref } from 'vue';
import {handlePrice} from "@/utils/common.js"
import { changeRoomOrderApi } from "../../../utils/api";
const title = ref("")
const ruleForm = reactive({
    id: "",
    ymd: moment().format("YYYY-MM-DD"),
    hms: '',
    adjust_money: '',
})
const rules = reactive({
    hms: [{ required: true, message: '请输入时间', trigger: 'blur'  }],
    adjust_money: [{ required: true, message: '请输入调差金额', trigger: 'blur' }],
})
const emits = defineEmits([
  "reloadList"
])
const ruleFormRef = ref(null)
const submitForm = () => {
  ruleFormRef.value.validate( async (valid) => {
    if (valid) {
        console.log('submit!', ruleForm.time)
        let obj = {
            id: ruleForm.id,
            start_time: ruleForm.ymd + " "+ ruleForm.hms,
            adjust_money: ruleForm.adjust_money
        }
        const res = await changeRoomOrderApi(obj)
        if(res.code == 200){
            ElMessage.success("编辑成功")
            emits("reloadList")
            resetForm()
        }else{
            ElMessage.error(res.msg)
        }
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
  close()
}

const visible = ref(false)
function show(row){
    title.value = row.name + "信息变更设置"
    ruleForm.id = row.id
    ruleForm.adjust_money = row.adjust_money
    if(row.start_time !== '--:--:--'){
        ruleForm.hms = row.start_time
    }
    visible.value = true
}
function close(){
    visible.value = false
}
defineExpose({
    show
})
</script>
<style lang="scss" scoped>


</style>