export const PlayerLink = ({ name, onClick, url, id }) => {


  return(
    
    <li role="listitem" id={id}>
    <a href={url} role="link" onClick={
      (e) => {
        onClick(url);
        console.log("onlick url ====== ", url);
        e.preventDefault();
      }}
      >{name}</a>
    </li>

  )
};


  

  // this also works, but i understand the course instruction wants the onClick in a element not li element
  // <li role="listitem" id={id} onClick={
  //   (e) => {
  //     onClick(url);
  //     console.log("onlick in p");
  //     e.preventDefault();
  //   }
  //   }>
  //   <a role="link" href={url}>{name}</a>
  // </li>
