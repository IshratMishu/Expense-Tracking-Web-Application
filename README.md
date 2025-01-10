# Expense Tracker Application

A web application to help users input, categorize, and manage their daily expenses efficiently. Users can organize expenses by categories, set spending limits, and view categorized summaries to stay on top of their finances.

---

## Features

### **Expense Input**
- Add expenses in categories such as Groceries, Transportation, Healthcare, Utility, Charity, and Miscellaneous.
- Specify the purpose of each expense (e.g., "Groceries for the week").
- Automatically records the date and time of each expense.

### **Expenses Management**
- Stores expenses in a MongoDB database.
- Allows multiple entries for the same day.
- Displays categorized daily summaries with total calculations.
- Tooltips show detailed information about each expense.

### **Spending Limit**
- Set a monthly spending limit upon first use.
- Define specific spending limits for each category.
- Prevents users from exceeding spending limits with real-time alerts.

---

## Technologies Used

### **Frontend**
- HTML
- Raw CSS (no libraries)
- Next.js
- Redux Toolkit

### **Backend**
- Node.js with Express.js

### **Database**
- MongoDB

---

## Installation and Setup

### Prerequisites

- Ensure you have the following installed:
  - [Node.js](https://nodejs.org/) (v14 or later)
  - [MongoDB](https://www.mongodb.com/) (local or hosted)
  - [npm](https://www.npmjs.com/)

### Installation Steps

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/IshratMishu/Expense-Tracking-Web-Application
   cd expense-tracker

2. **Install Dependencies**
    ```bash
    npm install

3. **Environment Setup**
   Ensure you have a MongoDB cluster set up. You can create one using MongoDB Atlas or connect to your local MongoDB instance.
   Create a .env file in the root directory and add the following:
   ```plaintext
   PORT=5000
   DB_USER=your_database_username
   DB_PASS=your_database_password

4. **Run the Application**
    ```bash
    npm run dev


