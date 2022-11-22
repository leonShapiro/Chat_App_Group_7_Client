import {get} from "jquery";
import { serverAddress } from "./constants";

   const displayUsers = async () => {
      let users=[];
      users= await getAllUsers();
      const selectItems = document.querySelector('.select-text');
for(let i = 0; i < users.length; i++) {
    let obj = users[i];


}
      results.forEach(element => {
      const options = document.createElement("option");
      options.textContent = element.name;
      options.value = element.id;
      selectItems.appendChild(options);
        });
    };


const createUser = (user) => {
  fetch(serverAddress + "/user", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createGuest = (user) => {
  fetch(serverAddress + "/user/guest", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createMessage = (token,message) => {
  fetch(serverAddress + "/message/create", {
    method: "POST",
    body: JSON.stringify({ 
    token: token,
    content :message
   }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};



async function getAllUsers () {
let result;
   return await fetch(serverAddress +'/user/getAll', {
      method: 'GET',
    })
    .then( function(response) {
      return  response.json();
    })
    .then( function(data) {
      var users = JSON.stringify(data,null,"\t");
      return  users;
    })
}




const loginUser = (user) => {
  const loginFetchPromise = 
  fetch(serverAddress + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

 loginFetchPromise.then((Response) => {
    if(Response.ok){
      Response.text().then((text) => {

        const myArray = text.split(":");
        sessionStorage.setItem("nickName",myArray[0])
        sessionStorage.setItem("token",myArray[1])
        window.location.replace("./pages/chat.html");
      })
    }
  })


export { createUser, createMessage, loginUser,createGuest, getAllUsers,displayUsers};

 


