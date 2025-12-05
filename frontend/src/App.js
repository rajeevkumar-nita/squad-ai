// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import './App.css';
import ChatInterface from './components/ChatInterface'; // Agar error aaye to path './components/ChatInterface' check karna

// NOTE: Kyunki hum modular structure use kar rahe hain, 
// agar upar wala import fail ho, to niche wala try karna:
// import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <ChatInterface />
    </div>
  );
}

export default App;
