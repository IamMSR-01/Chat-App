import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/authStore.js";
import { formatMessageTime } from "../utils/dateFormate.js";

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
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.avatar ||
                        `https://ui-avatars.com/api/?name=${authUser.fullName
                          .trim()
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0].toUpperCase())
                          .join(" ")}`
                      : selectedUser.avatar ||
                        `https://ui-avatars.com/api/?name=${authUser.fullName
                          .trim()
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0].toUpperCase())
                          .join(" ")}`
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
                {formatMessageTime(message.createdAt)}
            </div>
            <div className="chat-bubble flex flex-col gap-1">
                {message.image && (
                  <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                )}
                {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
