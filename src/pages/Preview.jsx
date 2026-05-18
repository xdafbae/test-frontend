import { useState, useEffect } from 'react';
import { getPosts } from '../api/posts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Preview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 4; // Display 4 posts per page for demo

  useEffect(() => {
    const fetchPublishedPosts = async () => {
      try {
        setLoading(true);
        // We fetch 100 posts and filter in frontend for simplicity of this demo,
        // since the PRD doesn't specify a backend filter by status, just limit/offset.
        // A better approach would be to add ?status=publish to backend.
        const offset = (page - 1) * limit;
        const allPosts = await getPosts(100, 0); // Get all to filter
        const published = (allPosts || []).filter(p => p.status === 'publish');
        
        // Paginate manually on frontend for now
        const paginated = published.slice(offset, offset + limit);
        setPosts(paginated);
      } catch (error) {
        console.error('Failed to load preview posts', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPublishedPosts();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Blog Preview</h2>
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading articles...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">No published articles yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.created_date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.content}
                </p>
                <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                  Read more &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-gray-700">Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={posts.length < limit}
          className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Preview;
