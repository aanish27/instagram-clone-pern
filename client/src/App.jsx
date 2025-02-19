import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="flex items-center justify-between">
      <Sidebar />
      <main>Posts & Stories</main>
      <div>Right Sidebar</div>
    </div>
  );
}

export default App

