// Note: This component was designed for React Three Fiber which we've removed
// It's currently disabled and replaced with CSS animations
// Use CSS animations in FlowerSeparator instead

type FloatingParticlesProps = {
  count?: number;
  size?: number;
  color?: string;
  opacity?: number;
  bounds?: [number, number, number];
  speed?: number;
};

const FloatingParticles = (_props: FloatingParticlesProps) => {
  // This component is currently disabled as it requires React Three Fiber
  // Instead, we use CSS animations in FlowerSeparator
  return (
    <div className="text-center p-4 text-gray-500">
      <p className="text-sm">Floating Particles Component Disabled</p>
      <p className="text-xs">Use CSS animations in FlowerSeparator instead</p>
    </div>
  );
};

export default FloatingParticles;
