import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import DynamicRoutes from './DynamicRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <DynamicRoutes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
