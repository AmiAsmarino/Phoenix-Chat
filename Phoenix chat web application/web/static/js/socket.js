import {Socket} from "phoenix"


//check n is value or empty
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
let username = localStorage.getItem("username");
let isNumUsername = isNumber(username);
// Getting username created date and now
var object = JSON.parse(localStorage.getItem("key")),
   userDate = object.timestamp,
   nowT = new Date().getTime().toString();
var yesterday = nowT - 86400000;
// Check if no username and if the username is from yesterday
if (isNumUsername != true && userDate < yesterday){
  username = prompt("Enter your username");
  localStorage.setItem("username", username);
  // store the username created time
  var object = {value: "value", timestamp: new Date().getTime()}
  localStorage.setItem("key", JSON.stringify(object));
}



console.log("Username", username);
let socket = new Socket("/socket", {params: {username: username}})


socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("rooms:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })



let msgs = document.getElementById("messages");
let input = document.getElementById("input");
input.addEventListener("keyup",function(e){
  if (e.keyCode == 13){
  channel.push("msg",{
    body: input.value})
  input.value = "";
  }
})

channel.on("msg", function(message){
  msgs.innerHTML += `<div class=message>@${message.username}: ${message.body}</div>`
})
console.log("my msg",msgs);
console.log("input",input);
export default socket
