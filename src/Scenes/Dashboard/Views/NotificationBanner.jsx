import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const NotificationBanner = ({ notification }) => {
  if (!notification) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center ${
      notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
    }`}>
      {notification.type === 'success' ? <FiCheckCircle className="mr-2" /> : <FiAlertCircle className="mr-2" />}
      {notification.message}
    </div>
  );
};

export default NotificationBanner;
