import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './pages/errorBoundary';
import { FilterProvider } from './context/FilterContext';
import { Suspense, lazy } from 'react';
import SuspenseLoadingUI from './UI';
import './App.css';

const AppRoutes = lazy(() => import('./routes'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <FilterProvider>
          <Suspense fallback={<SuspenseLoadingUI />}>
            <AppRoutes />
          </Suspense>
        </FilterProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;