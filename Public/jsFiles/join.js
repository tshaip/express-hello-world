function joinRoom () {
    const roomName = document.getElementById("roomName").value;
    const username = document.getElementById("username").value;


    fetch('/room-data/' + roomName)
    .then(response => {
        if (!response.ok) {
            const lbl = document.getElementById('FehlerRaumName');
            lbl.textContent = `Room with the name '${roomName}' does not exist. Please check the code.`;
            console.log(`Error: Room with name '${roomName}' not found.`);
            return;
        }
        return response.json();
    })
    .then(jsonData => {
      if (jsonData.players.includes(username)) {
        const lbl = document.getElementById('FehlerSpielerName');
        lbl.textContent = `Username is not available. Please choose a different username.`;
        return;
      }

      console.log("Room data retrieved:", jsonData);

      localStorage.setItem("playerName", username);
      jsonData.players.push(username);
      fetch('/rooms/room-data/' + roomName, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      }) 
      .then(res => res.text())
      .then(msg => {
        console.log('Serverantwort:', msg);})
      .catch(err => console.error('Fehler:', err));

      localStorage.setItem("categories", JSON.stringify(jsonData.categories));
    })
    .catch(error => {
    console.error('Fehler beim Abrufen des Raums:', error.message);
    });

    window.location.href = "./pictureSubmit.html";
}