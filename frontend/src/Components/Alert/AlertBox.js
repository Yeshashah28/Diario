import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const AlertBox = ({ message, show, dismisstime = 2000 }) => {
  return (
    <div>
      {/* Internal CSS for brown aesthetic */}
      <style>{`

       @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .brown-toast {
          background-color: #8B5E3C !important; /* warm brown */
          color: #fff !important;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(139, 94, 60, 0.3);
           animation: slideInRight 0.5s ease-out;
        }

        .brown-toast .toast-body {
          font-family: 'ui-monospace';
          font-size:20px;
          font-weight: 100;
          letter-spacing: 0.4px;
          padding: 12px 16px;
        }
      `}</style>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          className="brown-toast"
          show={show}
          delay={dismisstime}
          animation={false}
          autohide
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AlertBox;
