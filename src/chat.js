import $ from "jquery";
import {
  getAllUsers,
  muteUnmuteUser,
  keepAlive,
  checkOfflineUsers,
  switchStatus,
  getUserByNickname,
  getMessagesByScroll,
} from "../src/rest";
let id;
let users = [];
let messages = [];

$(() => {
  if (document.URL.includes("chat")) {
    if (sessionStorage.getItem("token") == null) {
      window.location.replace("http://localhost:9000/");
    }
    displayUsers();
    setInterval(function () {
      displayUsers();
    }, 15000);

    setInterval(function () {
      keepAlive(sessionStorage.getItem("nickName"));
    }, 10000);

    setInterval(function () {
      checkOfflineUsers();
    }, 21000);

    document.getElementById(
      "myUserNickname"
    ).innerHTML = `<h6><b>Hello user: </b><span style="color:#009D0D">${sessionStorage.getItem(
      "nickName"
    )}</span></h6><hr><br>`;
  }

  async function displayUsers() {
    try {
      $("#user-list").empty();
      users = await getAllUsers();
      for (var key in users) {
        addUserToList(users[key]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function displayMessages_v(messages) {
    try {
      let textArea = $("#main-chat");
      $("#main-chat").empty();
      console.log(messages);
      for (let i = messages.length - 1; i > 0; i--) {
        textArea.val(
          messages[i].sender +
            ": " +
            messages[i].content +
            "\n" +
            textArea.val()
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  let clicks = 0;
  $("#load-msg-btn").on("click", async () => {
    clicks += 1;
    messages = await getMessagesByScroll(clicks);
    $("#main-chat").empty();
    displayMessages_v(messages);
    scrollDown();
  });

  function scrollDown() {
    var $textarea = $("#main-chat");
    let st = $(this).scrollTop(); //get current scroll position
    $textarea.scrollTop($textarea[0].scrollTo(0, 500));
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
    if (user.userType == "GUEST") return "Guest-" + user.nickName;
    return user.nickName;
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
        muteUnmuteUser(
          sessionStorage.getItem("nickName"),
          user[0].nickName,
          "mute"
        );
        break;

      case "unmute":
        muteUnmuteUser(
          sessionStorage.getItem("nickName"),
          user[0].nickName,
          "unmute"
        );
        break;

      case "SwitchStatus":
        let temp = sessionStorage.getItem("nickName");
        if (temp.startsWith("Guest-")) {
          temp = sessionStorage.getItem("nickName").replace("Guest-", "");
        }
        if (temp == user[0].nickName) {
          switchStatus(temp);
        }
        break;
      case "contactInfo":
        getUserByNickname(user[0].nickName);
        break;
    }
    $(".custom-menu").hide(100);
  });
});