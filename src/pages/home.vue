<template>
  <div class="box">
    <div class="left">
      <div class="item" v-for="(item, key) in titleMap" :key="key">
        <router-link :to="item[1]">YQL--{{ item[0] }}</router-link>
      </div>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script setup>

const titleMap = new Map([
  ["首页", '/'],
  ["小别墅", '/small-house'],
])
</script>

<style scoped>
.box {
  height: 100%;
  display: flex;
}

.left {
  width: 300px;
  /* background: url('../assets/wenli.jpg'); */
  /* background-size: 200px 200px; */
  background: linear-gradient(180deg, #8A2BE2, #F08080, #40E0D0);

  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
  padding-top: 20px;
}

.content {
  flex: 1;
  /* background: linear-gradient(45deg, #DDA0DD, #DDA0DD, #DDA0DD); */
}

.item {
  width: 80%;
  height: 60px;
  margin-bottom: 20px;
  border: 2px solid white;
  border-radius: 20px;

}

.item:hover {
  background: linear-gradient(45deg, #8A2BE2, #F08080, #40E0D0);
}

.item a {
  width: 100%;
  height: 100%;
  color: white;
  font-family: math;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding-left: 40px;
}
</style>