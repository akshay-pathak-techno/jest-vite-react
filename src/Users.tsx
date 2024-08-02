import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
 
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json() as Promise<{
    id: number,
    name: string,
    email: string,
    phone: string
  }[]>;
};

const Users: React.FC = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    retry: false
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 text-left text-gray-600">Name</th>
            <th className="py-2 px-4 text-left text-gray-600">Email</th>
            <th className="py-2 px-4 text-left text-gray-600">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
