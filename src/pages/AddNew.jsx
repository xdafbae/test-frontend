import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';

const AddNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (formData.title.length < 20) newErrors.title = 'Title must be at least 20 characters';
    if (formData.content.length < 200) newErrors.content = 'Content must be at least 200 characters';
    if (formData.category.length < 3) newErrors.category = 'Category must be at least 3 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status) => {
    if (!validate()) return;

    try {
      await createPost({ ...formData, status });
      navigate('/');
    } catch (error) {
      alert('Failed to create post. See console for details.');
      console.error(error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Post</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Min 20 characters"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Min 3 characters"
          />
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Min 200 characters"
          ></textarea>
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button 
            onClick={() => handleSubmit('draft')}
            className="btn btn-secondary"
          >
            Save as Draft
          </button>
          <button 
            onClick={() => handleSubmit('publish')}
            className="btn btn-primary"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
