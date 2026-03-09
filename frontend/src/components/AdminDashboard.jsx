import { useState, useEffect } from 'react';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const [realUsers, setRealUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- NEW COURSE STATES ---
    const [courses, setCourses] = useState([]);
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [courseForm, setCourseForm] = useState({ title: '', organization: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/admin/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    setRealUsers(data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/admin/courses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };

        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'courses') fetchCourses();
    }, [activeTab]);

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/courses', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(courseForm)
            });
            const newCourse = await response.json();

            if (response.ok) {
                setCourses([newCourse, ...courses]);
                setCourseForm({ title: '', organization: '' });
                setIsAddingCourse(false);
            } else {
                alert(newCourse.message || "Failed to add course");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Could not connect to server.");
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">

            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
            </div>

            <div className="z-10 w-full max-w-6xl flex flex-col">
                {/* Header Area */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
                            Admin<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">.Portal</span>
                        </h1>
                        <p className="text-indigo-200 mt-2 font-medium">Manage Certify.Ai platform and monitor AI performance.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold backdrop-blur-md transition-all">
                        Exit Admin
                    </button>
                </div>

                {/* Main Dashboard Layout */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-4 border border-white/10 shadow-xl flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'users' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-indigo-200 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className="mr-3">👥</span> User Management
                            </button>
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'courses' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-indigo-200 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className="mr-3">📚</span> Course Data
                            </button>
                            <button
                                onClick={() => setActiveTab('system')}
                                className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'system' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-indigo-200 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className="mr-3">📊</span> System Monitor
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8 overflow-hidden relative">

                        {/* Tab: Users */}
                        {activeTab === 'users' && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-white mb-6">User Accounts</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 text-indigo-300 text-sm uppercase tracking-wider">
                                                <th className="pb-4 pr-4 font-semibold">Name</th>
                                                <th className="pb-4 pr-4 font-semibold">Email</th>
                                                <th className="pb-4 pr-4 font-semibold">Role</th>
                                                <th className="pb-4 pr-4 font-semibold">Status</th>
                                                <th className="pb-4 font-semibold text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {isLoading ? (
                                                <tr><td colSpan="5" className="py-4 text-center text-indigo-300 font-medium">Loading platform users...</td></tr>
                                            ) : realUsers.length === 0 ? (
                                                <tr><td colSpan="5" className="py-4 text-center text-indigo-300">No users found in database.</td></tr>
                                            ) : (
                                                realUsers.map(user => (
                                                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                        <td className="py-4 pr-4 font-medium">{user.name}</td>
                                                        <td className="py-4 pr-4 text-indigo-200">{user.email}</td>
                                                        <td className="py-4 pr-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 pr-4">
                                                            <span className="flex items-center text-emerald-400 text-sm font-semibold">
                                                                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span> Active
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-right">
                                                            <button className="text-sm font-bold text-red-400 hover:text-red-300">Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab: Courses */}
                        {activeTab === 'courses' && (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-white">Course Database</h2>
                                    <button
                                        onClick={() => setIsAddingCourse(!isAddingCourse)}
                                        className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {isAddingCourse ? 'Cancel' : '+ Add New Course'}
                                    </button>
                                </div>

                                {/* Add Course Form (Toggles Open/Closed) */}
                                {isAddingCourse && (
                                    <form onSubmit={handleAddCourse} className="bg-black/20 p-6 rounded-2xl border border-white/10 mb-8 animate-fade-in text-left">
                                        <h3 className="text-white font-bold mb-4">Add Manual Course Listing</h3>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <input
                                                type="text"
                                                placeholder="Course Title"
                                                required
                                                value={courseForm.title}
                                                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Organization (e.g., Coursera, Udemy)"
                                                required
                                                value={courseForm.organization}
                                                onChange={(e) => setCourseForm({ ...courseForm, organization: e.target.value })}
                                                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-emerald-400"
                                            />
                                            <button type="submit" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-colors">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Course List Table */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden text-left">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-black/20 text-indigo-300 text-sm uppercase tracking-wider">
                                                <th className="p-4 font-semibold">Course Title</th>
                                                <th className="p-4 font-semibold">Organization</th>
                                                <th className="p-4 font-semibold text-right">Date Added</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {courses.length === 0 ? (
                                                <tr><td colSpan="3" className="p-8 text-center text-indigo-300">No manual courses added yet.</td></tr>
                                            ) : (
                                                courses.map(course => (
                                                    <tr key={course._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                        <td className="p-4 font-bold text-cyan-100">{course.title}</td>
                                                        <td className="p-4 text-indigo-200">
                                                            <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">{course.organization}</span>
                                                        </td>
                                                        <td className="p-4 text-right text-sm text-gray-400">
                                                            {new Date(course.createdAt).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab: System */}
                        {activeTab === 'system' && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-white mb-6">System Health & AI Metrics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h4 className="text-indigo-300 text-sm font-bold uppercase mb-2">FastAPI Engine Status</h4>
                                        <div className="flex items-center text-3xl font-black text-white">
                                            <span className="w-4 h-4 rounded-full bg-emerald-400 mr-3 animate-pulse"></span> Online
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h4 className="text-indigo-300 text-sm font-bold uppercase mb-2">Total CVs Processed</h4>
                                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                            1,284
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
