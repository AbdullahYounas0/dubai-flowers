import VanillaThreeViewer from '../components/3d/VanillaThreeViewer';
import BabylonViewer from '../components/3d/BabylonViewer';
import { ScottishModel, ColombianModel, BeautifulRosesModel, FreshFlowersModel } from '../assets/images';

const Test3DViewers = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">3D Model Viewers Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Vanilla Three.js Viewer</h2>
          <VanillaThreeViewer 
            modelPath={ScottishModel}
            height="300px"
            autoRotate={true}
            className="border rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">Scottish Bouquet Model</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Babylon.js Viewer</h2>
          <BabylonViewer 
            modelPath={ColombianModel}
            height="300px"
            autoRotate={true}
            className="border rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">Colombian Bouquet Model</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Beautiful Roses (Three.js)</h2>
          <VanillaThreeViewer 
            modelPath={BeautifulRosesModel}
            height="300px"
            autoRotate={true}
            className="border rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">Beautiful Roses Model</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Fresh Flowers (Babylon.js)</h2>
          <BabylonViewer 
            modelPath={FreshFlowersModel}
            height="300px"
            autoRotate={true}
            className="border rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">Fresh Flowers Model</p>
        </div>
      </div>
    </div>
  );
};

export default Test3DViewers;
