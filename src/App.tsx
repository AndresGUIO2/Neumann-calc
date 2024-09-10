import Calculator from "./components/calculator";
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Calculadora Von Neumann</h1>
      <Calculator />
    </div>
  );
};

export default App;
