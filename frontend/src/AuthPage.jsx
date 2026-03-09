import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Determine which backend route to call
        const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Success! Save keys generically as 'token' and 'user' to match the rest of the app
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect based on role
                if (data.user.role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Could not connect to the server. Is Node.js running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">

            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
            </div>

            <div className="z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black tracking-tight mb-2 text-white drop-shadow-lg">
                        Certify<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">.Ai</span>
                    </h1>
                    <p className="text-purple-200 font-medium">
                        {isLogin ? 'Welcome back! Ready to learn?' : 'Create an account to save your learning paths.'}
                    </p>
                </div>

                {/* Glassmorphism Form Card */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 p-8">

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm font-semibold text-center backdrop-blur-md">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name field (Only show if signing up) */}
                        <div className={`transition-all duration-500 overflow-hidden ${isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
                            <div className="relative group p-1">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:ring-0 focus:border-cyan-400 text-white font-medium outline-none transition-all bg-white/5 backdrop-blur-md placeholder-white/40"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:ring-0 focus:border-cyan-400 text-white font-medium outline-none transition-all bg-white/5 backdrop-blur-md placeholder-white/40"
                            />
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:ring-0 focus:border-cyan-400 text-white font-medium outline-none transition-all bg-white/5 backdrop-blur-md placeholder-white/40"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-blue-600 hover:to-blue-500 text-white font-black text-lg rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center border border-cyan-300/30"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (isLogin ? 'Login 🚀' : 'Create Account ✨')}
                        </button>

                        {/* Admin Login Button - Only show in login mode */}
                        {isLogin && (
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ ...formData, email: 'admin@certify.ai', password: 'admin123' });
                                    // Auto-submit after a brief delay to show the filled form
                                    setTimeout(() => {
                                        document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                    }, 500);
                                }}
                                className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 hover:from-red-400 to-orange-600 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center border border-red-300/30"
                            >
                                🔐 Admin Login
                            </button>
                        )}
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-purple-200 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-all"
                            >
                                {isLogin ? "Sign up here" : "Login here"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
