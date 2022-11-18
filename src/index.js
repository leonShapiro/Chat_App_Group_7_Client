import $ from 'jquery'
import { createUser } from './rest';
import { createMessage } from './rest';
import { openConnection, sendPlainMessage } from './sockets';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
$(() => {
  $(document).on('submit', () => {
    const user = {
      email: $('#emailInput').val(),
      nickName: $('#userInput').val(),
      password: $('#passwordInput').val()
    }
    createUser(user);
  })
  

  $("#send-btn").on("click", () => {
    const Message = {
      //id: $('#emailInput').val(),
      //sender: $('#userInput').val(),
      content: $('#message-input').val()
    }
    createMessage(Message);
    sendPlainMessage("MyUser", $('#message-input').val())
    document.getElementById('message-input').value = ""
  })

})
openConnection();
