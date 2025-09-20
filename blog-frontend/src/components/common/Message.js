import React from 'react';
import './Message.css'; // Optional: if you want to style it

const Message = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const messageClasses = `message message-${type}`;

  return (
    <div className={messageClasses}>
      <div className="message-content">
        {message}
        {onClose && (
          <button className="message-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;