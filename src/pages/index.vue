<template>
  <div id="index" class="box">
    <div class="text">
      <p>作者: *千里</p>
      <p>初次发布时间: 2023/3/9</p>
      <p>邮箱: 1696016522@qq.com</p>
      <p>博客: https://blog.csdn.net/qq_45909266</p>
    </div>
  </div>
</template>

<script setup>
import { useThree } from '../hook/three';
import * as THREE from 'three';
import { nextTick } from 'vue';

nextTick(() => {
  const dom = document.getElementById('index')
  const { scene, camera, renderer, controls } = useThree({
    domId: "index",
    width: dom.clientWidth,
    height: dom.clientHeight - 2,
    fov: 60
  })
  scene.background = new THREE.Color(0xcccccc);
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

  const geometry = new THREE.CylinderGeometry(0, 10, 30, 4, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
  for (let i = 0; i < 500; i++) {

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 1000;
    mesh.position.y = (Math.random() - 0.5) * 1000;
    mesh.position.z = (Math.random() - 0.5) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }

  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288);
  dirLight2.position.set(- 1, - 1, - 1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);
  renderer.render(scene, camera)
})
</script>

<style scoped>
.text {
  padding: 30px;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
</style>