
const serverAddress = "http://localhost:8080";
import {User} from "../dist/Entities/user.js";
import {getAllUsers} from "./rest.js";

    Alert("sa");
    async function displayUsers(){
    try {

    const users= await getAllUsers();
    for (var key in users) {
        addUserToList(users[key]);
    }
    } catch(e) {
    console.log(e);
    }
    }


  function addUserToList(user) {
        const list = document.querySelector('#user-list');
        const row = document.createElement('tr');
        row.innerHTML =`
            <td><a href=”“ class="customMenu">${user.nickName}</a></td>
            <td><i class="bi bi-person"></i></td>
        `;
        list.appendChild(row);
    }





let modal = document.getElementById("contextMenu");


// Close the menu when you left click anywhere
document.addEventListener("click", function(_event){
  modal.classList.add("hidden");
});

// Set up an event handler for the documnt right click
document.addEventListener("contextmenu", function(event) {
  // Only do something when the element that was actually right-clicked
  // on has the right class to trigger the menu
  if(event.target.classList.contains("customMenu")){
    event.preventDefault();
    modal.classList.remove("hidden");

  }

      
});








