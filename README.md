# Expense Tracker Application

A web application to help users input, categorize, and manage their daily expenses efficiently. Users can organize expenses by categories, set spending limits, and view categorized summaries to stay on top of their finances. This web app is responsive for all devices.

**Live Link**: https://expense-tracking-web-application-utoq.vercel.app/

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
   git clone https://github.com/IshratMishu/Expense-Tracking-Web-Application.git
   cd expense-tracker

2. **Install Dependencies**
    ```bash
    npm install

3. **Environment Setup**
   
   Ensure you have a MongoDB cluster set up. You can create one using MongoDB Atlas or connect to your local MongoDB instance.
   Create a .env file in the root directory and add the following:
   ```plaintext
   PORT=6001
   DB_USER=your_database_username
   DB_PASS=your_database_password

5. **Run the Application**
    ```bash
    npm run dev

## API Endpoints

### Add an Expense
- **Method**: POST
- **URL**: `/api/addExpense`
- **Description**: Adds a new expense to the database.
- **Request Body**:
    ```json
    {
      "category": "Groceries",
      "amount": 100,
      "purpose": "Weekly groceries",
      "date": "2025-01-10"
    }
    ```

### Get All Expenses
- **Method**: GET
- **URL**: `/api/addExpense`
- **Description**: Retrieves all expenses stored in the database.
- **Response Example**:
    ```json
    [
      {
        "_id": "60c72b2f4f1a4e3d6c4f8b9b",
        "category": "Groceries",
        "amount": 100,
        "purpose": "Weekly groceries",
        "date": "2025-01-10"
      }
    ]
    ```


