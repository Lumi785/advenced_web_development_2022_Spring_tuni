export const PlayerLink = ({ name, onClick, url, id }) => {


  return(
    

    <li id={id} onClick={
      (e) => {
        onClick();
        e.preventDefault();
      }
      }>
      <a href={url}>{name}</a>
    </li>
    
  )
};
