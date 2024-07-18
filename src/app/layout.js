import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "E-Commerce Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="scrollbar-thin">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
