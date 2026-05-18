import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FileText, PlusSquare, LayoutTemplate } from 'lucide-react';
import AllPosts from './pages/AllPosts';
import AddNew from './pages/AddNew';
import EditPost from './pages/EditPost';
import Preview from './pages/Preview';

function App() {
  const location = useLocation();

  const navigation = [
    { name: 'All Posts', href: '/', icon: FileText },
    { name: 'Add New', href: '/add', icon: PlusSquare },
    { name: 'Preview', href: '/preview', icon: LayoutTemplate },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Post Article</h1>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-blue-700' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<AllPosts />} />
            <Route path="/add" element={<AddNew />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
