const { Server } = require("socket.io")

const io = new Server({
    cors: {
        origin: "http://localhost:3000", // we are accepting all cross-origin connection from our front-end i.e connecting our backend with frontend
    },
})

let clientCount = 0

io.on("connection", (socket) => {
    //socket.join("room")
    console.log(`connected by ${socket.id}`)

    socket.on("room", (room_no) => {
        //  to join a room we have to listen , same as other event.
        if (clientCount < 2) {
            socket.join(room_no)
            clientCount++
            console.log(`client of the room is ${clientCount}`)
            console.log(`${socket.id} joined to room: ${room_no}`)
        } else {
            console.log(`client limit exceeded`)
        }
    })

    socket.on("leave_room", (room_no) => {
        try {
            socket.leave(room_no)
            console.log(`room deleted`)
        } catch (error) {
            console.log(error)
        }
    })

    // here server will hear the message from one user and  WILL EMIT A EVENT FROM HERE TO FRONT END FOR ANOTHER USER IN ROOM.
    socket.on("messages_from_client", (messages) => {
        console.log(`the object is: ${messages}`)
        console.log(
            `server got this message: ${messages.message} from room: ${messages.roomId} by user:`
        )
        socket.to(messages.roomId).emit("messages_from_server", messages)
    })

    socket.on("disconnect", (reason) => {
        //  WILL DISCONNECT THE SOCKET IF I REFRESH THE FRONT END
        console.log(`disconnect due to ${reason}`)
    })
})

// I NEED TO CHECK THAT CAN I ADD 2 io.on("connection")

// io.on("connection", (socket) => {
//     socket.to("room").broadcast.emit("event_s", "")
//})

io.listen(4000, () => {
    console.log(`Listening on port: 4000...`)
})
