import ChatClient from "@/components/common/admin/chat/chat-client/index";
import { getUser } from "@/services/user.api";

const ManageChatPage = async () => {
  let users: any = [];

  try {
    const res = await getUser({ all: true });

    const backendData = res?.data;
    if (backendData) {
      users = backendData.result || [];
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
  return <ChatClient users={users} />;
};

export default ManageChatPage;
