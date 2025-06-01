import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()

  console.log("Online Users:", onlineUsers);
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  useEffect(() => {
    // Đồng bộ data-theme trên <html>
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isCheckingAuth && !authUser) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App;