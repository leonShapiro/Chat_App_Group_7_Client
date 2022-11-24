import { getAllUsers } from "./rest";

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




