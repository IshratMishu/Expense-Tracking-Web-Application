import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from '../redux/slices/expenseSlice';

// Create the Redux store using configureStore
const store = configureStore({
    reducer: {
        expenses: expenseReducer, 
    },
});

export default store;
