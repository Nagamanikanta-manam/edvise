import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import LobbyScreen from './screens/lobby';
import RoomPage from './screens/Room';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path='/' element={<LobbyScreen></LobbyScreen>} />
          <Route path='/room/:roomId' element={<RoomPage></RoomPage>} />
        </Routes>
      </div>
    
  );
}

export default App;
