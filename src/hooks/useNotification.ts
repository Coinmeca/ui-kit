import { useContext } from 'react';
import { NotificationContext } from 'contexts/Notification';

export default function useNotification() {
    return useContext(NotificationContext);
}
