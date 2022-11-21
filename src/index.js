import $ from "jquery";
import { createUser, loginUser, createMessage } from "./rest";
import { openConnection, sendPlainMessage,getAllMesseges } from "./sockets";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

$(() => {
  $("#reg-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      nickName: $("#userInput").val(),
      password: $("#passwordInput").val(),
    };
    createUser(user);
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
    window.alert("Dsa");
    const user = {
      email: $("#emailInput").val(),
      password: $("#passwordInput").val(),
    };
    loginUser(user);
    window.location.replace("./pages/chat.html");
  });

  $("#export-btn").on("click", () => {
    const messages = getAllMesseges();
  var jsonObject = JSON.stringify(messages,null, "\t");

  downloadCSV(jsonObject);

  });


  function downloadCSV(csvStr) {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
    hiddenElement.target = "_blank";
    hiddenElement.download = "Exported chat.csv";
    hiddenElement.click();
  }
});
openConnection();
