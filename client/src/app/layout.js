export const metadata = {
  title: "Where’s My Money?",
  description: "An expense tracking web app",
};

import ClientLayout from './clientLayout';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the children with ClientLayout for client-side features */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
