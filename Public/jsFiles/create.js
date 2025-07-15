let categoryCount = 0;

function addCategory (){
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
      if (!response.ok) {
        const lbl = document.getElementById('FehlerRaumName');
        lbl.textContent = `Room with the name '${roomName}' already exists. Please choose a different name.`;
        return;
      }
    })
}
