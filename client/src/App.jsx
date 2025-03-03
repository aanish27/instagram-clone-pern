import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import PostForm from "./pages/PostForm";
import Reels from "./pages/Reels";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post/new" element={<PostForm />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
