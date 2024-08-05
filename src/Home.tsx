import { useEffect, useState } from "react";
import { userAtom } from "./store";
import { useAtom } from "jotai";
import { useUserRole } from "./context/UserRoleContext";

function Home() {
  const [title,setTitle] = useState('');
  const [user] = useAtom(userAtom);
  const { role } = useUserRole();

  useEffect(()=>{
    setTimeout(()=>{      
      setTitle("Dashboard")
    },3000)
  },[])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <h2 className="text-2xl font-bold text-center">{user.name}</h2>
        <p data-testid="user-role">{role}</p>

      </div>
    </div>
  );
}

export default Home;
