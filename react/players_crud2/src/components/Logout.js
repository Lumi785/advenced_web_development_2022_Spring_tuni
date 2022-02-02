export const Logout = ({ handleLogout }) => {
  return (
    <button onClick={e => {
      e.preventDefault();
      handleLogout();
    }} id="logout-btn">Log Out</button>
    
  );
};
