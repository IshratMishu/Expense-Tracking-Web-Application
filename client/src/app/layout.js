'use client'
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";


// export const metadata = {
//   title: "Where’s My Money?",
//   description: "An expense tracking web app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
      <body>
        {children}
        <Toaster />
      </body>
      </Provider>
    </html>
  );
}
