/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../redux/actionCreators/notificationsActions';




const selectNotification = state => state.notification;
let timer = undefined;
const Notification = () => {
    const dispatch = useDispatch();

    const notification = useSelector(selectNotification);

    //console.log("notification = ", notification);

    
    
    useEffect(() => {
        //console.log("use effect notification = ", notification);

        if (notification.message) {

            if (timer!==undefined){
                //console.log("----- clear timer", timer);
                clearTimeout(timer);
            }

            timer = setTimeout(() => {

                dispatch(removeNotification());
                timer = undefined;
            }, 5000);

            //console.log('******', timer);
    }

           
        

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
