const socket = io({ path: "/api/socketio" });

function login() { ... }
function sendMessage() { ... }

socket.on("chat message", msg => { ... });
socket.on("blocked", msg => { ... });
