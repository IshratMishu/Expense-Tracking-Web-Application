import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for the API requests
const BASE_URL = 'http://localhost:6001/api/addExpense';

// Thunk to fetch all expenses from the server
export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    const response = await axios.get(BASE_URL);
    return response.data; // Returns the fetched expenses data
});

// Thunk to add a new expense to the server
export const addExpense = createAsyncThunk('expenses/addExpense', async (newExpense) => {
    const response = await axios.post(BASE_URL, newExpense);

    // If the response contains a valid insertedId, the expense is added successfully
    if (response.data.insertedId) {
        return { ...newExpense, id: response.data.insertedId };
    } else {
        throw new Error('Failed to add expense'); // In case of failure, an error is thrown
    }
});

// Initial state structure for the expenses slice
const initialState = {
    expenses: [], // Array to store the expenses data
    spendingLimits: {
        Groceries: null,
        Transportation: null,
        Healthcare: null,
        Utility: null,
        Charity: null,
        Miscellaneous: null,
    },
    grandTotal: 0, // The total amount spent across all expenses
    status: 'idle', // The status of the fetch/add operation ('idle', 'loading', 'succeeded', 'failed')
    error: null, // To store any error messages if the fetch/add operation fails
};

// Slice to manage expenses state
const expensesSlice = createSlice({
    name: 'expenses', // The name of the slice
    initialState, // The initial state of the slice
    reducers: {
        // Reducer to set the spending limits for each category
        setSpendingLimits: (state, action) => {
            state.spendingLimits = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Handling different states of the fetchExpenses async action
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading'; // Mark as loading when the fetch request is initiated
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.expenses = action.payload; // Store the fetched expenses in state
                state.grandTotal = action.payload.reduce(
                    (sum, expense) => sum + Number(expense.amount),
                    0
                ); // Calculate the grand total by summing the amounts of all expenses
                state.status = 'succeeded'; // Mark as succeeded when the fetch is successful
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed'; // Mark as failed if the fetch fails
                state.error = action.error.message; // Store the error message
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.push(action.payload); // Add the new expense to the expenses array
                state.grandTotal += Number(action.payload.amount); // Update the grand total with the new expense amount
            });
    },
});

// Export the action for setting spending limits
export const { setSpendingLimits } = expensesSlice.actions;

// Export the reducer for the expenses slice
export default expensesSlice.reducer;
