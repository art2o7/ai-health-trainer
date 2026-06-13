import React, { useState, useEffect } from 'react';
import { Plus, Trash2, TrendingDown, Flame, Dumbbell, Calendar, MessageSquare, Upload, Zap, LogOut, Settings, Link2, Activity } from 'lucide-react';

export default function AIHealthTrainerApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('healthAppUsers');
    return saved ? JSON.parse(saved) : [];
  });
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [zwiftConnected, setZwiftConnected] = useState(false);
  const [zwiftData, setZwiftData] = useState(null);
  const [showZwiftModal, setShowZwiftModal] = useState(false);
  const [zwiftUsername, setZwiftUsername] = useState('');
  const [zwiftPassword, setZwiftPassword] = useState('');

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem('healthAppUsers', JSON.stringify(users));
  }, [users]);

  // Simulate Zwift Data (Real Zwift API-like structure)
  const mockZwiftData = {
    'user@example.com': {
      profile: { username: 'RiderAlpha', firstName: 'Alpha', lastName: 'Runner', avatar: '🏃' },
      recentRides: [
        { 
          date: new Date().toISOString().split('T')[0],
          name: 'Watopia - Rolling Hills',
          type: 'Run',
          minutes: 35,
          distance: 5.2,
          elevation: 245,
          avgPower: 245,
          maxPower: 580,
          avgHeartRate: 168,
          maxHeartRate: 185,
          calories: 320,
          avgSpeed: 8.9,
          maxSpeed: 12.1
        },
        { 
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          name: 'Thorpe Park',
          type: 'Run',
          minutes: 42,
          distance: 6.1,
          elevation: 180,
          avgPower: 220,
          maxPower: 510,
          avgHeartRate: 162,
          maxHeartRate: 178,
          calories: 385,
          avgSpeed: 8.7,
          maxSpeed: 11.8
        },
        { 
          date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
          name: 'London Loop',
          type: 'Run',
          minutes: 28,
          distance: 4.1,
          elevation: 120,
          avgPower: 210,
          maxPower: 490,
          avgHeartRate: 165,
          maxHeartRate: 180,
          calories: 250,
          avgSpeed: 8.8,
          maxSpeed: 11.5
        }
      ],
      totalStats: {
        totalDistance: 15.4,
        totalTime: 105,
        totalCalories: 955,
        avgPower: 225,
        level: 25,
        points: 8450
      }
    },
    'demo@test.com': {
      profile: { username: 'RiderBeta', firstName: 'Beta', lastName: 'Athlete', avatar: '💪' },
      recentRides: [
        { 
          date: new Date().toISOString().split('T')[0],
          name: 'Watopia - Downtown',
          type: 'Run',
          minutes: 45,
          distance: 6.5,
          elevation: 320,
          avgPower: 280,
          maxPower: 620,
          avgHeartRate: 172,
          maxHeartRate: 188,
          calories: 415,
          avgSpeed: 8.6,
          maxSpeed: 12.5
        }
      ],
      totalStats: {
        totalDistance: 6.5,
        totalTime: 45,
        totalCalories: 415,
        avgPower: 280,
        level: 28,
        points: 9200
      }
    }
  };

  // Register
  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    if (users.find(u => u.email === email)) {
      alert('อีเมลนี้มีการสมัครแล้ว');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      course: null,
      currentWeight: 97,
      targetWeight: 55,
      startDate: new Date().toISOString().split('T')[0],
      weights: [{ date: new Date().toISOString().split('T')[0], weight: 97 }],
      mealPhotos: [],
      exercises: [],
      zSwiftConnected: false,
      facebookLogin: false
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setEmail('');
    setPassword('');
    setName('');
    alert('สมัครสมาชิกสำเร็จ! ยินดีต้อนรับ ' + name);
  };

  // Login
  const handleLogin = () => {
    if (!email || !password) {
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setEmail('');
      setPassword('');
    } else {
      alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  // Facebook Login (Simulated)
  const handleFacebookLogin = () => {
    alert('ในแอปจริง จะเชื่อต่อกับ Facebook OAuth');
    const facebookUser = {
      id: Date.now(),
      name: 'Facebook User ' + Math.random().toString(36).substr(2, 9),
      email: 'fb_' + Math.random().toString(36).substr(2, 9) + '@facebook.com',
      password: 'facebook',
      course: null,
      currentWeight: 97,
      targetWeight: 55,
      startDate: new Date().toISOString().split('T')[0],
      weights: [{ date: new Date().toISOString().split('T')[0], weight: 97 }],
      mealPhotos: [],
      exercises: [],
      zSwiftConnected: false,
      facebookLogin: true
    };
    setUsers([...users, facebookUser]);
    setCurrentUser(facebookUser);
  };

  // Connect Zwift
  const connectZwift = () => {
    if (!zwiftUsername || !zwiftPassword) {
      alert('กรุณากรอกชื่อผู้ใช้ Zwift และรหัสผ่าน');
      return;
    }

    // Simulate Zwift API Authentication
    setTimeout(() => {
      const updatedUser = { ...currentUser, zwiftConnected: true, zwiftUsername };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      
      // Simulate fetching Zwift data
      const data = mockZwiftData[currentUser.email] || mockZwiftData['demo@test.com'];
      setZwiftData(data);
      setZwiftConnected(true);
      setZwiftUsername('');
      setZwiftPassword('');
      alert('✅ เชื่อต่อ Zwift สำเร็จ! 🎉');
    }, 1500);
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setAuthMode('login');
    setZwiftConnected(false);
    setZwiftData(null);
  };

  if (!currentUser) {
    return <LoginPage 
      authMode={authMode} 
      setAuthMode={setAuthMode}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      name={name}
      setName={setName}
      onRegister={handleRegister}
      onLogin={handleLogin}
      onFacebookLogin={handleFacebookLogin}
    />;
  }

  return (
    <MainApp 
      user={currentUser}
      setUser={setCurrentUser}
      users={users}
      setUsers={setUsers}
      zwiftConnected={zwiftConnected}
      zwiftData={zwiftData}
      setZwiftConnected={setZwiftConnected}
      setZwiftData={setZwiftData}
      onConnectZwift={connectZwift}
      onLogout={handleLogout}
      showZwiftModal={showZwiftModal}
      setShowZwiftModal={setShowZwiftModal}
      zwiftUsername={zwiftUsername}
      setZwiftUsername={setZwiftUsername}
      zwiftPassword={zwiftPassword}
      setZwiftPassword={setZwiftPassword}
    />
  );
}

// Login Page Component
function LoginPage({ authMode, setAuthMode, email, setEmail, password, setPassword, name, setName, onRegister, onLogin, onFacebookLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full p-4 mb-4">
            <Zap className="text-emerald-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Health Trainer</h1>
          <p className="text-emerald-100">ลดน้ำหนักด้วย AI Coach ส่วนตัว</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                authMode === 'login'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ล็อคอิน
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                authMode === 'register'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              สมัครสมาชิก
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            {authMode === 'register' && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ชื่อจริง"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={authMode === 'login' ? onLogin : onRegister}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition mb-4"
          >
            {authMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">หรือ</span>
            </div>
          </div>

          {/* Facebook Login */}
          <button
            onClick={onFacebookLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            เข้าผ่าน Facebook
          </button>

          {/* Demo Account */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-gray-700 mb-2">💡 ทดลองใช้ Demo Account:</p>
            <p className="text-xs text-gray-600 mb-1"><strong>อีเมล:</strong> user@example.com</p>
            <p className="text-xs text-gray-600"><strong>รหัสผ่าน:</strong> 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function MainApp({ user, setUser, users, setUsers, zwiftConnected, zwiftData, setZwiftConnected, setZwiftData, onConnectZwift, onLogout, showZwiftModal, setShowZwiftModal, zwiftUsername, setZwiftUsername, zwiftPassword, setZwiftPassword }) {
  const [course, setCourse] = useState(user.course);
  const [activeTab, setActiveTab] = useState('home');

  const coursePlans = {
    3: {
      name: 'Express (3 เดือน)',
      months: 3,
      targetWeekly: 2.5,
      dailyCalories: 1800,
      workoutDays: 5,
      description: 'โปรแกรมเข้มข้นสำหรับผู้มีเป้าหมายชัดเจน',
      meals: ['ข้าวหมู', 'ไก่ทอด', 'ปลาแซลมอน', 'วนุ่น', 'ไข่ต้ม'],
      workouts: [
        { day: 'วันจันทร์', name: 'วิ่ง 30 นาที', calories: 300 },
        { day: 'วันอังคาร', name: 'ยกน้ำหนัก 45 นาที', calories: 350 },
        { day: 'วันพุธ', name: 'ว่ายน้ำ 30 นาที', calories: 280 },
        { day: 'วันพฤหัสบดี', name: 'Yoga + Cardio 40 นาที', calories: 280 },
        { day: 'วันศุกร์', name: 'ยิมทั่วไป 50 นาที', calories: 400 }
      ]
    },
    6: {
      name: 'Standard (6 เดือน)',
      months: 6,
      targetWeekly: 1.5,
      dailyCalories: 2000,
      workoutDays: 4,
      description: 'โปรแกรมสมดุล สำหรับผู้ที่ต้องการลดแบบยั่งยืน',
      meals: ['ข้าวไก่', 'ปลา', 'กุ้ง', 'เนื้อวัว', 'ผัก'],
      workouts: [
        { day: 'วันจันทร์', name: 'วิ่ง 25 นาที', calories: 250 },
        { day: 'วันพุธ', name: 'ยกน้ำหนัก 40 นาที', calories: 320 },
        { day: 'วันศุกร์', name: 'ว่ายน้ำ 25 นาที', calories: 250 },
        { day: 'วันอาทิตย์', name: 'Yoga 30 นาที', calories: 150 }
      ]
    },
    9: {
      name: 'Gentle (9 เดือน)',
      months: 9,
      targetWeekly: 1,
      dailyCalories: 2200,
      workoutDays: 3,
      description: 'โปรแกรมสบายๆ แต่มีประสิทธิภาพ',
      meals: ['ข้าวผัด', 'สเต็ก', 'อาหารทะเล', 'ข้าวแกง', 'บุฟเฟ่ต์'],
      workouts: [
        { day: 'วันจันทร์', name: 'วิ่งชิล 20 นาที', calories: 200 },
        { day: 'วันพุธ', name: 'ยิม 30 นาที', calories: 250 },
        { day: 'วันศุกร์', name: 'เดินเร็ว 30 นาที', calories: 150 }
      ]
    }
  };

  // Zwift Modal
  if (showZwiftModal) {
    return (
      <div className="min-h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">🚴</div>
            <h2 className="text-3xl font-bold text-gray-900">เชื่อต่อ Zwift</h2>
          </div>
          <p className="text-gray-600 mb-6">ดึงข้อมูลการออกกำลังกายจริงจากแอป Zwift</p>

          {!zwiftConnected ? (
            <div className="space-y-4">
              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🏃 ล็อคอิน Zwift
                </h3>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้ใช้ Zwift</label>
                    <input
                      type="text"
                      value={zwiftUsername}
                      onChange={(e) => setZwiftUsername(e.target.value)}
                      placeholder="your-zwift-username"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
                    <input
                      type="password"
                      value={zwiftPassword}
                      onChange={(e) => setZwiftPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={onConnectZwift}
                  className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition"
                >
                  ✓ เชื่อต่อ Zwift
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">ในแอปจริง จะเชื่อต่อผ่าน Zwift OAuth API</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 flex items-center gap-3 mb-6">
                <span className="text-3xl">✅</span>
                <div>
                  <p className="font-bold text-gray-900">เชื่อต่อสำเร็จ!</p>
                  <p className="text-sm text-gray-600">ดึงข้อมูล Zwift ได้แล้ว</p>
                </div>
              </div>

              {zwiftData && (
                <div className="space-y-4">
                  {/* Profile Card */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-5xl">{zwiftData.profile.avatar}</span>
                      <div>
                        <p className="text-xl font-bold text-gray-900">{zwiftData.profile.username}</p>
                        <p className="text-sm text-gray-600">{zwiftData.profile.firstName} {zwiftData.profile.lastName}</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-600">🏃 ระยะทาง</p>
                        <p className="font-bold text-gray-900">{zwiftData.totalStats.totalDistance} km</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-600">⏱️ เวลา</p>
                        <p className="font-bold text-gray-900">{zwiftData.totalStats.totalTime} นาที</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-600">🔥 แคลอรี่</p>
                        <p className="font-bold text-orange-600">{zwiftData.totalStats.totalCalories} kcal</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-600">⭐ Level</p>
                        <p className="font-bold text-gray-900">{zwiftData.totalStats.level}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Rides */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">📊 กิจกรรมล่าสุด</h3>
                    <div className="space-y-3">
                      {zwiftData.recentRides.map((ride, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4 border-l-4 border-orange-500">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-bold text-gray-900">{ride.name}</p>
                              <p className="text-xs text-gray-600">{ride.date}</p>
                            </div>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold">Zwift</span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">⏱️ เวลา</p>
                              <p className="font-bold text-gray-900">{ride.minutes}′</p>
                            </div>
                            <div>
                              <p className="text-gray-600">📏 ระยะ</p>
                              <p className="font-bold text-gray-900">{ride.distance} km</p>
                            </div>
                            <div>
                              <p className="text-gray-600">⬆️ ขึ้น</p>
                              <p className="font-bold text-gray-900">{ride.elevation} m</p>
                            </div>
                            <div>
                              <p className="text-gray-600">🔥 แคลอรี่</p>
                              <p className="font-bold text-orange-600">{ride.calories}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-3 pt-3 border-t border-gray-200">
                            <div>
                              <p className="text-gray-600">⚡ Avg Power</p>
                              <p className="font-bold text-gray-900">{ride.avgPower}W</p>
                            </div>
                            <div>
                              <p className="text-gray-600">💪 Max Power</p>
                              <p className="font-bold text-gray-900">{ride.maxPower}W</p>
                            </div>
                            <div>
                              <p className="text-gray-600">❤️ HR</p>
                              <p className="font-bold text-red-600">{ride.avgHeartRate}/{ride.maxHeartRate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">🏃 ความเร็ว</p>
                              <p className="font-bold text-gray-900">{ride.avgSpeed} km/h</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setShowZwiftModal(false)}
            className="w-full mt-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
          >
            ปิด
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">สวัสดี, {user.name}! 👋</h1>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium flex items-center gap-2"
            >
              <LogOut size={18} /> ออกจากระบบ
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4 pt-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">เลือกแผนการลดน้ำหนัก</h2>
            <p className="text-gray-600">จาก {user.currentWeight} kg → {user.targetWeight} kg</p>
          </div>

          <div className="space-y-4">
            {Object.entries(coursePlans).map(([key, plan]) => (
              <div
                key={key}
                onClick={() => {
                  setCourse(plan);
                  setUser({ ...user, course: plan });
                  setUsers(users.map(u => u.id === user.id ? { ...user, course: plan } : u));
                }}
                className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ ลดต่อสัปดาห์: <span className="font-bold text-emerald-600">{plan.targetWeekly} kg</span></li>
                      <li>✓ แคลอรี่วันนี้: <span className="font-bold text-orange-600">{plan.dailyCalories}</span> kcal</li>
                      <li>✓ ออกกำลังกาย: <span className="font-bold text-blue-600">{plan.workoutDays}</span> วันต่อสัปดาห์</li>
                    </ul>
                  </div>
                  <div className="text-5xl font-bold text-emerald-600">{key}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="text-emerald-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
                <p className="text-emerald-600 text-sm">{user.name} • {user.currentWeight} kg</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowZwiftModal(true)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${
                  zwiftConnected
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                <Link2 size={18} /> Zwift {zwiftConnected ? '✓' : ''}
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'home', label: '🏠 หน้าหลัก', icon: 'home' },
              { id: 'food', label: '🍽️ อาหาร', icon: 'food' },
              { id: 'workout', label: '💪 ออกกำลังกาย', icon: 'workout' },
              { id: 'progress', label: '📊 ความก้าวหน้า', icon: 'progress' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-emerald-500">
                <p className="text-gray-600 text-sm mb-2">น้ำหนักปัจจุบัน</p>
                <p className="text-5xl font-bold text-emerald-600">{user.currentWeight}</p>
                <p className="text-gray-500 text-sm">kg</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500">
                <p className="text-gray-600 text-sm mb-2">ลดแล้ว</p>
                <p className="text-5xl font-bold text-blue-600">-{97 - user.currentWeight}</p>
                <p className="text-gray-500 text-sm">kg</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-orange-500">
                <p className="text-gray-600 text-sm mb-2">เหลือไป</p>
                <p className="text-5xl font-bold text-orange-600">{user.currentWeight - user.targetWeight}</p>
                <p className="text-gray-500 text-sm">kg ถึงเป้าหมาย</p>
              </div>
            </div>

            {zwiftConnected && zwiftData && zwiftData.recentRides && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-300 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="text-orange-600" size={28} />
                  🚴 ข้อมูล Zwift (ล่าสุด)
                </h3>
                {zwiftData.recentRides.length > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 border-l-4 border-orange-500">
                      <p className="text-sm font-bold text-gray-700 mb-3">{zwiftData.recentRides[0].name}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-600 text-sm mb-1">⏱️ เวลา</p>
                          <p className="text-3xl font-bold text-blue-600">{zwiftData.recentRides[0].minutes}</p>
                          <p className="text-xs text-gray-500">นาที</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">🔥 แคลอรี่</p>
                          <p className="text-3xl font-bold text-orange-600">{zwiftData.recentRides[0].calories}</p>
                          <p className="text-xs text-gray-500">kcal</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">📏 ระยะ</p>
                          <p className="text-3xl font-bold text-emerald-600">{zwiftData.recentRides[0].distance}</p>
                          <p className="text-xs text-gray-500">km</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">❤️ HR</p>
                          <p className="text-3xl font-bold text-red-600">{zwiftData.recentRides[0].avgHeartRate}</p>
                          <p className="text-xs text-gray-500">bpm</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-gray-600 text-sm mb-1">⚡ Avg Power</p>
                          <p className="text-2xl font-bold text-yellow-600">{zwiftData.recentRides[0].avgPower}W</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">⬆️ ความสูง</p>
                          <p className="text-2xl font-bold text-gray-900">{zwiftData.recentRides[0].elevation}m</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">ยังไม่มีข้อมูลการออกกำลังกาย</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* FOOD TAB */}
        {activeTab === 'food' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🍽️ แผนอาหารแนะนำ</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {course.meals.map((meal, i) => (
                <div key={i} className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200 text-center">
                  <p className="font-bold text-gray-900 mb-2">{meal}</p>
                  <p className="text-sm text-gray-600">~350 kcal</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKOUT TAB */}
        {activeTab === 'workout' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🏋️ ตารางออกกำลังกาย</h2>
            <div className="space-y-3">
              {course.workouts.map((workout, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <div>
                    <p className="font-bold text-gray-900">{workout.day}</p>
                    <p className="text-sm text-gray-600">{workout.name}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                    {workout.calories} kcal
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 ความก้าวหน้า</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-2">ลดน้ำหนักแล้ว: <span className="font-bold text-emerald-600">{97 - user.currentWeight} / 42 kg</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-emerald-500 h-4 rounded-full transition-all"
                      style={{ width: `${Math.min(((97 - user.currentWeight) / 42) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
