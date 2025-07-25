const params = new URLSearchParams(window.location.search);
const lbl = document.getElementById("categorie");

const roomID = params.get('roomID');
const playerID = params.get('playerID');

let categories = [];
let i = 0;

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`/room/categories/${roomID}`);
  categories = await response.json();
  main();
});

async function main() {
    lbl.textContent = categories[i].name;     
}

async function uploadPicture() {
    const file = document.getElementById("picture").files[0];
    const formData = new FormData();
    formData.append('file', file);

    await fetch(`/image/upload/${roomID}/${playerID}/${categories[i].id}`, {
        method: 'POST',
        body: formData
    });

    i++;

    if (i === categories.length) {
        window.location.href = './lobby.html';
    }

    lbl.textContent = categories[i].name;     
}
