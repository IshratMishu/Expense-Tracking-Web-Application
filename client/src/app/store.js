import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from '../redux/slices/expenseSlice';

const store = configureStore({
    reducer: {
        expenses: expenseReducer,
    },
});

export default store;
