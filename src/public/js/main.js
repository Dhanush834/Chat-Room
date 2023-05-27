//Client side Code

const chatForm = document.getElementById('chat-form');
const chatMsg = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Get username and room from URL

const { username , room  } = Qs.parse(location.search,{
    ignoreQueryPrefix : true
});


var socket  = io();

//Join diff chat rooms 

socket.emit('joinRoom' , {username , room})


//Message from server
socket.on('message' , (msg) =>{
    console.log(msg);
    OutputMsg(msg);

    //Scroll down
    chatMsg.scrollTop =  chatMsg.scrollHeight; // use of scroll property
})

//Message Submition in Input form
chatForm.addEventListener('submit',(e)=>{

    e.preventDefault();

    const msg =  e.target.elements.msg.value;

    // console.log(msg);

    //Emitting Msg to server
    socket.emit('chatMsg' , msg ); 

    //Clearing the input after sending text
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

})

//Message to display on client
function OutputMsg(msg)
{
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${msg.username} <span> ${msg.time} </span></p>
                     <p class="text">
                        ${msg.text}
                     </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//Get Room and Users

socket.on('roomUsers' , ({room , users}) =>{
    OutputRoomName(room);
    OutputUsers(users);
})


//Add room name 

function OutputRoomName(room){

    roomName.innerText = room;

}

//Add users 

function OutputUsers(users){
    userList.innerHTML = 
    `

    ${users.map(user => `<li> ${user.username} </li>`).join('')}

    `;
}
