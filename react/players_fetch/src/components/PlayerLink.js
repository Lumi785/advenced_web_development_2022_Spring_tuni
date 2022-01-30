export const PlayerLink = ({ name, onClick, url, id }) => {


  return(
    

    <li role="listitem" id={id} onClick={
      (e) => {
        onClick();
        console.log("onlick in p");
        e.preventDefault();
      }
      }>
      <a href={url}>{name}</a>
    </li>
    
  )
};
