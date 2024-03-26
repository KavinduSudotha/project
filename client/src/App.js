import './App.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Login from './pages/login';
import Headbar from './components/login/headbar';
function App() {
  return (
    // <div className="bg-blue-100 p-4">
    //   <h1 className="text-2xl font-bold text-green-600">Hello Tailwind CSS!</h1>
    //   <p className="text-gray-800">Tailwind CSS is awesome!</p>
    // </div>
    <div>
      <Login/>
    </div>
  );
}

export default App;
