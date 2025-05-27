import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

export default function Sidebar() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);
  
    // const filteredUsers = showOnlineOnly
    //   ? users.filter((user) => onlineUsers.includes(user._id))
    //   : users;
  
    if (isUsersLoading) return <SidebarSkeleton />;
    
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>

            </div>

            <div className="overflow-y-auto w-full py-3">
                
            </div>
        </aside>
    )
};