import VanillaThreeViewer from './VanillaThreeViewer';

interface FlowerModelViewerProps {
  modelPath: string;
  height?: string;
  autoRotate?: boolean;
  scale?: number;
  controls?: boolean;
  className?: string;
  showShadows?: boolean;
}

const FlowerModelViewer = ({ 
  modelPath,
  height = "400px",
  autoRotate = true,
  className = ""
}: FlowerModelViewerProps) => {
  return (
    <VanillaThreeViewer
      modelPath={modelPath}
      height={height}
      autoRotate={autoRotate}
      className={className}
    />
  );
};

export default FlowerModelViewer;
