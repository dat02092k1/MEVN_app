import io from 'socket.io-client';

const socket = io('mevnappsocket-production.up.railway.app', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5
});

export const joinRoom = (roomId) => {
    socket.emit('join-room', roomId);
  };

  export const sendFlag = (flag) => {
    socket.emit('send-flag', flag);   
  };
  
  export const leaveRoom = (roomId) => {
    socket.emit('leave-room', roomId);
  };
  
  export const sendMessage = (message) => {
    socket.emit('send-message', message);  
  };
  
  export const receiveMessage = (callback) => {
    socket.on('receive-message', (message) => {
      callback(message);
    });
  };

  export const sendNoti = (data) => {
    socket.emit('send-noti', data);  
  };

  export const receiveNoti = (callback) => {
    socket.on('receive-noti', (notification) => {
      console.log(notification);
      callback(notification);
    });
  };
  
  export default socket;
