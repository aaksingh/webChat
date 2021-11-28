cd "D:\WebTalK\Socket" && pm2 start socket.js --name socket-server
cd "D:\WebTalK\Backend" && pm2 start server.js --name node-server
cd "D:\WebTalK\webchat" && yarn start 