import $ from "jquery";
import {
  createUser,
  loginUser,
  createMessage,
  confirmUserAccount,
} from "./rest";
import { openConnection, sendPlainMessage } from "./sockets";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
///////////REGISER SECTION //////////////////////////////////////////////////////////////
//---------------------------------------------------------------- REGISTER
$(() => {
  $("#reg-btn").on("click", () => {
    if ($("#passwordInput").val() != $("#passwordInputConfirm").val()) {
      $("#messagepassword").html("Password don't match").css("color", "red");
    }

    var user = {
      email: $("#emailInput").val(),
      nickName: $("#nicknameInput").val(),
      password: $("#passwordInput").val(),
    };

    if ($("#userFirstNameInput").val().length > 0) {
      user.firstName = $("#userFirstNameInput").val();
    }
    if ($("#userLastNameInput").val().length > 0) {
      user.lastName = $("#userLastNameInput").val();
    }
    if ($("#birthdayInput").val().length > 0) {
      user.dateOfBirth = $("#birthdayInput").val();
    }
    if ($("#descriptionInput").val().length > 0) {
      user.description = $("#descriptionInput").val();
    }
    window.localStorage.setItem("user", JSON.stringify(user)); // save user locally.
    console.log(user);
    sessionStorage.setItem("registerEmail", user.email);
    createUser(user);
  });

  //--------------------------------------------------------------- CONFIRM
  $(() => {
    $("#confirm-btn").on("click", () => {
      const queryString = window.location.search;
      var id = queryString.substring(queryString.lastIndexOf("=") + 1);
      confirmUserAccount(id);
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////

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
});
openConnection();
