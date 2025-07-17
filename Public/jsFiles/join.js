async function joinRoom () {
    const roomName = document.getElementById("roomName").value;
    const username = document.getElementById("username").value;
    const lbl = document.getElementById('FehlerRaumName');

     if (!roomName || !username) {
        lbl.textContent = "Please enter both room name and username.";
        return;
    }

    const response = await fetch('/room-data/' + roomName,);
        if (response.status === 404) {
            console.log(`Room with name '${roomName}' does not exist.`);
            lbl.textContent = `Name of the room is available.`;
            return;
        } else if (response.status === 200) {  
            lbl.textContent = `Room exists.`;
        } else {
          return;
        }
    
    const data = await response.json();
    
        if (data.players.includes(username)) {
            lbl.textContent = `Username '${username}' is already taken in this room. Please choose a different username.`;
            return;
        }

        data.players.push(username);

        fetch('/room-data/' + roomName, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(text => {
            console.log("Room joined successfully:", text);
            lbl.textContent = `Successfully joined the room as '${username}'.`;
            window.location.href = './pictureSubmit.html';
        })
        .catch(error => {
            console.error("Error joining room:", error);
            lbl.textContent = "Error joining the room. Please try again.";
        });
}