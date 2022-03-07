/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../redux/actionCreators/notificationsActions';




const selectNotification = state => state.Notification;

const Notification = () => {
    const dispatch = useDispatch();

    const notification = useSelector(selectNotification);
    console.log("notification = ", notification);
    useEffect(() => {

        setTimeout(() => {
            dispatch(removeNotification(notification));
        }, 20000);
    
    }, [notification])

    


    return(
        

        <div 
            data-testid='no-notification-component'
            style={{
                height: '50px',
                width: '100%',
                background: 'green'
                  
              }}
            >
        </div>



,
        
            
        <div 
        data-testid='notification-component'
        style={{
            height: '50px',
            width: '100%',
            background: 'green'
              
          }}
        >
            notification.message
        </div>
        


        
    )
};

export default Notification;
