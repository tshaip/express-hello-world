const socket = io(); // Verbindung zum Se
// 

rver

const params = new URLSearchParams(window.location.search);
const playerID = params.get('playerID');
const roomID = params.get('roomID');

// Beim Laden registrieren
document.addEventListener("DOMContentLoaded", () => {
  socket.emit('register', { playerID, roomID });

  // Beispiel: eine Nachricht senden
  document.getElementById("sendBtn").addEventListener("click", () => {
    const toPlayer = document.getElementById("toPlayer").value;
    const msg = document.getElementById("message").value;
    socket.emit('message', { toPlayerID: toPlayer, message: msg });
  });
});

// Nachricht empfangen
socket.on('message', (msg) => {
  console.log("Nachricht empfangen:", msg);
  // z. B. anzeigen in der UI
});
