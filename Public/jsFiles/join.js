async function joinRoom () {
    const roomID = document.getElementById("roomID").value;
    const FehlerRaumID = document.getElementById("FehlerRaumID");

    const response = await fetch(`/room/room-check/${roomID}`);
    try {
            if (response.status === 404) {
                FehlerRaumID.textContent = "Room not found";
                throw new Error('Room not found');
            }

            if (response.ok) {
                FehlerRaumID.textContent = "";
                const playerResponse = await fetch(`/player/player-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        roomID: roomID,
                        playerName: document.getElementById("playerName").value
                     })
                })

                const roomData = await playerResponse.json();
                
                // Here you can handle the successful room join, e.g., redirecting to the game page
                window.location.href = `./picktureSubmit.html?roomID=${roomData.roomID}&playerID=${roomData.playerID}`;
            } else {
                FehlerRaumID.textContent = "Failed to join room";
                throw new Error('Failed to join room');
        }
    }
    catch (err) {
            console.error('Error:', err);
            alert('Failed to join room: ' + err.message);
        };

    
}