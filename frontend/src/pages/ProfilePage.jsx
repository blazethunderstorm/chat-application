import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-primary hover:scale-105
                  p-3 rounded-full cursor-pointer
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-content" />
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

            {isUpdatingProfile && (
              <p className="text-sm text-primary mt-4 animate-pulse">
                Updating profile picture...
              </p>
            )}
          </div>

          <div className="space-y-6">

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={authUser?.fullName || ""}
                disabled
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={authUser?.email || ""}
                disabled
              />
            </div>

            <div className="divider"></div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-base-content/70">Account Created</span>
                <span className="font-medium">{formatDate(authUser?.createdAt)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-base-content/70">Last Updated</span>
                <span className="font-medium">{formatDate(authUser?.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-base-content/60">
            Click the camera icon to update your profile picture
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;