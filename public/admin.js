// public/admin.js
const socket = io('https://your-chat-server-url.com'); // ★変更：チャットサーバのURLに置き換え
let isAdmin = false;

function login() {
  const pass = document.getElementById('adminPass').value;
  socket.emit('adminLogin', pass, (res) => {
    if (res.status === 'ok') {
      isAdmin = true;
      document.getElementById('adminPanel').style.display = 'block';
      socket.emit('adminLogsRequest');
      alert('ログイン成功');
    } else {
      alert('パスワードが違います');
    }
  });
}

function broadcast() {
  const msg = document.getElementById('broadcastInput').value;
  if (msg) {
    socket.emit('adminBroadcast', msg);
    document.getElementById('broadcastInput').value = '';
  }
}

socket.on('adminLogs', (logs) => {
  const logText = logs.map(log =>
    `[${new Date(log.time).toLocaleString()}] (${log.room}) ${log.user}: ${log.text || '[画像]'}`
  ).join('\n');
  document.getElementById('logArea').textContent = logText;
});
