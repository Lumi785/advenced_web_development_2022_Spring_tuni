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
 

  //get all players
  useEffect(() => {
   
    setStatus(requestStatus.LOADING);
    
    fetch("api/players")
      .then(res=>res.json())
      .then(data=>{
        setPlayers(data);
        setStatus(requestStatus.READY);
        console.log("status == ", status);

      }).catch(error => {
       
        setStatus(requestStatus.ERROR);
        console.log("erros status is = ", status);
      })

  }, []);


  //get one player by id
  // useEffect(() => {
  //   fetch("api/players/" + toString(id))
  //     .then(res=>res.json())
  //     .then(data=>{
  //       const player = data;
  //     }).catch(error => {
  //       console.log("erros is = ", error);
  //     })

  // }, {})


  function handleDelete(id){
    const playersAfterDelete = players.filter(player => player.id !== id);
    setPlayers(playersAfterDelete);
  }

  return(
    <>

    <div>
      <PlayersList players={players}/>
      {/* <PlayerInfo player={player} handleDelete = {handleDelete}/> */}
      <RequestStatus status={status}/>
    </div>
   
    </>
    
  )


}

export default App;
