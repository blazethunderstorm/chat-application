import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, Settings, LogOut, ChevronRight } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 pt-16 pb-12">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header section with gradient background */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 h-32"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
          
          {/* Profile photo overlay */}
          <div className="absolute -bottom-16 left-8 sm:left-12">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-2 right-2
                  bg-indigo-600 hover:bg-indigo-700 
                  p-2 rounded-full cursor-pointer shadow-md
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
          </div>
          
          {/* Name overlay */}
          <div className="absolute bottom-6 left-48 sm:left-52 text-white">
            <h1 className="text-2xl font-bold">{authUser?.fullName}</h1>
            <p className="text-white/80">{authUser?.email}</p>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-20 grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Left column - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-indigo-600" />
                Personal Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <div className="mt-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    {authUser?.fullName}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <div className="mt-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    {authUser?.email}
                  </div>
                </div>

                {isUpdatingProfile && (
                  <div className="text-center text-sm text-indigo-600 animate-pulse">
                    Updating your profile...
                  </div>
                )}
                
                <div className="pt-2">
                  <button className="btn btn-primary w-full">
                    Update Information
                  </button>
                </div>
              </div>
            </div>
            
            {/* Activity & Stats Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                Activity & Statistics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-indigo-600">24</div>
                  <div className="text-xs text-gray-500 mt-1">Messages</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600">12</div>
                  <div className="text-xs text-gray-500 mt-1">Connections</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">3</div>
                  <div className="text-xs text-gray-500 mt-1">Groups</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-medium">Today, 10:30 AM</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{authUser.createdAt?.split("T")[0] || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Account & Quick Actions */}
          <div className="space-y-6">
            {/* Account Status Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                Account Status
              </h2>
              
              <div className="p-4 bg-green-50 rounded-xl flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-green-800">Active</div>
                  <div className="text-xs text-green-600">Account in good standing</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 text-sm">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between py-2 text-sm">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-medium">2GB / 5GB</span>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="btn btn-outline btn-primary w-full">
                  Upgrade Plan
                </button>
              </div>
            </div>
            
            {/* Quick Links Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
              
              <ul className="space-y-2">
                <li>
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <Settings className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Account Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-gray-400 mr-3" />
                      <span>Privacy & Security</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center text-red-600">
                      <LogOut className="w-5 h-5 mr-3" />
                      <span>Sign Out</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;