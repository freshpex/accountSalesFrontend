import { BrowserRouter as Router } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import './App.css';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <FilterProvider>
        <AppRoutes />
      </FilterProvider>
    </Router>
  );
}

export default App;