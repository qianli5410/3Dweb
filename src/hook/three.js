
import { nextTick, ref } from 'vue'
// 引入three.js
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const useThree = function({domId,width,height}){
 
  const scene = new THREE.Scene();
  let showLoding = ref(true)
  const camera = new THREE.PerspectiveCamera(40, width / height, 1, 5000);
  camera.position.set(5, 3, 8);
  
  const renderer = new THREE.WebGLRenderer();
  renderer.render(scene, camera); //执行渲染操作
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)

  nextTick(()=>{
    const dom = document.getElementById(domId)
    dom.appendChild(renderer.domElement)
  })

  showLoding.value = false

  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置相机控件轨道控制器OrbitControls
  controls.target.set(0, 0, 0);
  controls.update();//update()函数内会执行camera.lookAt(controls.targe)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
  
  // onresize 事件会在窗口被调整大小时发生
  window.onresize = () => {
    const d = document.getElementById(domId)
    const [w,h] = [d.clientWidth,d.clientHeight-2]
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  
  return {
    scene,camera,renderer,controls,showLoding
  }

}