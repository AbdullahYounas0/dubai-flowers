// Note: This component was designed for React Three Fiber which we've removed
// It's currently disabled and replaced with CSS3D animations
// If you need 3D flowers, use the VanillaThreeViewer with GLB models instead

type RealisticFlowerProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  flowerType?: 'rose' | 'daisy' | 'tulip';
  petalCount?: number;
  petalColor?: string;
  centerColor?: string;
  stemColor?: string;
  swayFactor?: number;
};

const RealisticFlower = (_props: RealisticFlowerProps) => {
  // This component is currently disabled as it requires React Three Fiber
  // Instead, we use CSS3D animations in FlowerSeparator or GLB models in VanillaThreeViewer
  return (
    <div className="text-center p-4 text-gray-500">
      <p className="text-sm">3D Flower Component Disabled</p>
      <p className="text-xs">Use GLB models with VanillaThreeViewer instead</p>
    </div>
  );
};

export default RealisticFlower;
