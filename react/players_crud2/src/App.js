import './App.css';
// import axios from 'axios';
import { AddPlayer } from './components/AddPlayer';
import { AuthForm } from './components/AuthForm';
import { Logout } from './components/Logout';
import { PlayerInfo } from './components/PlayerInfo';
import { PlayersList } from './components/PlayersList';
import { RequestStatus } from './components/RequestStatus';
import { useEffect, useState } from 'react';

//const aa = JSON.parse(sessionStorage.getItem('ldkjfdljf'));
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
  const [loggedinState, setLoggedinState] = useState(false);
  //don't work by set credential in useState!!!
  //const [encodedCredential, setEncodedCredential] = useState('');

  //Teacher use useState() to set credentioa!!!!



  const [users, setUsers] = useState([]);

  /**
   * 
   * @param {*} username 
   * @param {*} password 
   * @returns an encoded Base 64 credential
   */
  function createCredential(username, password){
    return "Basic " + window.btoa(`${username}:${password}`);
  }

  //get all players
  function getPlayers(){
    setStatus(requestStatus.LOADING);
    const credential = sessionStorage.getItem("encodedData");
    const headers = {
      'Accept': 'application/json',
      'method': 'GET',
      'Authorization': `${credential}`
    };
    fetch("api/players", {headers})
      .then(res=>{
        if (res.err){
          console.log("response error = ", res.err);
        }
        return res.json()})
      .then(data=>{
        setPlayers(data);
        setStatus(requestStatus.READY);

      }).catch(error => {
        
        setStatus(requestStatus.ERROR);
        console.log("erros status is = ", error);
      })
  }



  // get one player by id
  function selectPlayer(id){
    setStatus(requestStatus.LOADING);
    const credential = sessionStorage.getItem("encodedData");
    const headers = {
      'Accept': 'application/json',
      'method': 'GET',
      'Authorization': `${credential}`
    };
   
    const url = "/api/players/" + id;
    console.log("rul = ", url);

    fetch(url, {headers})
      .then(res=>{
        if (res.err){console.log("response err = ", res.err)};
        return res.json()
      })
      .then(data=>{
        
        setPlayer(data);
        setShowPlayerInfo(true);
        
        setStatus(requestStatus.READY);
      }).catch(error => {
        setStatus(requestStatus.ERROR);
        console.log("erros is = ", error);
      })
  }


  //register user
  function handleAuthSubmit(isLogin, e){
    setStatus(requestStatus.LOADING);

    if(!isLogin){ //resigster mode, handle registration
      const url = '/api/users'
      const username = e.target.elements.username.value;
      const password = e.target.elements.password.value;
      const user = {username, password};

      // const encodedData = "Basic " + window.btoa(`username:password`);
      const encodedData = createCredential(username, password);
      
      const reqOptions = {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${encodedData}`
        },
        body: JSON.stringify(user)
      }

      fetch(url, reqOptions)
      .then(res => {
        if(res.err){console.log("res error = ", res.err)};
        return res.json();
      })
      .then(data => {
        setUsers([...users, data]);
        setStatus(requestStatus.READY);
        setLoggedinState(true);
        
        // setEncodedCredential(encodedData);
        sessionStorage.setItem("encodedData", encodedData);
       
        //now it is registered, upon registration it is automatically logged in, and automatically display plyers. 
        getPlayers();

      })
      .catch(err => {
        setStatus(requestStatus.ERROR);
        console.log("err === ", err);
      });
      
    } 
    else { //login mode, handle logging in, note:immeadiately after logged in, display players
     
      const username = e.target.elements.username.value;
      const password = e.target.elements.password.value;
      const encodedData = createCredential(username, password);
      const url = "api/players";

      const reqOptions = {
        method: "GET",
        headers: {
        'Accept': 'application/json',
        'Authorization': `${encodedData}`
        }
      }
      
      fetch(url, reqOptions)
      .then(res => {
        if(res.err){console.log("res error = ", res.err)};
        //must use return here, because now arrow function got wrapped with {}
        return res.json();
      })
      .then(data => {
        console.log('data====', data);
        setPlayers(data);
        setStatus(requestStatus.READY);
        // setEncodedCredential(encodedData);
        sessionStorage.setItem("encodedData", encodedData);
        setLoggedinState(true);
      })
      .catch(err => {
        setStatus(requestStatus.ERROR);
        console.log("err === ", err);
      });
    }

  } 



  //add player
  function handleAddPlayerSubmit(e){
    setStatus(requestStatus.LOADING);
    const namea = e.target.name.value;
    const isActivea = false;
    const player = {name:namea, isActive:isActivea};
    console.log("player = ", player);
    const encodedData = sessionStorage.getItem("encodedData");
    const url = 'api/players';
    
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        'Authorization': `${encodedData}`
      },
      body: JSON.stringify(player)

    }
    fetch(url, reqOptions)
    .then(res => res.json())
    .then(data => {
      setPlayers([...players, data]);
      setStatus(requestStatus.READY);
     
    })
    .catch(err => {
      setStatus(requestStatus.ERROR);
      console.log("err === ", err);
    });
  }

  //delete player by id
  function handleDelete(id){
    setStatus(requestStatus.LOADING);
    const credential = sessionStorage.getItem("encodedData");
   
    const reqOptions = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Authorization': `${credential}`
      }
    };

    const url = "/api/players/" + id;
    console.log("url = ", url);
    
    fetch(url, reqOptions)

      .then(response => {
        if (response.err){
          console.log("response erro = ", response.err);
        }
        return response.json()})
      .then(data => {
         
        const playersAfterDelete = players.filter(player => player.id !== data.id);
        setPlayers(playersAfterDelete);
        setShowPlayerInfo(false);
        setStatus(requestStatus.READY);
      })
      .catch(error => {
        setStatus(requestStatus.ERROR);
        console.log("error occured: ", error);
      });
  }

  function handleLogout(){
    console.log("log out");
    setLoggedinState(false);

    // setEncodedCredential('');
    sessionStorage.clear();
    
  }


  return (
    <div>
      {(!loggedinState && <AuthForm handleSubmit={handleAuthSubmit}  />)}
      {(loggedinState && 
      <>
        <Logout handleLogout={handleLogout}/>
      
        <AddPlayer handleSubmit={handleAddPlayerSubmit} />
        <h3>Players List</h3>
        <PlayersList players={players} selectPlayer={selectPlayer}/>
        <h3>Selected Player</h3>
      </>)}
      {showPlayerInfo &&
          <PlayerInfo  player={player} handleDelete = {handleDelete}/>
      }
      <RequestStatus status={status}/>
    </div>
  );
}

export default App;
