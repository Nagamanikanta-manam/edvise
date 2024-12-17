// ./screens/lobby.js
import React, { useCallback,useState,useEffect } from 'react';
import { useSocket } from '../Context/Socketproviders'; 
import { useNavigate } from 'react-router-dom';
const LobbyScreen = () => {
  const [email,setEmail]=useState("");
  const [room,setRoom]=useState("");
  const socket=useSocket();
  console.log(socket);
  const navigate=useNavigate();
  const handleSubmitForm=useCallback((e)=>{
    e.preventDefault();
    socket.emit('room:join',{email,room});
    
    
  },[email,room,socket])
  const handleJoinroom=useCallback((data)=>{
      const {email,room}=data;
      navigate(`/room/${room}`);
  },[]);
  useEffect(()=>{
        socket.on('room:join',handleJoinroom);
        return ()=>{
          socket.off('room:join',handleJoinroom);
        }
  },
  [socket,handleJoinroom])
  return <div>
    <form onSubmit={handleSubmitForm}>
        <label htmlFor='email'>email id</label>
        <input type="email" id="email" value={email} onChange={e=> setEmail(e.target.value)}>
        </input>
        <br></br>
        <label htmlFor='room'>room id</label>
        <input type="text" id="room" value={room} onChange={e=>setRoom(e.target.value)}></input>
        <button>join</button>
    </form>
  </div>;
};

export default LobbyScreen;
