import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { Suspense, lazy } from 'react';
import SuspenseLoadingUI from './UI';
import './App.css';

const AppRoutes = lazy(() => import('./routes'));

function App() {
  return (
    <Router>
      <FilterProvider>
        <Suspense fallback={<SuspenseLoadingUI />}>
          <AppRoutes />
        </Suspense>
      </FilterProvider>
    </Router>
  );
}

export default App;