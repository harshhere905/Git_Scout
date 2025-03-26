import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext(); // ✅ Default export recommended

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/check", { credentials: "include" });
        const data = await res.json();
        console.log("Fetched user data:", data);
        setAuthUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext }; // ✅ Named exports
export default AuthContext; // ✅ Default export added
