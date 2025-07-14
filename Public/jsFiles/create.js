const categoryCount = 0;

function addCategory (){
    const container = document.getElementById("categorys");
    const div = document.createElement("div");

    div.className = "category";
    div.innerHTML = `<label>Category ' + categoryCount + ':</label>
    <input type="text" name="category" placeholder="" required>`;

    container.appendChild(div);
    categoryCount++;
}

function tryName () {

    const inputs = document.querySelectorAll('input[name="category"]');
    const categorys = [];

    inputs.forEach(input => {
      const wert = input.value.trim();
      if (wert !== '') {
        categorys.push(wert);
      }
    });

    const Room = {
        name : document.getElementById("roomName").value,
        password_value : document.getElementsById("Privat").checked,
        password : document.getElementById("password").value,
        categorys : categorys,
        players : {},
    }
 
    const jsonData = JSON.stringify(Room, null, 2);
    console.log("Daten als JSON:", jsonData);

    // An den Server senden
    fetch('/Create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonData
    })
    .then(res => res.text())
    .then(msg => alert('Antwort vom Server: ' + msg))
    .catch(err => console.error('Fehler:', err));
}