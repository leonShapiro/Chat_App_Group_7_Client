import $ from "jquery";
import {
  createUser,
  loginUser,
  createMessage,
  createGuest,
  getAllMesseges,
  confirmUserAccount,
  logoutUser,
  getLatestMessages,
} from "./rest";
import { openConnection, sendPlainMessage } from "./sockets";
import "bootstrap";
import "./chat";
import "bootstrap/dist/css/bootstrap.min.css";

$(() => {

  $("#send-btn").on("click", () => {
    const message = $("#message-input").val();
    if (message != "") {
      const token = sessionStorage.getItem("token");

      createMessage(token, message);
      sendPlainMessage(
        sessionStorage.getItem("nickName"),
        $("#message-input").val()
      );
      document.getElementById("message-input").value = "";
    }
  });

  $("#message-input").keypress(function (event) {
    if (event.keyCode === 13) {
      $("#send-btn").click();
    }
  });

  $("#login-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      password: $("#passwordInput").val(),
    };
    loginUser(user);
    displayUsers();
  });

  $("#logOut-btn").on("click", () => {
    const user = sessionStorage.getItem("nickName");
    logoutUser(user);
  });

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
    if (document.getElementById("publicProfile").checked) {
      user.privacyStatus = "PUBLIC";
    }
    if (document.getElementById("privateProfile").checked) {
      user.privacyStatus = "PRIVATE";
    }

    window.localStorage.setItem("user", JSON.stringify(user)); // save user locally.
    sessionStorage.setItem("registerEmail", user.email);
    createUser(user);
  });

  $("#reg-geust-btn").on("click", () => {
    const user = {
      nickName: $("#nicknameInput").val(),
    };
    createGuest(user);
  });

  $("#confirm-btn").on("click", () => {
    const queryString = window.location.search;
    var id = queryString.substring(queryString.lastIndexOf("=") + 1);
    confirmUserAccount(id);
  });
});




openConnection();
