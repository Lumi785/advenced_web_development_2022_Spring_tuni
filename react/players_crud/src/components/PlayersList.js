import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, selectPlayer }) => {
  console.log("ppppp = ", players);
  
  
  return(
    
    <ol id='players-list'>
    

      {players.map(player => <PlayerLink key={player.id} id={"player-"+player.id} name={player.name}  url={player.id} onClick={() => {
        selectPlayer(player.id);
        console.log("rose test click");}  }/>)}
      
     
    </ol>
  )
};


 
  
     //Put wrap function of selectPlayer by another function, is to prevent selectPlayer from being called automatically
