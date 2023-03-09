<template>
  <div id="content">
  </div>
</template>

<script setup>
import { useThree } from '../hook/three'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { nextTick } from 'vue'
nextTick(() => {
  const dom = document.getElementById('content')
  const { scene, camera, renderer, controls } = useThree({
    domId: "content",
    width: dom.clientWidth,
    height: dom.clientHeight-2,
    fov:40
  })
  const gltfPath = '/gltf/'
  const LittlestTokyoPath = '/LittlestTokyo.glb'

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.background = new THREE.Color('pink');
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04, 0.1, 100).texture;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(gltfPath);
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  let mixer;
  loader.load(LittlestTokyoPath, function (gltf) {
    console.log('控制台查看加载gltf文件返回的对象结构', gltf);
    console.log('gltf对象场景属性', gltf.scene);
    // 返回的场景对象gltf.scene插入到threejs场景中
    scene.add(gltf.scene);
    gltf.scene.position.set(1, 1, 0);
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    // camera.lookAt(gltf.scene.position);//指向mesh对应的位置
    console.log('gltf.animations', gltf.animations);
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
})

</script>

<style scoped>
#content {
  width: 100%;
  height: 100%;
}
</style>