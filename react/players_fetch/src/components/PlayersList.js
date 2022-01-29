import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, selectPlayer }) => {
  console.log("ppppp = ", players);
  
  
  return(
    
    <ol>
     
      {players.map(player => <PlayerLink key={player.id} id={"player-"+player.id} name={player.name}  url={player.id} onClick={() => {selectPlayer(player.id)} }/>)}
      
     
    </ol>
  )
};


 {/* {players.map(player => <li key={player.id}> {player.name} </li>)} */}
