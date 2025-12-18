import { useEffect } from "react";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

export default function ARScene() {
  useEffect(() => {
    let mindarThree;
    let renderer;
    let scene;
    let camera;

    const start = async () => {
      mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "/targets.mind",
        uiScanning: true,
        uiLoading: true,
      });

      ({ renderer, scene, camera } = mindarThree);

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      const anchor = mindarThree.addAnchor(0);

      const geometry = new THREE.PlaneGeometry(1, 0.6);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });

      const plane = new THREE.Mesh(geometry, material);
      plane.position.z = 0.01;

      anchor.group.add(plane);

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

      console.log("✅ MindAR started");
    };

    start();

    return () => {
      if (renderer) renderer.setAnimationLoop(null);
      if (mindarThree) mindarThree.stop();
    };
  }, []);

  return null;
}
