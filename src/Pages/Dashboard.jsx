import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { scrapauth } from './firebase';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { 
  LayoutGrid, 
  BarChart3, 
  Filter, 
  Mail, 
  Package, 
  ClipboardList,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  MoreHorizontal,
  RefreshCcw
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(scrapauth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(scrapauth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const graphData = {
    labels: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
    datasets: [
      {
        label: "Earnings",
        data: [30, 40, 35, 50, 45, 60, 55],
        borderColor: "#000000",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        tension: 0.4
      },
      {
        label: "Costs",
        data: [20, 25, 30, 35, 30, 40, 45],
        borderColor: "#BDBDBD",
        backgroundColor: "rgba(189, 189, 189, 0.2)",
        tension: 0.4
      },
    ],
  };

  // Get user's name (if available) or fallback to email's username part
  const userName = user ? (user.displayName || user.email.split('@')[0]) : "Guest";

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1C1C] text-white flex-shrink-0">
        <div className="h-full flex flex-col">
          <div className="p-4">
            <div className="mb-8">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">@</span>ScrapLink
              </h1>
            </div>

            <nav className="space-y-2">
              <div className="mb-4">
                <div className="flex items-center gap-2 p-2 rounded bg-gray-800">
                  <LayoutGrid size={20} />
                  <span>Dashboard</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                    <BarChart3 size={20} />
                    <span>Summary</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                    <Filter size={20} />
                    <span>Custom dashboard </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                <Mail size={20} />
                <span>Messages</span>
                <span className="ml-auto bg-gray-700 px-2 rounded-full text-sm">2</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                <Package size={20} />
                <span>Products</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                <ClipboardList size={20} />
                <span>Orders</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                <Users size={20} />
                <span>Dealers</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
                <Settings size={20} />
                <span>Settings</span>
              </div>
            </nav>
          </div>

          <div className="mt-auto p-4 space-y-2">
            <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
            <div 
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Log out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full">
        <div className="p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
              <p className="text-gray-500">Here are today's stats from your deals </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div className="relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  4
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                />
                <span>Denit Binny</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-black text-white p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Package size={24} />
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Sales</span>
                  <span className="text-sm text-green-400">+0%</span>
                </div>
                <div className="text-2xl font-bold">Rs:0</div>
                <div className="text-sm text-gray-400">0 Orders</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users size={24} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Visitors</span>
                  <span className="text-sm text-green-600">+12.7%</span>
                </div>
                <div className="text-2xl font-bold">13</div>
                <div className="text-sm text-gray-500">Avg. time: 4:30m</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <RefreshCcw size={24} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Refunds</span>
                  <span className="text-sm text-red-600">0%</span>
                </div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-500">0 Disputed</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Sales Performance Chart */}
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Sales Performance</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border rounded-md">Export data</button>
                  <button className="px-3 py-1 text-sm border rounded-md flex items-center gap-1">
                    Last 14 Days <ChevronDown size={16} />
                  </button>
                </div>
              </div>
              <div className="h-[300px]">
                <Line 
                  data={graphData} 
                  options={{ 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.1)',
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Top Categories</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Reuseable</span>
                  </div>
                  <span>14</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Electronics</span>
                  </div>
                  <span>12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Furniture </span>
                  </div>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;