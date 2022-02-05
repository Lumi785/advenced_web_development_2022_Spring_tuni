export const Logout = ({ handleLogout }) => {
  return (
    <button onClick={e => {
      e.preventDefault();
      handleLogout();
    }} id="logout-btn" name="/logout/i" role="button">Logout</button>
    
  );
};
