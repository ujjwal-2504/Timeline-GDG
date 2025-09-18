import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "GDG Ranchi DevFest",
  description: "Google Developer Group Ranchi - DevFest 2024 to 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
