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
    // subscribeToMessages,
    // unsubscribeFromMessages,
  } = useChatStore();
  // const { authUser } = useAuthStore();
  // const messageEndRef = useRef(null);

  
  useEffect(() => {
    getMessages(selectedUser._id);
    
    // subscribeToMessages();
    
    // return () => unsubscribeFromMessages();
  }, [ selectedUser._id, getMessages ]);
  
  // useEffect(() => {
  //   if (messageEndRef.current && messages) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
        Looding...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>Messages...</p>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;