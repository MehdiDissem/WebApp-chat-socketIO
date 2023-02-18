import logo from './logo.svg';
import './App.css';
import { Context } from "./Context";
import Chat from "./components/Chat"

function App() {
  return (
    <Context.Provider>
      <Chat/>
    </Context.Provider>
  );
}

export default App;
