import { configureStore } from '@reduxjs/toolkit';

import orderReducer from './orderslice';
const store = configureStore({
    reducer: {
      
        order: orderReducer,
  
    },
});

export default store;
