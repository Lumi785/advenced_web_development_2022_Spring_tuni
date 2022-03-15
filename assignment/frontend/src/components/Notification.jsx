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
        console.log("use effect notification = ", notification);

            console.log("apple");
            setTimeout(() => {
                console.log("ppppppp");

                dispatch(removeNotification());
            }, 5000);

           
        

    }, [notification]);
    
        

    
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }




    return(
        
        <>
        {
            isEmpty(notification) && 
            <div data-testid='no-notification-component'></div>
        }

        {!isEmpty(notification) && 
        
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
        
    );
};

export default Notification;
