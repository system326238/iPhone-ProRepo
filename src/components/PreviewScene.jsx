import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Environment } from '@react-three/drei';

function MetallicPhone() {
  return (
    <group>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.25}>
        <mesh rotation={[0, Math.PI / 6, 0]}>
          <boxGeometry args={[1.8, 0.33, 3.4]} />
          <meshStandardMaterial metalness={0.88} roughness={0.22} color="#b8c2d1" />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[0, Math.PI / 6, 0]}>
          <boxGeometry args={[1.55, 0.16, 2.9]} />
          <meshStandardMaterial metalness={0.95} roughness={0.08} color="#d6e0ea" />
        </mesh>
      </Float>
    </group>
  );
}

export default function PreviewScene({ label }) {
  return (
    <div className="h-56 w-full rounded-3xl border border-white/10 bg-slate-950/80">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#f8fafc" />
        <pointLight position={[-3, 2, -2]} intensity={0.8} color="#60a5fa" />
        <Environment preset="city" />
        <MetallicPhone />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
