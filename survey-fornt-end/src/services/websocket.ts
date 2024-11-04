// // const WS_URL =
// //   process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws';
// const WS_URL = 'ws://localhost:8080/ws';
// export const connectWebSocket = (surveyId: string): WebSocket => {
//   const token = localStorage.getItem('token');
//   const socket = new WebSocket(
//     `${WS_URL}/survey/${surveyId}?token=${token}`
//   );

//   socket.onopen = () => {
//     console.log('WebSocket connection established');
//   };

//   socket.onclose = (event) => {
//     console.log('WebSocket connection closed:', event);
//   };

//   socket.onerror = (error) => {
//     console.error('WebSocket error:', error);
//   };

//   return socket;
// };

// export const sendWebSocketMessage = (
//   socket: WebSocket,
//   message: any
// ): void => {
//   if (socket.readyState === WebSocket.OPEN) {
//     socket.send(JSON.stringify(message));
//   } else {
//     console.error(
//       'WebSocket is not open. ReadyState:',
//       socket.readyState
//     );
//   }
// };
