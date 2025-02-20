import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <div className="flex items-center justify-between">
      <Sidebar />
      <Main />
      <div>Right Sidebar</div>
    </div>
  );
}

export default App;
