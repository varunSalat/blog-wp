import { createContext } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // You can change this to "auto" for instant scrolling
    });
  };

  return (
    <UserContext.Provider value={{ scrollToTop }}>
      {children}
    </UserContext.Provider>
  );
};
