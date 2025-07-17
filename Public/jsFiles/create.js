let categoryCount = 1;

function addCategory (){

    if (categoryCount > 10) {
        console.log("Maximum number of categories reached.");
        return;
    }
    const container = document.getElementById("categorys");
    const div = document.createElement("div");

    div.className = "category";
    div.innerHTML = `<label>Category ${categoryCount}:</label>
    <input type="text" name="category" placeholder="" required>`;

    console.log("Category added:", div.innerHTML);

    container.appendChild(div);
    categoryCount++;
}

async function createRoom() {
    const roomName = document.getElementById("roomName").value;
    const lbl = document.getElementById('FehlerRaumName');

    const response = await fetch('/room-data/' + roomName,);
        if (response.status === 404) {
            console.log(`Room with name '${roomName}' does not exist.`);
            lbl.textContent = `Name of the room is available.`;
        } else if (response.status === 200) {  
            lbl.textContent = `Room with the name '${roomName}' already exists. Please choose a different name.`;
            return;
        } else {
          return;
        }
   
        const categories = [];
        const categoryInputs = document.querySelectorAll('input[name="category"]');
        categoryInputs.forEach(input => {
            if (input.value.trim() !== "") {
                categories.push(input.value.trim());
            }
        });

        if (categories.length === 0) {
            console.log("No categories provided.");
            return;
        }

        const roomData = {
            name: roomName,
            players: [],
            categories: categories
        };

        fetch('/room-data/' + roomName, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roomData)
        })
        .then(res => res.text())
        .then(msg => console.log('Response from server: ' + msg))
        .catch(err => console.error('Error:', err));

        window.location.href = "./Lobby.html";
}
