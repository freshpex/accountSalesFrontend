import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { Suspense, lazy } from 'react';
import SuspenseLoadingUI from './UI';
import './App.css';
import ErrorBoundary from './pages/errorBoundary';

const AppRoutes = lazy(() => import('./components/routes'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <FilterProvider>
          <Suspense fallback={<SuspenseLoadingUI />}>
            <AppRoutes />
          </Suspense>
        </FilterProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;