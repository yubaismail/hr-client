import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const navItems = [
    { text: 'Dashboard', href: '/dashboard' },
    { text: 'Employees', href: '/dashboard/employees' },
    { text: 'Attendance', href: '/dashboard/attendance' },
    { text: 'Settings', href: '/dashboard/settings' }
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-5 shadow-lg">
      <h2 className="text-xl font-bold mb-6">HRMS Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.href}
                className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;