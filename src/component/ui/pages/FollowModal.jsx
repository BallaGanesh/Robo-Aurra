// import React from "react";

// const FollowModal = ({
//   onClose,
//   onSend,
//   onAccept,
//   onReject,
//   targetUsername
// }) => {
//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-xl shadow-lg w-[320px] animate-scale-in"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           Follow Options
//         </h2>

//         <p className="text-gray-600 text-sm mb-4">
//           User: <span className="font-semibold">@{targetUsername}</span>
//         </p>

//         {/* ACTION BUTTONS */}
//         <div className="space-y-3">
//           <button
//             onClick={onSend}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
//           >
//             Send Follow Request
//           </button>

//           <button
//             onClick={onAccept}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
//           >
//             Accept Request
//           </button>

//           <button
//             onClick={onReject}
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
//           >
//             Reject Request
//           </button>
//         </div>

//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="mt-4 w-full text-gray-600 hover:text-black font-semibold"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FollowModal;

// ------------------
// working version for requests
// ------------------
// import React from "react";

// const FollowModal = ({ onClose, onSend, targetUsername, setTargetUsername }) => {
//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-xl shadow-lg w-[320px]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           Send Follow Request
//         </h2>

//         {/* SIMPLE INPUT FIELD */}
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={targetUsername}
//           onChange={(e) => setTargetUsername(e.target.value)}
//           className="w-full p-2 border rounded-lg mb-4"
//         />

//         {/* SEND REQUEST BUTTON */}
//         <button
//           onClick={onSend}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
//         >
//           Send Request
//         </button>

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="mt-3 w-full text-gray-600 hover:text-black"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FollowModal;


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

