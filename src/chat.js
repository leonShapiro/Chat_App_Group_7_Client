import $ from "jquery";
import { getAllUsers, muteUnmuteUser, getUserByNickname } from "../src/rest";
let id;
let users = [];
$(() => {
  if (document.URL.includes("chat")) {
    if (sessionStorage.getItem("token") == null) {
      window.location.replace("http://localhost:9000/");
    }
    displayUsers();
    setInterval(function () {
      displayUsers();
    }, 15000);
  }

  async function displayUsers() {
    try {
      $("#user-list").empty();
      console.log("im here");
      users = await getAllUsers();
      for (var key in users) {
        addUserToList(users[key]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function addUserToList(user) {
    const list = document.querySelector("#user-list");
    const row = document.createElement("tr", user.id);
    ifAdmin(user);
    row.innerHTML = `
                <td><a id=${user.id} contextmenu="custom-menu" href="#">
              ${ifAdmin(user)} <div class="${
      user.userStatus
    }-indicator"></div></a></td>
               <i class="bi bi-person"></i></td>`;
    list.appendChild(row);
  }

  function ifAdmin(user) {
    if (user.userType == "ADMIN") return "*" + user.nickName;
    else return user.nickName;
  }

  function getUserById(id) {
    const user = users.filter((user) => user.id == id);
    return user;
  }

  // Trigger action when the contexmenu is about to be shown
  $("#user-list").on("contextmenu", function (event) {
    id = event.target.id;
    event.preventDefault();
    $(".custom-menu")
      .finish()
      .toggle(100)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px",
      });
  });

  $(document).on("mousedown", function (e) {
    if (!$(e.target).parents(".custom-menu").length > 0) {
      $(".custom-menu").hide(100);
    }
  });

  $(".custom-menu li").on("click", function (event) {
    const user = getUserById(id);
    switch ($(this).attr("data-action")) {
      case "mute":
        let textButton = event.target.textContent;
        muteUnmuteUser(
          sessionStorage.getItem("nickName"),
          user[0].nickName,
          textButton
        );
        break;

      case "unmute":
        let textButton1 = event.target.textContent;
        muteUnmuteUser(
          sessionStorage.getItem("nickName"),
          user.nickName,
          textButton1
        );
        break;

      case "contactInfo":
        getUserByNickname(user[0].nickName);
        break;
    }
    $(".custom-menu").hide(100);
  });
});
