export const PlayerLink = ({ name, onClick, url }) => {

 
  return(
    // <a href={url} onClick={()=>{onClick()}}>{name}</a>

    <li onClick={()=> {onClick()}} >
      <a href={url}>{name}</a>
    </li>
    
  )
};
