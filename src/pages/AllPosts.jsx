import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { getPosts, updatePost } from '../api/posts';

const AllPosts = () => {
  const [activeTab, setActiveTab] = useState('publish');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tabs = [
    { id: 'publish', label: 'Published' },
    { id: 'draft', label: 'Drafts' },
    { id: 'thrash', label: 'Trashed' },
  ];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Fetch 100 limit for simplicity on AllPosts page (in production we'd add paging here too)
      const data = await getPosts(100, 0);
      // Ensure data is array (if empty it might be null or we fallback to [])
      setPosts(data || []);
    } catch (error) {
      console.error('Failed to fetch posts', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTrash = async (post) => {
    try {
      await updatePost(post.id, {
        title: post.title,
        content: post.content,
        category: post.category,
        status: 'thrash'
      });
      // Refresh list
      fetchPosts();
    } catch (error) {
      alert('Failed to trash post');
    }
  };

  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => post.status === activeTab);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Posts</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  Loading posts...
                </td>
              </tr>
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  No posts found in this tab.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-gray-900">{post.title}</td>
                  <td className="table-cell text-gray-500">{post.category}</td>
                  <td className="table-cell text-right space-x-3">
                    <button 
                      onClick={() => navigate(`/edit/${post.id}`)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Pencil className="h-5 w-5 inline" />
                    </button>
                    {post.status !== 'thrash' && (
                      <button 
                        onClick={() => handleTrash(post)}
                        className="text-red-600 hover:text-red-900"
                        title="Move to Trash"
                      >
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPosts;
