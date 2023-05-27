//Server Side Code


const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMsg = require('./utils/message');
const { UserJoin , getCurrentUser, UserLeave ,getRoomUsers } = require('./utils/users');



const app = express();
const server = http.createServer(app); // use of createServer 
const io = socketio(server);

app.use(express.static(path.join(__dirname,'public'))); // Use of path.join

//Global var
const PORT = 3000 || process.env.PORT ;
const botName = 'Chat Bot';
let user; 

//Run When client connets
io.on('connection', (socket) =>{

    socket.on('joinRoom' , ({username , room }) =>{

        user = UserJoin(socket.id , username , room );

        socket.join(user.room)

        socket.emit('message' , formatMsg(botName,'Welcome to ChatRoom'));
    
        //Broadcast the user connect except user
        socket.broadcast.to(user.room).emit('message' , formatMsg(botName,`
        ${user.username} has Joined the Chat`));

        //User and room info

        io.to(user.room).emit('roomUsers' , {
            room : user.room ,
            users : getRoomUsers(user.room)
        });


    })


    //Listen for chatMsg
    socket.on('chatMsg' , (msg)=>{

        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',formatMsg(user.username,msg)); 
    })


    //Runs when Client Disconnets
    socket.on('disconnect', ()=>{

        const user = UserLeave(socket.id);

        if(user){

            io.to(user.room).emit('message',formatMsg(botName,` ${user.username} has left the chat`)) //this notifis everyone
        }

        //User and room info
        io.to(user.room).emit('roomUsers' , {
            room : user.room ,
            users : getRoomUsers(user.room)
        });


        
    })
})


server.listen(PORT , () => {
    console.log(`Server Started on ${PORT}`); // Use of ->  `
})

