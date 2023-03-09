<template>
  <el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" @select="handleSelect" unique-opened>
    <el-menu-item index="1">小房子</el-menu-item>
  </el-menu>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>

<script setup>
const handleSelect = (key) => {
  console.log(key)
}
</script>

<style scoped></style>