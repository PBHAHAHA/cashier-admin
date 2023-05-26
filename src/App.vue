
<template>
    <router-view />
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
if (!localStorage.getItem('YYDANHONGTOKEN')) router.push('/login')
</script>
<style lang="scss">
@import "@scss/common.scss";
</style>
