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

function createRoom() {
    const roomName = document.getElementById("roomName").value;
    fetch('/room-data/' + roomName,)
    .then(response => {
      if (response.ok) {
        const lbl = document.getElementById('FehlerRaumName');
        lbl.textContent = `Room with the name '${roomName}' already exists. Please choose a different name.`;
        throw new Error(`Room '${roomName}' already exists.`);
      }
    })
    /*.then(() => {
    const lbl = document.getElementById('FehlerRaumName');
    lbl.textContent = `Name available.`;
    
    const categories = Array.from(document.querySelectorAll('input[name="category"]'));
    const categoryValues = categories.map(input => input.value).filter(value => value.trim() !== '');

    const jsonData = {
        name: roomName,
        private: document.getElementById("Privat").checked,
        categories: categoryValues,
        players: []
    }

    console.log("Room data to be sent:", jsonData);

    return fetch('/room-data/' + roomName, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
      });
    })
    .then(res => res.text())
    .then(msg => console.log('Response from server: ' + msg))
    .catch(err => console.error('Error:', err));*/
}
