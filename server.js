const http = require('http');
const app = require('./src/app'); 

const PORT = process.env.PORT || 2000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
