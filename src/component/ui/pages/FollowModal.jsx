
import React, { useContext } from "react";
import { SocketContext } from "./../../../Socket/SocketProvider"

const FollowModal = ({ onClose, onSend, targetUsername, setTargetUsername }) => {
  const { socket } = useContext(SocketContext);

  const sendRequest = () => {
    onSend(); // dispatch API request

    // Emit realtime event
    socket?.emit("sendFollowRequest", {
      toUser: targetUsername,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
         onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-lg w-[320px]"
           onClick={(e) => e.stopPropagation()}>

        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Send Follow Request
        </h2>

        <input
          type="text"
          placeholder="Enter username"
          value={targetUsername}
          onChange={(e) => setTargetUsername(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
                onClick={sendRequest}>
          Send Request
        </button>

        <button className="mt-3 w-full text-gray-600" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FollowModal;

