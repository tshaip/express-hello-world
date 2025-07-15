function joinRoom () {
    const roomName = document.getElementById("roomName").value;
    const username = document.getElementById("username").value;


    fetch('/room-data/' + roomName)
    .then(response => {
        if (!response.ok) {
            const lbl = document.getElementById('FehlerRaumName');
            lbl.textContent = `Room with the name '${roomName}' does not exist. Please check the code.`;
            console.log(`Error: Room with name '${roomName}' not found.`);
            return Promise.reject(`Room with name '${roomName}' not found.`);
        }
        return response.json();
    })
    .then(jsonData => {
      if (!jsonData) return;

      if (jsonData.players.includes(username)) {
        const lbl = document.getElementById('FehlerSpielerName');
        lbl.textContent = `Username is not available. Please choose a different username.`;
        return Promise.reject(`Username '${username}' is already taken.`);
      }

      console.log("Room data retrieved:", jsonData);

      localStorage.setItem("playerName", username);
      localStorage.setItem("categories", JSON.stringify(jsonData.categories));

      jsonData.players.push(username);

      return fetch('/rooms/room-data/' + roomName, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });
    }) 
    .then(res => res.text())
    .then(msg => {
      console.log('Serverantwort:', msg);})
    .then(() => {
      window.location.href = "./pictureSubmit.html";
    })
    .catch(error => {
    console.error('Fehler beim Abrufen des Raums:', error.message);
    });
}