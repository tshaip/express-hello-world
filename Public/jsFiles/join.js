function tryName () {
  const roomName = document.getElementById("roomCode").value
  fetch(`/data/${roomName}/${roomName}.json`)
    .then(response => {
      if (!response.ok){
        const div = document.getElementById('FehlerRaumName');
        div.text = `Raum mit dem Namen '${roomName}' ist nicht vorhanden.`;
      }
      return response.json();
    })
    .then(data => {
      console.log("Geladene Daten: ", data)
    })
    .catch(error => {
      console.error("Fehler beim Laden oder Parsen der Datei:", error.message);
    })
 
    const jsonData = JSON.stringify(Room, null, 2);
    console.log("Daten als JSON:", jsonData);

    // An den Server senden
    fetch('/Join-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonData
    })
    .then(res => res.text())
    .then(msg => alert('Antwort vom Server: ' + msg))
    .catch(err => console.error('Fehler:', err));
}