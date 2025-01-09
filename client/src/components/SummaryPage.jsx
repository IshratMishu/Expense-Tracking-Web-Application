'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '@/redux/slices/expenseSlice';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const categories = ["Groceries", "Transportation", "Healthcare", "Utility", "Charity", "Miscellaneous"];

const SummaryPage = () => {
    const dispatch = useDispatch();
    const { expenses } = useSelector((state) => state.expenses);

    // Fetch expenses when the component mounts
    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    // Group expenses by date and category
    const groupedExpenses = groupExpensesByDateAndCategory(expenses);

    return (
        <div className="summary">
            <h2>Summary of Expenses</h2>
            <div className="table-container">
                <ExpenseTable groupedExpenses={groupedExpenses} />
            </div>
        </div>
    );
};



/**
 * Group expenses by date and category
 * @param {Array} expenses - List of expenses
 * @returns {Object} Grouped expenses by date and category
 */
const groupExpensesByDateAndCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
        const date = new Date(expense.date).toLocaleDateString();
        const category = expense.category;

        if (!acc[date]) acc[date] = {};
        acc[date][category] = acc[date][category] || [];
        acc[date][category].push(expense);

        return acc;
    }, {});
};



/**
 * Expense Table Component
 * @param {Object} groupedExpenses - Grouped expenses by date and category
 */
const ExpenseTable = ({ groupedExpenses }) => {
    return (
        <table className="expense-table">
            <thead>
                <tr>
                    <th>Date</th>
                    {categories.map((category) => (
                        <th key={category}>{category}</th>
                    ))}
                    <th>Daily Total</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(groupedExpenses).map((date) => (
                    <ExpenseRow key={date} date={date} groupedExpenses={groupedExpenses} />
                ))}
            </tbody>
        </table>
    );
};



/**
 * Expense Row Component
 * @param {String} date - The date for the row
 * @param {Object} groupedExpenses - Grouped expenses by date and category
 */
const ExpenseRow = ({ date, groupedExpenses }) => {
    const dailyTotal = calculateDailyTotal(date, groupedExpenses);

    return (
        <tr>
            <td>{date}</td>
            {categories.map((category) => (
                <ExpenseCell
                    key={`${date}-${category}`}
                    date={date}
                    category={category}
                    groupedExpenses={groupedExpenses}
                />
            ))}
            <td>${dailyTotal.toFixed(2)}</td>
        </tr>
    );
};




/**
 * Expense Cell Component
 * @param {String} date - The date for the cell
 * @param {String} category - The category for the cell
 * @param {Object} groupedExpenses - Grouped expenses by date and category
 */
const ExpenseCell = ({ date, category, groupedExpenses }) => {
    const totalCategoryAmount = calculateTotalCategoryAmount(date, category, groupedExpenses);
    const tooltipContent = generateTooltipContent(date, category, groupedExpenses);

    return (
        <td>
            {totalCategoryAmount > 0 ? (
                <span
                    data-tooltip-id={`${date}-${category}`}
                    data-tooltip-content={tooltipContent}
                    style={{ cursor: 'pointer' }}
                >
                    ${totalCategoryAmount.toFixed(2)}
                </span>
            ) : (
                ''
            )}
            <Tooltip id={`${date}-${category}`} />
        </td>
    );
};



/**
 * Calculate total amount for a specific category on a given date
 * @param {String} date - The date for the row
 * @param {String} category - The category for the calculation
 * @param {Object} groupedExpenses - Grouped expenses by date and category
 * @returns {Number} Total amount for the category
 */
const calculateTotalCategoryAmount = (date, category, groupedExpenses) => {
    return groupedExpenses[date][category]?.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    ) || 0;
};



/**
 * Calculate the daily total for a given date
 * @param {String} date - The date for the row
 * @param {Object} groupedExpenses - Grouped expenses by date and category
 * @returns {Number} Daily total amount
 */
const calculateDailyTotal = (date, groupedExpenses) => {
    return categories.reduce(
        (sum, category) =>
            sum + calculateTotalCategoryAmount(date, category, groupedExpenses),
        0
    );
};




/**
 * Generate the tooltip content for a specific date and category
 * @param {String} date - The date for the tooltip
 * @param {String} category - The category for the tooltip
 * @param {Object} groupedExpenses - Grouped expenses by date and category
 * @returns {String} Tooltip content
 */
const generateTooltipContent = (date, category, groupedExpenses) => {
    return groupedExpenses[date][category]
        ?.map(expense => `Amount: $${expense.amount} - Purpose: ${expense.purpose}`)
        .join(', ') || '';
};

export default SummaryPage;
