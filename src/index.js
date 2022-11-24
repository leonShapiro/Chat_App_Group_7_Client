import $ from "jquery";
import {
  createUser,
  loginUser,
  createMessage,
  createGuest,
  getAllMesseges,
  confirmUserAccount,
} from "./rest";
import { openConnection, sendPlainMessage } from "./sockets";
import "bootstrap";
import { displayUsers } from "./chat";
import "./chat";
import "bootstrap/dist/css/bootstrap.min.css";

$(() => {
  $("#send-btn").on("click", () => {
    const message = $("#message-input").val();
    const token = sessionStorage.getItem("token");

    createMessage(token, message);
    sendPlainMessage(
      sessionStorage.getItem("nickName"),
      $("#message-input").val()
    );
    document.getElementById("message-input").value = "";
  });

  $("#login-btn").on("click", () => {
    const user = {
      email: $("#emailInput").val(),
      password: $("#passwordInput").val(),
    };
    loginUser(user);
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
    window.localStorage.setItem("user", JSON.stringify(user)); // save user locally.
    console.log(user);
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

$("#export-btn").on("click", async () => {
  const messages = await getAllMesseges();
  var jsonObj = messages.map((o) => Object.values(o).join(" : "));
  var jsonObject = JSON.stringify(jsonObj, "dontHave", "\t");
  downloadCSV(jsonObject);
});

function downloadCSV(csvStr) {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
  hiddenElement.target = "_blank";
  hiddenElement.download = "Exported chat.csv";
  hiddenElement.click();
}

async function exportChat() {
  try {
    const messages = await getAllMesseges();
    console.log(messages);
  } catch (e) {
    console.log(e);
  }
}

openConnection();
export { exportChat };
