import { io } from 'socket.io-client';

export const socket = io('http://localhost:1337');

socket.on('entry_updated', (data) => {
  console.log('Entry updated:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});