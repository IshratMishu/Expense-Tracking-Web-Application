'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '@/redux/slices/expenseSlice';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const SummaryPage = () => {
    const dispatch = useDispatch();
    const { expenses } = useSelector((state) => state.expenses);

    const categories = ["Groceries", "Transportation", "Healthcare", "Utility", "Charity", "Miscellaneous"];

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    const groupedExpenses = expenses.reduce((acc, expense) => {
        const date = new Date(expense.date).toLocaleDateString();
        const category = expense.category;

        if (!acc[date]) acc[date] = {};
        acc[date][category] = acc[date][category] || [];
        acc[date][category].push(expense);

        return acc;
    }, {});

    return (
        <div className="summary">
            <h2>Summary of Expenses</h2>
           <div className='table-container'>
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
                    {Object.keys(groupedExpenses).map((date) => {
                        const dailyTotal = categories.reduce(
                            (sum, category) =>
                                sum +
                                (groupedExpenses[date][category]?.reduce(
                                    (catSum, expense) => catSum + Number(expense.amount),
                                    0
                                ) || 0),
                            0
                        );

                        return (
                            <tr key={date}>
                                <td>{date}</td>
                                {categories.map((category) => {
                                    const totalCategoryAmount = groupedExpenses[date][category]?.reduce(
                                        (sum, expense) => sum + Number(expense.amount),
                                        0
                                    ) || 0;

                                    const tooltipContent =
                                        groupedExpenses[date][category]
                                            ?.map(expense => `Amount: $${expense.amount} - Purpose: ${expense.purpose}`)
                                            .join('\n') || '';

                                    return (
                                        <td key={`${date}-${category}`}>
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
                                })}
                                <td>${dailyTotal.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
           </div>
        </div>
    );
};

export default SummaryPage;

