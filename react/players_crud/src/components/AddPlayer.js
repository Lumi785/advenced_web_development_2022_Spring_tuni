export const AddPlayer = ({ handleSubmit }) => {

  let a = "rose";

  return (
  <form onSubmit={
    (e)=>{
      e.preventDefault(); 
      handleSubmit(a);
    }}>

    <input type="text" name="name" id="name" />
    <input type="checkbox" name="active" id="active" />
    <button type="submit">Add</button>
  
  </form>

  )

    
  
};
