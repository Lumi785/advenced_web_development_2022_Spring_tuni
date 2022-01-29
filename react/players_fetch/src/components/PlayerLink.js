export const PlayerLink = ({ name, onClick, url }) => {


  return(
    

    <li onClick={
      (e) => {
        onClick();
        e.preventDefault();
      }
      }>
      <a href={url}>{name}</a>
    </li>
    
  )
};
