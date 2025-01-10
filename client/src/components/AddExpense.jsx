'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addExpense, fetchExpenses, setSpendingLimits } from '@/redux/slices/expenseSlice';


const ExpenseTracker = () => {
    const dispatch = useDispatch();
    const { expenses, spendingLimits, grandTotal } = useSelector((state) => state.expenses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    // Check if the user has set the spending limits before showing the limit modal
    useEffect(() => {
        dispatch(fetchExpenses());

        // Check if limits are saved in localStorage and set them
        const savedLimits = localStorage.getItem('spendingLimits');
        if (savedLimits) {
            const parsedLimits = JSON.parse(savedLimits);
            dispatch(setSpendingLimits(parsedLimits)); // Set limits from localStorage
        }

        // Check if limits have been set previously
        const hasSetLimit = localStorage.getItem('hasSetLimit');
        if (!hasSetLimit) {
            setIsLimitModalOpen(true);
        }
    }, [dispatch]);

    const handleSetLimits = (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const amount = Number(form.number.value); // Amount to set as limit

        if (!category || amount <= 0) {
            toast.error('Please select a category and set a valid amount.');
            return;
        }

        // Setting the spending limit
        const newLimits = { ...spendingLimits, [category]: amount };
        dispatch(setSpendingLimits(newLimits));

        // Save the new limits in localStorage
        localStorage.setItem('spendingLimits', JSON.stringify(newLimits));

        // Set the flag in localStorage to prevent showing limit modal again
        localStorage.setItem('hasSetLimit', 'true');

        setIsLimitModalOpen(false);
        toast.success('Spending limit set successfully');
    };

    const handleAddExpenses = (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const amount = Number(form.amount.value);
        const purpose = form.purpose.value;

        // Convert the date to a serializable string (ISO format)
        const date = new Date().toISOString();

        // Get the total spent in the category
        const totalSpentInCategory = expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + Number(expense.amount), 0);

        // Get the spending limit for the selected category
        const limit = spendingLimits[category];

        // If the limit is not set (null or undefined), allow adding the expense
        if (limit !== null && amount + totalSpentInCategory > limit) {
            toast.error(`Expense exceeds limit! Remaining limit for ${category}: $${(limit - totalSpentInCategory).toFixed(2)}`);
            return;
        }

        const newExpense = { category, amount, purpose, date };
        dispatch(addExpense(newExpense));
        setIsModalOpen(false);
    };

    return (
        <div className="AddExpense">
            <h2>Total Expenses</h2>
            <p>${grandTotal.toFixed(2)}</p>
            <button onClick={() => setIsModalOpen(true)} className="Button">Add Expense</button>

            {/* Set Limit Button Modal when starting application */}
            {isLimitModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={() => setIsExpenseModalOpen(true)} className="Button">Set Your Limit</button>
                    </div>
                </div>
            )}

            {/* Set Limit Categories and amount Modal*/}
            {isExpenseModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <form onSubmit={handleSetLimits}>
                            <div className="form-group limit">
                                <input type="number" name="number" placeholder="Insert an amount" required />
                                <select name="category" required>
                                    <option value="">Select Categories</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Utility">Utility</option>
                                    <option value="Charity">Charity</option>
                                    <option value="Miscellaneous">Miscellaneous</option>
                                </select>
                            </div>
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setIsExpenseModalOpen(false)} className='cancelButton'>
                                    Cancel
                                </button>
                                <button type="submit" className="Button">Set Limit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Expense Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New Expense</h3>
                        <form onSubmit={handleAddExpenses}>
                            <div className="form-group">
                                <select name="category" required>
                                    <option value="">Select Categories</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Utility">Utility</option>
                                    <option value="Charity">Charity</option>
                                    <option value="Miscellaneous">Miscellaneous</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="number" name="amount" placeholder="Enter amount" required />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="purpose"
                                    placeholder="Enter purpose - e.g., Groceries for the week"
                                    required
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="button" onClick={() => setIsModalOpen(false)} className='cancelButton'>
                                    Cancel
                                </button>
                                <button type="submit" className="Button">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseTracker;
