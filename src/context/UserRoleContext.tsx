import  { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'user' | 'guest';

interface UserRoleContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

interface UserRoleProviderProps {
  children: ReactNode;
  initialRole?: UserRole;
}

const UserRoleProvider = ({ children, initialRole = 'guest' }: UserRoleProviderProps) => {
  const [role, setRole] = useState<UserRole>(initialRole);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export { UserRoleProvider, useUserRole };
