// Note: This component was designed for React Three Fiber which we've removed
// It's currently disabled and replaced with CSS text animations
// Use CSS text effects or HTML text with animations instead

type FlowerTextProps = {
  text: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  spacing?: number;
  height?: number;
  flowerScale?: number;
  flowerType?: 'rose' | 'daisy' | 'tulip';
  flowerColors?: string[];
};

const FlowerText = ({ text, flowerColors = ['#ff69b4', '#ff5e78', '#ff4d4d', '#ffa07a'] }: FlowerTextProps) => {
  // This component is currently disabled as it requires React Three Fiber
  // Instead, use CSS text animations or HTML text with flower decorations
  return (
    <div className="text-center p-8">
      <div className="relative inline-block">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse">
          {text}
        </h2>
        <div className="absolute -top-2 -right-2">
          <span className="text-2xl animate-bounce" style={{ color: flowerColors[0] }}>🌸</span>
        </div>
        <div className="absolute -bottom-2 -left-2">
          <span className="text-2xl animate-bounce" style={{ color: flowerColors[1], animationDelay: '0.5s' }}>🌺</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">3D FlowerText Component Disabled - Using CSS Alternative</p>
    </div>
  );
};

export default FlowerText;
