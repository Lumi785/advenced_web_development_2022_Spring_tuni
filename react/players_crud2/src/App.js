import './App.css';
import { AddPlayer } from './components/AddPlayer';
import { AuthForm } from './components/AuthForm';
import { Logout } from './components/Logout';
import { PlayerInfo } from './components/PlayerInfo';
import { PlayersList } from './components/PlayersList';
import { RequestStatus } from './components/RequestStatus';
import {useEffect, useState} from 'react';

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
  const [logginState, setLogginState] = useState(false);
  const [encodedCredential, setEncodedCredential] = useState('');
  const [users, setUsers] = useState([]);


  
  

  // function checkLoginStatus(){
  //   axios.get("http://localhost:3001/logged_in", {withCredentials: true})
  //   .then(response => { console.log("logged in? ", response)})
  //   .catch(err => console.log("check login err = ", err))
  
  // }

  // function componentDidMount(){
  //   checkLoginStatus();
  // }
  // componentDidMount();

function createCredential(username, password){
  return "Basic " + window.btoa(`${username}:${password}`);
}


  const headers = {
    'Accept': 'application/json',
    'method': 'GET'
    
  };
 
  //get all players
  useEffect(() => {
    function getPlayers(){
      setStatus(requestStatus.LOADING);
      fetch("api/players", {headers})
        .then(res=>{
          if (res.status !==200){
            console.log(res.err);
          }
          res.json()})
        .then(data=>{
          setPlayers(data);
          setStatus(requestStatus.READY);
  
        }).catch(error => {
         
          setStatus(requestStatus.ERROR);
          console.log("erros status is = ", error);
        })
    }
    // if (isLogin){

    //   getPlayers();
    // }

  }, []);


  // get one player by id
  function selectPlayer(id){
    setStatus(requestStatus.LOADING);
    const headers = {
      'Accept': 'application/json',
      'method': 'GET',
      'Authorization': `${encodedCredential}`
    };
    
    const url = "/api/players/" + id;
    console.log("rul = ", url);

    fetch(url, {headers})
      .then(res=>{
        if (res.err){console.log("response err = ", res.err)};
        res.json()
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
  function handleSubmit(isLogin, e){
    // console.log("e.crrentTarget = ", e.currentTarget.getElementById("auth-form"));

    setStatus(requestStatus.LOADING);

    if(!isLogin){ //resigster
      const url = '/api/users/register'
      const username = e.target.username.value;
      const password = e.target.password.value;
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
        res.json();
      })
      .then(data => {
        setUsers([...users, data]);
        setStatus(requestStatus.READY);
        setLogginState(true);
        console.log("dataaaaa = ", data);
        setEncodedCredential(encodedData);
        console.log("enndode crecdential = ", encodedData);
        // sessionStorage.setItem("encodedData", encodedData);
      })
      .catch(err => {
        setStatus(requestStatus.ERROR);
        console.log("err === ", err);
      });
        
    } 
    else { //login, immeadiately after logged in, display players
      console.log("apple");
      const username = e.target.username.value;
      const password = e.target.password.value;
      // const user = {username, password};

      // const encodedData = "Basic " + window.btoa(`username:password`);
      const encodedData = createCredential(username, password);
    
      const url = "api/players";
      const reqOptions = {
        method: "GET",
        headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${encodedData}`
        }
      }
      
      fetch(url, reqOptions)
      .then(res => {
        if(res.err){console.log("res error = ", res.err)};
        return res.json();
      })
      .then(data => {
        console.log('data====', data);
        setPlayers(data);
        setStatus(requestStatus.READY);
        setEncodedCredential(encodedData);
        setLogginState(true);


        console.log("dataaaaa players= ", players);
      
      })
      .catch(err => {
        setStatus(requestStatus.ERROR);
        console.log("err === ", err);
      });
    }
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

      .then(response => {
        if (!response){
          console.log("response erro = ", response.ERROR);
        }
        response.json()})
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
    setLogginState(false);

    setEncodedCredential('');
    
  }


  return (
    <div>
      {(!logginState && <AuthForm handleSubmit={handleSubmit}  />)}
      {(logginState && 
      <>
        <Logout handleLogout={handleLogout}/>
      
        <AddPlayer handleSubmit={handleSubmit} />
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
