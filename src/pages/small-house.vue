<template>
  <span v-if="showLoding">加载中。。。</span>
  <div id="content">
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 引入three.js
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { nextTick } from 'vue';

const scene = new THREE.Scene();
let showLoding = ref(true)
// const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
// const height = window.innerHeight; //窗口文档显示区的高度作为画布高度
const [width, height] = [1200, 600]
const camera = new THREE.PerspectiveCamera(40, width / height, 1, 5000);
camera.position.set(5, 3, 8);


const renderer = new THREE.WebGLRenderer();
renderer.render(scene, camera); //执行渲染操作
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
nextTick(() => {
  showLoding.value = false
  const dom = document.getElementById('content')
  dom.appendChild(renderer.domElement);
})

const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;




const controls = new OrbitControls(camera, renderer.domElement);
// 设置相机控件轨道控制器OrbitControls
controls.target.set(0, 0, 0);
controls.update();//update()函数内会执行camera.lookAt(controls.targe)
controls.addEventListener('change', () => {
  renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件

// onresize 事件会在窗口被调整大小时发生
window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};


const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/src/assets/gltf/');
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
let mixer;
loader.load('/src/assets/LittlestTokyo.glb', function (gltf) {
  console.log('控制台查看加载gltf文件返回的对象结构', gltf);
  console.log('gltf对象场景属性', gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  scene.add(gltf.scene);
  gltf.scene.position.set(1, 1, 0);
  gltf.scene.scale.set(0.01, 0.01, 0.01);
  // camera.lookAt(gltf.scene.position);//指向mesh对应的位置
  mixer = new THREE.AnimationMixer(gltf.scene);
  mixer.clipAction(gltf.animations[0]).play();
  animate()

})
//解决加载gltf格式模型纹理贴图和原图不一样问题
renderer.outputEncoding = THREE.sRGBEncoding;

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}


</script>

<style scoped>
#content {
  width: 1200px;
  height: 600px;
}
</style>