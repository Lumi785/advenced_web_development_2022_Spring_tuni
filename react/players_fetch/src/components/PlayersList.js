import { PlayerLink } from './PlayerLink';

export const PlayersList = ({ players, selectPlayer }) => {
  console.log("ppppp = ", players);
  
  
  return(
    
    <ol>
     
      {players.map(player => <PlayerLink key={player.id} name={player.name} />)}
      // <PlayerLink/>
    </ol>
  )
};


 {/* {players.map(player => <li key={player.id}> {player.name} </li>)} */}
