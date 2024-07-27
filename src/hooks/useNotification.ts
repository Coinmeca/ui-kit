import { useContext } from 'react';
import { NotificationContext } from 'contexts/Notification';

export default function useNotification(): NotificationContext {
    return useContext(NotificationContext);
}
