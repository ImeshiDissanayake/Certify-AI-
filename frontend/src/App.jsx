import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function App() {
  const [activeTab, setActiveTab] = useState('job');
  const [jobRole, setJobRole] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleJobSearch = async (e) => {
    e.preventDefault();
    if (!jobRole) return;

    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const response = await fetch('http://localhost:8000/api/recommend/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_role: jobRole })
      });

      const data = await response.json();
      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.detail || 'Failed to fetch recommendations');
      }
    } catch (err) {
      setError('Error connecting to AI Server. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  const handleCvUpload = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations([]);

    const formData = new FormData();
    formData.append("file", cvFile);

    try {
      const response = await fetch('http://localhost:8000/api/recommend/cv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.detail || 'Failed to upload CV');
      }
    } catch (err) {
      setError('Error connecting to AI Server. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-20 w-full max-w-5xl flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-white/10 hover:bg-red-500/20 text-white font-semibold rounded-xl border border-white/20 hover:border-red-400/50 transition-all backdrop-blur-md flex items-center shadow-lg"
        >
          <span className="mr-2">🚪</span> Logout
        </button>
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Header Area */}
        <div className="text-center mb-12 text-white">
          <h1 className="text-6xl font-black tracking-tight mb-4 drop-shadow-2xl">
            Certify<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">.Ai</span>
          </h1>
          <p className="text-xl font-medium text-purple-100 max-w-2xl mx-auto drop-shadow-md">
            Your AI-powered career navigator. Discover real-world courses tailored to your goals.
          </p>
        </div>

        {/* Main App Card (Glassmorphism) */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] shadow-2xl w-full overflow-hidden border border-white/20">

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-white/5">
            <button
              onClick={() => { setActiveTab('job'); setRecommendations([]); setError(''); }}
              className={`flex-1 py-5 px-6 text-center font-bold text-lg transition-all duration-300 ${activeTab === 'job'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text border-b-4 border-cyan-400 bg-white/5'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
            >
              <span className="mr-2 text-xl inline-block -translate-y-0.5">🎯</span> Search by Job Role
            </button>
            <button
              onClick={() => { setActiveTab('cv'); setRecommendations([]); setError(''); }}
              className={`flex-1 py-5 px-6 text-center font-bold text-lg transition-all duration-300 ${activeTab === 'cv'
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text border-b-4 border-pink-400 bg-white/5'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
            >
              <span className="mr-2 text-xl inline-block -translate-y-0.5">📄</span> Analyze My CV
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 sm:p-12">

            {/* Tab Content: Job Search */}
            {activeTab === 'job' && (
              <div className="animate-fade-in transition-all duration-500">
                <div className="mb-10 text-center">
                  <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg block">What is your dream job?</h2>
                  <p className="text-purple-200 text-lg">Enter a role to discover the most demanded certifications in the industry.</p>
                </div>

                <form onSubmit={handleJobSearch} className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <span className="text-white/60 text-2xl group-focus-within:text-cyan-400 transition-colors">💼</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g., Data Scientist, Cloud Architect..."
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-white/20 focus:ring-0 focus:border-cyan-400 text-white font-semibold text-xl outline-none transition-all bg-white/10 backdrop-blur-md shadow-inner placeholder-white/40"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !jobRole}
                    className="px-10 py-5 bg-gradient-to-r from-cyan-500 hover:from-cyan-400 to-blue-600 hover:to-blue-500 text-white font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none flex items-center justify-center whitespace-nowrap border border-cyan-300/30"
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : 'Find Courses ✨'}
                  </button>
                </form>
              </div>
            )}

            {/* Tab Content: CV Upload */}
            {activeTab === 'cv' && (
              <div className="animate-fade-in transition-all duration-500">
                <div className="mb-10 text-center">
                  <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">Discover your Skill Gap</h2>
                  <p className="text-purple-200 text-lg">Upload your resume and let our AI map out your perfect learning path.</p>
                </div>

                <form onSubmit={handleCvUpload} className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-center w-full mb-8 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <label htmlFor="dropzone-file" className={`relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden ${cvFile ? 'border-pink-400 bg-white/10' : 'border-white/30 bg-black/20 hover:bg-white/5'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                        <span className={`text-6xl mb-4 transition-transform duration-500 ${cvFile ? 'scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]' : 'group-hover:-translate-y-2 drop-shadow-lg'}`}>
                          {cvFile ? '✅' : '📄'}
                        </span>
                        <p className={`mb-2 text-2xl font-bold text-center px-4 ${cvFile ? 'text-pink-300 drop-shadow-md' : 'text-white'}`}>
                          {cvFile ? cvFile.name : 'Click to upload or drag and drop'}
                        </p>
                        {!cvFile && <p className="text-md text-white/50 font-medium tracking-wide mt-2">PDF formats only</p>}
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={(e) => setCvFile(e.target.files[0])} />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !cvFile}
                    className="w-full px-8 py-5 bg-gradient-to-r from-pink-500 hover:from-pink-400 to-purple-600 hover:to-purple-500 text-white font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none flex justify-center items-center border border-pink-400/30"
                  >
                    {loading ? (
                      <><svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Analyzing Document...</>
                    ) : 'Analyze My CV 🚀'}
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Results Area */}
          {(error || recommendations.length > 0) && (
            <div className="border-t border-white/10 bg-black/20 p-8 sm:p-12 relative overflow-hidden">

              {/* Subtle inner glow for results area */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-white/5 to-transparent blur-2xl pointer-events-none"></div>

              {error && (
                <div className="max-w-4xl mx-auto bg-red-500/10 text-red-200 p-5 rounded-2xl flex items-center border border-red-500/30 shadow-lg animate-fade-in backdrop-blur-md">
                  <span className="text-3xl mr-4 drop-shadow-md">⚠️</span>
                  <span className="font-semibold text-lg">{error}</span>
                </div>
              )}

              {recommendations.length > 0 && (
                <div className="animate-fade-in max-w-4xl mx-auto relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
                    <h3 className="text-4xl font-black text-white drop-shadow-lg tracking-tight">Top Recommended Courses</h3>
                    <span className="bg-gradient-to-r from-emerald-400/20 to-teal-500/20 text-emerald-300 border border-emerald-400/30 text-sm font-black px-5 py-2 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.2)] uppercase tracking-wider">
                      {recommendations.length} Matches Found
                    </span>
                  </div>

                  <div className="grid gap-6">
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between group relative overflow-hidden">

                        {/* Interactive glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

                        <div className="relative z-10 flex-1 pr-6 pl-2 sm:pl-4">
                          <h4 className="font-black text-2xl text-white group-hover:text-cyan-300 transition-colors mb-2 leading-tight drop-shadow-md">
                            {rec.course_title}
                          </h4>
                          <p className="text-purple-200 font-medium flex items-center text-lg">
                            <span className="mr-3 text-2xl opacity-80">🏢</span> {rec.organization}
                          </p>
                        </div>

                        <div className="relative z-10 flex flex-col items-start sm:items-end mt-6 sm:mt-0 shrink-0">
                          <div className="relative">
                            <span className="inline-flex items-center px-5 py-2.5 rounded-2xl text-base font-black bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 shadow-[0_0_15px_rgba(52,211,153,0.4)] transform group-hover:scale-105 transition-transform">
                              🔥 {rec.match_percentage}% Match
                            </span>
                          </div>

                          <button className="mt-4 text-sm font-black text-cyan-300 hover:text-cyan-100 flex items-center group-hover:underline transition-all uppercase tracking-wider">
                            View Details <span className="ml-2 text-lg group-hover:translate-x-2 transition-transform">→</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default App