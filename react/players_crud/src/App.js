import './App.css';
import { AddPlayer } from './components/AddPlayer';
import { PlayerInfo } from './components/PlayerInfo';
import { PlayersList } from './components/PlayersList';
import { RequestStatus } from './components/RequestStatus';
import {useEffect, useState} from 'react';

const requestStatus = {
  LOADING: 'Loading...',
  READY: '',
  ERROR: 'An error has occurred!!!'
};

function App () {

  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState('');
  const [player, setPlayer] = useState({id:'', name: '', isActive: ''})
 
  const headers = {
    'Accept': 'application/json',
    'method': 'GET'
  };
  
  //get all players
  useEffect(() => {
   
    setStatus(requestStatus.LOADING);

   
    fetch("api/players", {headers})
      .then(res=>res.json())
      .then(data=>{
        setPlayers(data);
  
        setStatus(requestStatus.READY);
        console.log("status == ", status);

      }).catch(error => {
       
        setStatus(requestStatus.ERROR);
        console.log("erros status is = ", error);
      })

  }, []);


  // get one player by id
  function selectPlayer(id){
    setStatus(requestStatus.LOADING);
    
    const url = "/api/players/" + id;
    console.log("rul = ", url);

    fetch(url, {headers})
      
    
      .then(res=>res.json())
      .then(data=>{
        
        setPlayer(data);
        setStatus(requestStatus.READY);
      }).catch(error => {
        setStatus(requestStatus.ERROR);
        console.log("erros is = ", error);
      })
  }

  //add player
  function handleSubmit(player){
    setStatus(requestStatus.LOADING);
    console.log("player === ", player);
    
    const reqOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(player)

    }
    fetch("/api/players", reqOptions)
    .then(res => res.json())
    .then(data => {
      setPlayers([...players], data);
      setStatus(requestStatus.READY);
      console.log("dataaaaaa = ", data);
    })
    .catch(err => {
      setStatus(requestStatus.ERROR);
      console.log("err === ", err);
    });
  }




  // delete one player by id
  function handleDelete(id){
    const playersAfterDelete = players.filter(player => player.id !== id);
    setPlayers(playersAfterDelete);
  }

  return(

    <div>
      <AddPlayer handleSubmit={handleSubmit}/>
      <h3>Players List</h3>
      <PlayersList players={players} selectPlayer={selectPlayer}/>
      <h3>Selected Player</h3>
      <PlayerInfo player={player} handleDelete = {handleDelete}/>
      <RequestStatus status={status}/>
    </div>
    
  )

  
}

export default App;
