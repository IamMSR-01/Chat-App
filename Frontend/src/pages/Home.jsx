import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

function Home() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="flex justify-center items-center pt-20 px-4">
        <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] rounded-lg shadow-2xl border border-white/20 w-full max-w-7xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
