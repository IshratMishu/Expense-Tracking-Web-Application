import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:6001/api/addExpense';

// Thunk for fetching expenses
export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});

// Thunk for adding an expense
export const addExpense = createAsyncThunk('expenses/addExpense', async (newExpense) => {
    const response = await axios.post(BASE_URL, newExpense);
    if (response.data.insertedId) {
        return { ...newExpense, id: response.data.insertedId }; // Include the purpose field
    } else {
        throw new Error('Failed to add expense');
    }
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenses: [],
        spendingLimits: {
            Groceries: null,
            Transportation: null,
            Healthcare: null,
            Utility: null,
            Charity: null,
            Miscellaneous: null,
        },
        grandTotal: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        setSpendingLimits: (state, action) => {
            state.spendingLimits = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.expenses = action.payload;
                state.grandTotal = action.payload.reduce((sum, expense) => sum + Number(expense.amount), 0);
                state.status = 'succeeded';
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.push(action.payload); // Add the expense with the purpose field
                state.grandTotal += Number(action.payload.amount);
            });
    },
});

export const { setSpendingLimits } = expensesSlice.actions;

export default expensesSlice.reducer;
