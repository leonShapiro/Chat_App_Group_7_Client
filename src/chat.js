import $ from "jquery";
import { getAllUsers } from "../src/rest";

$(() => {
 if (document.URL.includes("chat")) {
   if (sessionStorage.getItem("token") == null) {
     window.location.replace("http://localhost:9000/");
   }
 }


displayUsers();
  async function displayUsers() {
    try {
      const users = await getAllUsers();
      users.sort(dynamicSort("userStatus"));
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
    const row = document.createElement("tr");
    ifAdmin(user);

    row.innerHTML = `
              <td><a href=”“>${ifAdmin(user)} ${user.userStatus}</a></td>
              <td><i class="bi bi-person"></i></td>
          `;
    list.appendChild(row);
  }
// });


function ifAdmin(user){
  if(user.userType == "ADMIN")
  return "*"+user.nickName;

  else return user.nickName;
  
}

// Trigger action when the contexmenu is about to be shown
$("#user-list").on("contextmenu", function (event) {
    
    // Avoid the real one
    event.preventDefault();
    
    // Show contextmenu
    $(".custom-menu").finish().toggle(100).
    
    // In the right position (the mouse)
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});


// If the document is clicked somewhere
$(document).on("mousedown", function (e) {
    
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        
        // Hide it
        $(".custom-menu").hide(100);
    }
});

// If the menu element is clicked
$(".custom-menu li").on("click",function(){
    
    // This is the triggered action name
    switch($(this).attr("data-action")) {
        
        // A case for each action. Your actions here
        case "first": alert("first"); break;
    }
  
    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);
  });




function dynamicSortMultiple() {
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}



function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
   
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
});
