export const PlayerInfo = ({ player, handleDelete }) => {
  
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
 

  return(
    <div id="selected-player" onClick={(e)=>{
      handleDelete(player.id);
      e.preventDefault();}}>
      <div className="player-id">{player.id}</div>
      <div className="player-name">{player.name}</div>
      <div className="player-status">{aa}</div>
      <button className="delete-btn">Delete</button>
    </div>
  )
};
