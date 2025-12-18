// import { ARCanvas, ARAnchor } from "@react-three/fiber";
// import { MindAR } from "mind-ar/dist/mindar-image-three.prod.js";
// import * as THREE from "three";

// export default function App() {
//   return (
//     <ARCanvas>
//       <ARAnchor targetIndex={0}>
//         <mesh rotation={[-Math.PI / 2, 0, 0]}>
//           <planeGeometry args={[1, 1]} />
//           <meshBasicMaterial color="red" />
//         </mesh>
//       </ARAnchor>
//     </ARCanvas>
//   );
// }

import ARScene from "./ARScene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ARScene />
    </div>
  );
}
