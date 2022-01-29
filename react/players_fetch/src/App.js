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

  console.log("hello");


  useEffect(() => {
    fetch("api/players")
      .then(res=>res.json())
      .then(data=>{
        setPlayers(data);
        
        console.log("data = ", data);
        // return data;
        
      }).catch(error => {
        console.log("erros is = ", error);
      })

  }, [])


  return(
    <>
    <div>hello rose</div>
   
    </>
    
  )


}

export default App;
