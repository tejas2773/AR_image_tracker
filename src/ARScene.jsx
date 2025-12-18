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
      // 1️⃣ Init MindAR
      mindarThree = new MindARThree({
        container: document.body,
        imageTargetSrc: "/targets.mind", // ✅ correct path
        uiScanning: true,
        uiLoading: true,
      });

      ({ renderer, scene, camera } = mindarThree);

      // 2️⃣ Light (not required for MeshBasicMaterial, but good habit)
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

      // 3️⃣ Anchor (image index 0)
      const anchor = mindarThree.addAnchor(0);

      // 4️⃣ Load poster texture
      const textureLoader = new THREE.TextureLoader();
      const posterTexture = textureLoader.load("/readyplayerone.jpeg");

      posterTexture.colorSpace = THREE.SRGBColorSpace;

      // 5️⃣ Plane geometry (match poster ratio)
      const geometry = new THREE.PlaneGeometry(1, 1);

      const material = new THREE.MeshBasicMaterial({
        map: posterTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const plane = new THREE.Mesh(geometry, material);

      // 6️⃣ Slight offset to avoid z-fighting
      plane.position.z = 0.01;

      anchor.group.add(plane);

      // 7️⃣ Start AR
      await mindarThree.start();

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

      console.log("✅ MindAR started");
    };

    start();

    // 8️⃣ Cleanup
    return () => {
      if (renderer) renderer.setAnimationLoop(null);
      if (mindarThree) mindarThree.stop();
    };
  }, []);

  return null;
}