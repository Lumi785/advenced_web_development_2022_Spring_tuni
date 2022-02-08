
export const PlayerInfo = ({ player, handleDelete/*, showPlayerInfo*/}) => {
  

  function c (player){
    let a;
    if(player.isActive === false){
     a = 'not active';
    } else {
      a = 'active';
    }
    return a;
  }
  const aa = c(player);
 

  return(/*showPlayerInfo && 
    (*/<div id="selected-player" >
      <div className="player-id">{player.id}</div>
      <div className="player-name">{player.name}</div>
      <div className="player-status">{aa}</div>
      <button className="delete-btn" 
      onClick={(e)=>{
      handleDelete(player.id);
      e.preventDefault();
    }}
      >Delete</button>
    </div>/*)*/
  )
};
