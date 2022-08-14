import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './components/Board';
import Navbar from './components/Navbar/Navbar';

function App() {

  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0)

  useEffect(() => {
    fetch('/auth').then((res) => res.json()).then((res) => setUser(res));
  }, []);


  return (
    <div className="App">
			<Navbar user={user} setUser={setUser} />
			<Routes>
        <Route path="/cats" element={<Board setScore={setScore}/>} />
				</Routes>
      <div className="score">
        Очки: {score}
      </div>
    </div>
  );
}

export default App;
