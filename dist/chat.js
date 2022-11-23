
const serverAddress = "http://localhost:8080";
import {User} from "./Entities/user.js";

    displayUsers();
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
        row.innerHTML = `
            <td><a href=”“>${user.nickName}</a></td>
            <td><i class="bi bi-person"></i></td>
        `;
        list.appendChild(row);
    }


async function getAllUsers() {
let result;
   return await fetch(serverAddress +'/register/getAll', {
      method: 'GET'
    })
    .then( function(response) {
      return  response.json();
    })
    .then( function(data) {
      return  data;
    })
}
