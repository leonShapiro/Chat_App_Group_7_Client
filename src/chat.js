import $ from "jquery";
import { getAllUsers, muteUnmuteUser } from "../src/rest";
let id;
let users = [];
$(() => {
  if (document.URL.includes("chat")) {
    if (sessionStorage.getItem("token") == null) {
      window.location.replace("http://localhost:9000/");
    }
  }

  window.onload = function () {
    setTimeout(displayUsers(), 0.1); //Then set it to run again after ten minutes
  };

  async function displayUsers() {
    try {
      users = await getAllUsers();
      users.sort(dynamicSort_1("userStatus"));
      users.sort(dynamicSort("userType"));
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
    }
    $(".custom-menu").hide(100);
  });

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  return function (a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
});

function dynamicSort_1(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? 0 : a[property] > b[property] ? -1 : 1;
    return result * sortOrder;
  };
}
