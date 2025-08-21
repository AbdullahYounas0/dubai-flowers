import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/layout/Header.tsx'
import Footer from './components/layout/Footer.tsx'
import ErrorBoundary from './components/ErrorBoundary'

const Home = lazy(() => import('./pages/Home.tsx'))
const FlowersGallery = lazy(() => import('./pages/FlowersGallery.tsx'))
const AverageProducts = lazy(() => import('./pages/AverageProducts.tsx'))
const PremiumProducts = lazy(() => import('./pages/PremiumProducts.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))


const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flowers" element={<FlowersGallery />} />
                    <Route path="/average-products" element={<AverageProducts />} />
                    <Route path="/premium-products" element={<PremiumProducts />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
