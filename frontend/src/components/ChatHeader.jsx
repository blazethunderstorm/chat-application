import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online status indicator */}
          <div className="relative">
            <div className="size-12 rounded-full ring-2 ring-offset-2 ring-gray-100 dark:ring-gray-700 overflow-hidden">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="size-full object-cover"
              />
            </div>
            
            {/* Online status indicator */}
            {isOnline && (
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
            )}
          </div>
          
          {/* User info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {selectedUser.fullName}
            </h3>
            <p className={`text-sm ${
              isOnline 
                ? "text-green-600 dark:text-green-400" 
                : "text-gray-500 dark:text-gray-400"
            }`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Close button */}
          <button 
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close chat"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;