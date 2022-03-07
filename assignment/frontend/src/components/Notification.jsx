/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../redux/actionCreators/notificationsActions';




const selectNotification = state => state.notification;

const Notification = () => {
    const dispatch = useDispatch();

    const notification = useSelector(selectNotification);

    console.log("notification = ", notification);
    
    useEffect(() => {

        setTimeout(() => {
            dispatch(removeNotification());
        }, 20000);
    
    }, [notification])

    





    return(
        
        <>
        {
            notification === undefined && 
            <div data-testid='no-notification-component'></div>
        }

        {notification !== undefined && 
        
            <div 
            data-testid='notification-component'
            style={ notification.isSuccess? {
                height: '50px',
                width: '100%',
                background: 'green'
                
            }: {
                height: '50px',
                width: '100%',
                background: 'red'
                
            }}
            >
            {notification.message}
                
            </div>
        }
                
        </>
        
    )
};

export default Notification;
