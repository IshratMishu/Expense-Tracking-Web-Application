import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API requests
const BASE_URL = 'https://expense-tracking-web-application.vercel.app/api/addExpense';
// const BASE_URL = 'http://localhost:6001/api/addExpense';

// Thunk to fetch all expenses from the server
export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
});


// Thunk to add a new expense to the server
export const addExpense = createAsyncThunk('expenses/addExpense', async (newExpense) => {
    const response = await axios.post(BASE_URL, newExpense);

    // If the response contains a valid insertedId, the expense is added successfully
    if (response.data.insertedId) {
        return { ...newExpense, id: response.data.insertedId };
    } else {
        throw new Error('Failed to add expense');
    }
});

// Initial state structure for the expenses slice
const initialState = {
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
};


// Slice to manage expenses state
const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setSpendingLimits: (state, action) => {
            state.spendingLimits = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Expenses
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.expenses = action.payload;
                state.grandTotal = action.payload.reduce(
                    (sum, expense) => sum + Number(expense.amount),
                    0
                );
                state.status = 'succeeded';
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add Expense
            .addCase(addExpense.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                // Check spending limit before adding expense
                const { category, amount } = action.payload;
                const totalSpentInCategory = state.expenses
                    .filter((expense) => expense.category === category)
                    .reduce((sum, expense) => sum + Number(expense.amount), 0);

                const limit = state.spendingLimits[category];

                if (limit && amount + totalSpentInCategory > limit) {
                    throw new Error(`Expense exceeds limit for ${category}!`);
                }

                state.expenses.push(action.payload);
                state.grandTotal += Number(action.payload.amount);
                state.status = 'succeeded';
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setSpendingLimits } = expensesSlice.actions;
export default expensesSlice.reducer;

