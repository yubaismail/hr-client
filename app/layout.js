import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HRMS - Human Resource Management System",
  description: "A comprehensive solution for managing your organization's human resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="HRMS, Human Resource Management, Employee Management, Payroll" />
        <meta name="author" content="Your Company Name" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <main className="min-h-screen flex flex-col">
          
          {/* ✅ Header */}
          <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
              <h1 className="text-3xl font-bold tracking-wide">HRMS</h1>
              <nav>
                <ul className="flex space-x-6 text-lg">
                  {[
                    { name: "Home", path: "/" },
                    { name: "Dashboard", path: "/dashboard" },
                    { name: "Employees", path: "/employees" },
                    { name: "Attendance", path: "/attendance" },
                    { name: "Payroll", path: "/payroll" },
                  ].map(({ name, path }) => (
                    <li key={path}>
                      <Link
                        href={path}
                        className="relative text-white hover:text-gray-300 transition-all duration-300 
                        after:block after:w-0 after:h-[2px] after:bg-white after:transition-all 
                        after:duration-300 hover:after:w-full"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>

          {/* ✅ Page Content */}
          <div className="container mx-auto p-6 flex-grow">{children}</div>

          {/* ✅ Footer */}
          <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center text-sm">
              <p>© {new Date().getFullYear()} HRMS. All rights reserved.</p>
              <div className="flex justify-center space-x-6 mt-4">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="hover:underline">Terms of Service</Link>
              </div>
            </div>
          </footer>

        </main>
      </body>
    </html>
  );
}
