import { useEffect, useState } from "react";

function Home() {
  const [title,setTitle] = useState('');

  useEffect(()=>{
    setTimeout(()=>{      
      setTitle("Dashboard")
    },3000)
  },[])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
      </div>
    </div>
  );
}

export default Home;
