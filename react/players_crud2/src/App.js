import './App.css';
import { AddPlayer } from './components/AddPlayer';
import { AuthForm } from './components/AuthForm';
import { Logout } from './components/Logout';
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
  const [player, setPlayer] = useState({id:'', name: '', isActive: ''});
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
 
  const headers = {
    'Accept': 'application/json',
    'method': 'GET'
  };
  
  //get all players
  useEffect(() => {
    function getPlayers(){

      setStatus(requestStatus.LOADING);
      fetch("api/players", {headers})
        .then(res=>res.json())
        .then(data=>{
          setPlayers(data);
          setStatus(requestStatus.READY);
  
        }).catch(error => {
         
          setStatus(requestStatus.ERROR);
          console.log("erros status is = ", error);
        })
    }

    getPlayers();

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
        setShowPlayerInfo(true);
        
        setStatus(requestStatus.READY);
      }).catch(error => {
        setStatus(requestStatus.ERROR);
        console.log("erros is = ", error);
      })
  }

  //add player
  function handleSubmit(player){
    console.log("pppppppp = ", player);
    // setStatus(requestStatus.LOADING);
    // console.log("player from handleSubmit in App.js === ", player);
    
    // const reqOptions = {
    //   method: "POST",
    //   credentials: 'same-origin',
    //   headers: {
    //     "Content-Type": "application/json",
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(player)

    // }
    // fetch("/api/players", reqOptions)
    // .then(res => res.json())
    // .then(data => {
    //   setPlayers([...players, data]);
    //   setStatus(requestStatus.READY);
     
    // })
    // .catch(err => {
    //   setStatus(requestStatus.ERROR);
    //   console.log("err === ", err);
    // });
  }


  //delete player by id
  function handleDelete(id){
    setStatus(requestStatus.LOADING);
    console.log("idkkkkkkk = ", id);
    
    const reqOptions = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json'
      }
    
    };

    const url = "/api/players/" + id;
    console.log("url = ", url);
    
    fetch(url, reqOptions)

      .then(response => response.json())
      .then(data => {
         
        const playersAfterDelete = players.filter(player => player.id !== data.id);
        setPlayers(playersAfterDelete);
        setShowPlayerInfo(false);

        setStatus(requestStatus.READY);
        
        console.log("DELdata = ", data)
      })
      .catch(error => {
        setStatus(requestStatus.ERROR);
        console.log("error occured: ", error);
      });
  
  }

  function handleLogout(){
    console.log("log out");
  }


  return (
    <div>
      <AuthForm handleSubmit={handleSubmit}/>
      <Logout handleLogout={handleLogout}/>
      <AddPlayer handleSubmit={handleSubmit}/>
      <h3>Players List</h3>
      <PlayersList players={players} selectPlayer={selectPlayer}/>
      <h3>Selected Player</h3>
      {showPlayerInfo &&
          <PlayerInfo  player={player} handleDelete = {handleDelete}/>
      }
      <RequestStatus status={status}/>
    </div>
  );
}

export default App;
