const express = require("express");
const db = require("./routes/db-config");
const cookie = require("cookie-parser");
const dotenv = require("dotenv").config();
const path = require("path");
const session = require("express-session");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const flash = require("req-flash");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users")
const app = express();


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);
const botName = 'ChatCord Bot'
    // Run when client connects
io.on("connection", socket => {
    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)
            // Welcome current user
        socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(botName, `${user.username} has joined the chat`)
            );
        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });

    });


    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
    // Runs when client disconnects

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });


});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'publics/assets')))
app.use(express.static(path.join(__dirname, 'node_modules')))



const bukuRoute = require("./routes/route-buku");
app.use("/buku", bukuRoute);



app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie())
app.use(express.json())
db.connect((err) => {
    if (err) throw err;
})
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"))
server.listen(5000, () => console.log(`Server running on port ${5000}`));