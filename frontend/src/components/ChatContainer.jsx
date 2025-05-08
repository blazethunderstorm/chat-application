import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium">No messages yet</p>
              <p className="text-sm mt-1">Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isUserMessage = message.senderId === authUser._id;
            const showAvatar = true; // You can add logic here to only show avatar for first message in a sequence
            
            return (
              <div
                key={message._id}
                className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                <div className={`flex max-w-[80%] ${isUserMessage ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
                  {/* Avatar */}
                  {showAvatar && (
                    <div className="flex-shrink-0">
                      <div className="size-8 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
                        <img
                          src={
                            isUserMessage
                              ? authUser.profilePic || "/avatar.png"
                              : selectedUser.profilePic || "/avatar.png"
                          }
                          alt="profile pic"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Message content */}
                  <div className="flex flex-col gap-1">
                    <div 
                      className={`px-4 py-3 rounded-2xl ${
                        isUserMessage 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="max-w-full rounded-lg mb-2"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                    
                    {/* Timestamp */}
                    <span 
                      className={`text-xs text-gray-500 dark:text-gray-400 ${
                        isUserMessage ? "text-right mr-1" : "text-left ml-1"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;