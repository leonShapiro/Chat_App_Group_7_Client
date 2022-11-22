import $ from "jquery";
import { createUser, loginUser, createMessage, createGuest,getAllUsers,displayUsers} from "./rest";
import { openConnection, sendPlainMessage,getAllMesseges, } from "./sockets";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

$(() => {
  $("#reg-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      nickName: $("#nicknameInput").val(),
      password: $("#passwordInput").val(),
    };
    createUser(user);
  });

 $("#reg-geust-btn").on("click", () => {
    const user = {
      nickName: $("#nicknameInput").val(),
    };
    createGuest(user);
  });

  $("#send-btn").on("click", () => {
    const Message = {
      //id: $('#emailInput').val(),
      //sender: $('#userInput').val(),
      content: $("#message-input").val(),
    };
    createMessage(Message);
    sendPlainMessage("MyUser", $("#message-input").val());
    document.getElementById("message-input").value = "";
  });

  $("#login-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      password: $("#passwordInput").val(),
    };
    loginUser(user);
    window.location.replace("./pages/chat.html");
  });

  $("#export-btn").on("click", () => {
    const messages = getAllMesseges();
  var jsonObj = messages.map(o => Object.values(o).join(' : '));
  var jsonObject = JSON.stringify(jsonObj,null,"\t");
  downloadCSV(jsonObject);

  });


document.getElementById("btn-list").addEventListener("click", displayUsers);


  function downloadCSV(csvStr) {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;" + encodeURI(csvStr);
    hiddenElement.download = "Exported chat.csv";
    hiddenElement.click();
  }

});







openConnection();
