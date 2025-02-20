import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import RightSidebar from "./components/RightSidebar";

function App() {
  return (
    <div className="flex items-center justify-between">
      <Sidebar />
      <Main />
      <RightSidebar />
    </div>
  );
}

export default App;
