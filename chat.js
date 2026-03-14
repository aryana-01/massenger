const socket = io();

function login(){
  let username = document.getElementById("username").value;
  if (!username) return alert("Enter email");
  socket.emit("join", username);
  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("chatDiv").style.display = "flex";
}

function sendMessage(){
  let msg = document.getElementById("msg").value;
  if (!msg) return;
  socket.emit("chat message", msg);
  document.getElementById("msg").value = "";
}

socket.on("chat message", (msg) => {
  let div = document.createElement("div");
  div.className = "message";
  div.innerText = msg;
  document.getElementById("messages").appendChild(div);
});

socket.on("blocked", (msg) => {
  alert(msg);
  location.reload();
});