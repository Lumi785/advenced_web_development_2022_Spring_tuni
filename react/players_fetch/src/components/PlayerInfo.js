export const PlayerInfo = ({ player }) => {

  function handleDelete(){
    console.log("del");
  }

  return(
    <div id="selected-player" onClick={(e)=>{
      handleDelete(player.id);
      e.preventDefault();}}>
      <div className="player-id">{player.id}</div>
      <div className="player-name">{player.name}</div>
      <div className="player-status">{player.status}</div>
    </div>
  )
};
