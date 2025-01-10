import ClientLayout from './clientLayout';
import "./globals.css";

export const metadata = {
  title: "Where’s My Money?",
  description: "An expense tracking web app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
         {/* ensures proper scaling on mobile devices. */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Wrap the children with ClientLayout for client-side features */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
