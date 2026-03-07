import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import Modal from './Modal';
import AddTask from './AddTask';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedTask, setSelectedTask] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 4;

    const token = localStorage.getItem('ACCESS_TOKEN');
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    });

    // Modified Effect: Re-fetch tasks when switching into or out of Trash
    useEffect(() => { 
       
            fetchTasks(); 
        
    }, [filter]);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
            console.log(response.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
                navigate('/login');
            }
        }
    };

    // New: Fetch specifically soft-deleted tasks
    const fetchTrashedTasks = async () => {
        try {
            const response = await api.get('/tasks/trash');
            setTasks(response.data);
        } catch (err) {
            console.error("Error fetching trash:", err);
        }
    };

    const deleteTask = async (id) => {
        const message = filter === 'trash' ? "Permanently delete this task?" : "Move this task to trash?";
            const result = await Swal.fire({
                title: 'Move to trash?',
                text: 'This task will be moved to trash.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, move it',
                cancelButtonText: 'Cancel'
            })
            if (result.isConfirmed) {
            try {
                // If in trash view, we could call a force-delete endpoint, 
                // but standard delete will suffice for the soft-delete move.
                await api.delete(`/tasks/${id}`);
                filter === 'trash' ? fetchTrashedTasks() : fetchTasks();
                    Swal.fire('Moved!', 'Task moved to trash.', 'success')
            } catch (error) { console.error(error); }
        }
    };

    // New: Restore functionality
    const restoreTask = async (id) => {
        try {
            await api.put(`/tasks/${id}/restore`);
            fetchTrashedTasks(); // Refresh the trash list
        } catch (error) { console.error("Restore failed:", error); }
    };

    const toggleDone = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            await api.put(`/tasks/${task.id}`, { status: newStatus });
            fetchTasks();
        } catch (error) { console.error(error); }
    };

    const filteredTasks = tasks.filter(task => {
    // 1. If user wants TRASH, show only items with a timestamp
    if (filter === 'trash') return task.deleted_at !== null;

    // 2. For all other filters, EXCLUDE trashed items first
    if (task.deleted_at !== null) return false;

    // 3. Apply standard filters
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return task.priority === filter;
});

    // Pagination Logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    useEffect(() => { setCurrentPage(1); }, [filter]);

    return (
        <div className="bg-[#0f172a] min-h-screen w-full mx-auto p-6 text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#fab12a]">My Tasks</h1>
                <button 
                    onClick={() => setShowAdd(true)} 
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all"
                >
                    + New Task
                </button>
            </div>

            {/* Filter Bar - Added 'trash' option */}
            <div className="flex flex-wrap gap-3 mb-10 items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Filter:</span>
                <div className="flex bg-[#1e293b] p-1 rounded-xl border border-slate-700">
                    {['all', 'low', 'medium', 'high', 'completed', 'trash'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all
                            ${filter === type ? 'bg-[#0f172a] text-blue-400 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {showAdd && (
                <Modal onClose={() => setShowAdd(false)}>
                    <AddTask onTaskAdded={() => { fetchTasks(); setShowAdd(false); }} />
                </Modal>
            )}

            {/* Task Grid - 2 columns per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {currentTasks.map(task => (
                    <div key={task.id} 
                        className={`group p-6 rounded-2xl border transition-all cursor-pointer hover:border-slate-500 
                        ${task.status === 'completed' ? 'bg-[#1e293b]/50 border-slate-800' : 'bg-[#1e293b] border-slate-700 shadow-xl'}`}
                        onClick={() => setSelectedTask(task)}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className={`font-bold text-xl leading-tight ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                                {task.title}
                            </h3>
                            <div className={`w-3 h-3 rounded-full mt-2
                                ${task.priority === 'high' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : ''}
                                ${task.priority === 'medium' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}
                                ${task.priority === 'low' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : ''}
                            `}></div>
                        </div>

                        <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-12">
                            {task.description || "No additional details."}
                        </p>
                        
                        <div className="flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-wider">
                            <span className="text-slate-500">Deadline:</span>
                            <span className={task.status === 'completed' ? 'text-slate-600' : 'text-blue-400'}>
                                {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No Deadline'}
                            </span>
                        </div>

                        {/* Action Row - Switches based on trash view */}
                        <div className="flex justify-between items-center pt-5 border-t border-slate-700/50" onClick={(e) => e.stopPropagation()}>
                            <span className={`text-[10px] px-3 py-1.5 rounded-lg uppercase font-black ${task.status === 'completed' ? 'bg-slate-800 text-slate-500' : 'bg-blue-500/10 text-blue-400'}`}>
                                {task.status}
                            </span>
                            <div className="flex gap-2">
                                {filter === 'trash' ? (
                                    // RESTORE BUTTON (Only shows in Trash)
                                    <button 
                                        onClick={() => restoreTask(task.id)} 
                                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                        title="Restore Task"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                ) : (
                                    // DONE BUTTON (Shows in normal views)
                                    <button 
                                        onClick={() => toggleDone(task)} 
                                        className={`p-2 rounded-lg transition-all ${task.status === 'completed' ? 'text-slate-500 hover:bg-slate-800' : 'text-emerald-500 hover:bg-emerald-500/10'}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => deleteTask(task.id)} 
                                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                                    title={filter === 'trash' ? "Permanent Delete" : "Move to Trash"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-10">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-4 py-2 bg-[#1e293b] text-slate-400 rounded-xl disabled:opacity-30 hover:bg-slate-700 transition-all font-bold"
                    >
                        Prev
                    </button>
                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-[#1e293b] text-slate-400 hover:bg-slate-700'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-4 py-2 bg-[#1e293b] text-slate-400 rounded-xl disabled:opacity-30 hover:bg-slate-700 transition-all font-bold"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tasks;