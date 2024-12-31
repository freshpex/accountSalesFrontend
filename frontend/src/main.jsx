import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster position="top-right" />
          <App />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </StrictMode>,
)