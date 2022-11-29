import $ from "jquery";
import {
  getAllUsers,
  muteUnmuteUser,
  keepAlive,
  checkOfflineUsers,
} from "../src/rest";
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

    setInterval(function () {
      keepAlive(sessionStorage.getItem("nickName"));
    }, 10000);
    setInterval(function () {
      checkOfflineUsers();
    }, 21000);
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

  function addUserToList(user) {
    const list = document.querySelector("#user-list");
    const row = document.createElement("tr", user.id);
    ifAdmin(user);

    if (user.privacyStatus == "PUBLIC") {
      row.innerHTML = `
              <td><a id=${
                user.id
              } contextmenu="custom-menu" href="#" data-toggle="modal" data-target="#profileModal${
        user.id
      }">
            ${ifAdmin(user)} <div class="${
        user.userStatus
      }-indicator"></div></a></td>
             <i class="bi bi-person"></i></td>
              <!-- start modal-->
              <div class="modal fade" id="profileModal${user.id}">
              <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Profile</h5>
                  </div>
                  <div class="modal-body">
                    <div class="profileContent">
                      Nickname: <span">${user.nickName}</span><br />
                      First name: <span id="fnameNameP">${
                        user.firstName
                      }</span><br />
                      Last name: <span id="lnameNameP">${
                        user.lastName
                      }</span><br />
                      Date of birh: <span id="bdayNameP">${
                        user.dateOfBirth
                      }</span><br />
                      Description: <span id="descriptionP">${
                        user.description
                      }</span><br />
                      Email: <span id="emailP">${user.email}</span><br />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
              </div>
              <!--end modal-->`;
    } else {
      row.innerHTML = `
                <td><a id=${
                  user.id
                } contextmenu="custom-menu" href="#" data-toggle="modal" data-target="#profileModal${
        user.id
      }">
              ${ifAdmin(user)} <div class="${
        user.userStatus
      }-indicator"></div></a></td>
               <i class="bi bi-person"></i></td>
                <!-- start modal-->
                <div class="modal fade" id="profileModal${user.id}">
                <div class="modal-dialog">
                  <!-- Modal content-->
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Private profile</h5>
                    </div>
                    <div class="modal-body">
                      <div class="profileContent">
                        Nickname: <span">${user.nickName}</span><br />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
                </div>
                <!--end modal-->`;
    }

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
        muteUnmuteUser(
          sessionStorage.getItem("nickName"),
          user[0].nickName,
          "mute"
        );
        break;

      case "unmute":
        let textButton1 = event.target.textContent;
        muteUnmuteUser(
          sessionStorage.getItem("nickName"),
          user[0].nickName,
          "unmute"
        );
        break;
    }
    $(".custom-menu").hide(100);
  });
});
