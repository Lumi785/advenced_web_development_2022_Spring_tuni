export const RequestStatus = ({ status }) => {

  // function setStatus(status){
  //   if (status === "" | typeof(status) !== String){
  //     status = "";
  //   } 
  //   return status;
  // }
  return(
    <div className="request-status">{status}</div>
  );
};
