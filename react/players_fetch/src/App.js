import { useState, useEffect } from 'react';
import './App.css';
import { PlayerInfo } from './components/PlayerInfo';
import { PlayersList } from './components/PlayersList';
import { RequestStatus } from './components/RequestStatus';

const requestStatus = {
  LOADING: 'Loading...',
  READY: '',
  ERROR: 'An error has occurred!!!'
};



function App () {
  
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState('');
  const [player, setPlayer] = useState({name: '', isActive: false, id:''})
 
  const headers = {
    'Accept': 'application/json'
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
    const url = "/api/players/" + id;
    console.log("rul = ", url);

    fetch(url, {headers})
    
      .then(res=>res.json())
      .then(data=>{
        setPlayer(data);
      }).catch(error => {
        console.log("erros is = ", error);
      })
  }

 

  // delete one player by id
  function handleDelete(id){
    const playersAfterDelete = players.filter(player => player.id !== id);
    setPlayers(playersAfterDelete);
  }

  return(

    <div>
      <h3>Players List</h3>
      <PlayersList players={players} selectPlayer={selectPlayer}/>
      <h3>Selected Player</h3>
      <PlayerInfo player={player} handleDelete = {handleDelete}/>
      <RequestStatus status={status}/>
    </div>
    
  )


}

export default App;
