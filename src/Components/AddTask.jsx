import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('ACCESS_TOKEN');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', formData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json' 
        }
      });
      
      setFormData({ title: '', description: '', priority: 'medium', due_date: '' });
      onTaskAdded(response.data); 
       // toast success
       try { const { default: toast } = await import('react-hot-toast'); toast.success('Task added successfully') } catch(e) {}
    } catch (error) {
      console.error("Error adding task:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] p-5 rounded-3xl shadow-2xl border border-slate-800 mb-3 min-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">Create New Task</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Row 1: Title and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Title</label>
            <input
              type="text" placeholder="What needs to be done?" required
              className="w-full p-3.5 bg-[#1e293b] text-white border border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Due Date</label>
            <input
              type="date"
              className="w-full p-3.5 bg-[#1e293b] text-white border border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all [color-scheme:dark]"
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
            />
          </div>
        </div>
        
        {/* Row 2: Description */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Description</label>
            <textarea
              placeholder="Add some details..."
              className="w-full p-4 bg-[#1e293b] text-white border border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none transition-all placeholder:text-slate-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
        </div>

        {/* Row 3: Priority Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-400 ml-1">Priority</label>
          <div className="flex p-1.5 bg-[#1e293b] border border-slate-700 rounded-2xl w-full">
            {['low', 'medium', 'high'].map((level) => (
              <label key={level} className="flex-1 relative cursor-pointer">
                <input
                  type="radio" name="priority" value={level} className="peer sr-only"
                  checked={formData.priority === level}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
                <div className={`
                  text-center py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200
                  peer-checked:bg-[#0f172a] peer-checked:shadow-lg peer-checked:scale-[0.98]
                  ${level === 'low' ? 'text-emerald-500 peer-checked:text-emerald-400' : ''}
                  ${level === 'medium' ? 'text-amber-500 peer-checked:text-amber-400' : ''}
                  ${level === 'high' ? 'text-rose-500 peer-checked:text-rose-400' : ''}
                  hover:bg-slate-700/30
                `}>
                  {level}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Row 4: Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="mt-2 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 active:scale-[0.97] transition-all disabled:bg-slate-700 disabled:text-slate-500 shadow-xl shadow-blue-900/20"
        >
          {loading ? 'Processing...' : 'Create Task'}
        </button>

      </form>
    </div>
  );
};

export default AddTask;