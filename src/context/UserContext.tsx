import { createContext, useContext, useState } from "react";

interface User {
  username: string;   // firebase key
  name: string;
  email: string;
  membership: string;
  phone: string;
}


interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const storedUser = localStorage.getItem("fithubUser");
  const [user, setUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const updateUser = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem("fithubUser", JSON.stringify(u));
    else localStorage.removeItem("fithubUser");
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
