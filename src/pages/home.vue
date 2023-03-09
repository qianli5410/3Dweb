<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">

        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" unique-opened>
          <el-menu-item index="1">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>个人履历</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>3D作品</span>
          </el-menu-item>
          <!-- <el-sub-menu index="3">
            <template #title>
              <span>3D作品</span>
            </template>
            <el-menu-item index="4">
              <span>小屋子</span>
            </el-menu-item>
          </el-sub-menu> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const titleMap = new Map([
  [1, '/'],
  [2, '/biography'],
  [3, '/dopus'],
  [4, '/small-house'],
])
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
  router.push({
    path: titleMap.get(Number(key))
  })

}
</script>

<style scoped>
.common-layout{
  height: 100%;
}
</style>