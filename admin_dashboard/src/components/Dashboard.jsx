import React, { useState } from 'react';
import { Newspaper, Image, Users, Power } from 'lucide-react';
import NewsManager from './NewsManager.jsx';

import GalleryManager from './GalleryManager.jsx';
import StaffManager from './StaffManager.jsx';



const Dashboard = ({ url, token, onLogout }) => {
  const [activePage, setActivePage] = useState('news');

  const renderPage = () => {
    const props = { url, token };
    switch (activePage) {
      case 'news':
        return <NewsManager {...props} />;
      case 'gallery':
        return <GalleryManager {...props} />;
      case 'staff':
        return <StaffManager {...props} />;
      default:
        return <NewsManager {...props} />;
    }
  };
  
  const NavLink = ({ page, icon, children }) => (
    <button
        onClick={() => setActivePage(page)}
        className={`flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-left ${
            activePage === page 
            ? 'bg-gray-800 text-white' 
            : 'text-gray-600 hover:bg-gray-200'
        }`}
    >
        {icon}
        <span className="ml-3">{children}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
           <h1 className="text-xl font-bold text-gray-800 text-center">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
            <NavLink page="news" icon={<Newspaper className="h-5 w-5" />}>News & Announcements</NavLink>
            <NavLink page="gallery" icon={<Image className="h-5 w-5" />}>Gallery</NavLink>
            <NavLink page="staff" icon={<Users className="h-5 w-5" />}>Staff Details</NavLink>
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
            <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
            >
                <Power className="h-5 w-5" />
                <span className="ml-3">Logout</span>
            </button>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default Dashboard;