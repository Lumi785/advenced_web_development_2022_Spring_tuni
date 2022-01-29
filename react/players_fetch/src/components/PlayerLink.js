export const PlayerLink = ({ name, onClick, url }) => {


  return(
    

    <li onClick={onClick}>
      <a href={url}>{name}</a>
    </li>
    
  )
};
