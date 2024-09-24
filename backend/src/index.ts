export default {
  register() {  },

  bootstrap({ strapi }) {
    console.log("\nStrapi is starting...");

    if (!strapi.server || !strapi.server.httpServer) {
      console.error("Error: HTTP server is not available in Strapi.");
      return;
    }

    const io = require('socket.io')(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:4321",
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    strapi.io = io;

    io.on('connection', (socket) => {
      console.log('\nNew client connected');

      strapi.db.lifecycles.subscribe({
        async afterUpdate(event) {
          console.log('\nEntry updated', event.result);
          socket.emit('entry_updated', event.result);
        },
      });

      socket.on('disconnect', () => {
        console.log('\nClient disconnected');
      });
    });

    console.log("Socket.io initialized on Strapi server");
  },
};
