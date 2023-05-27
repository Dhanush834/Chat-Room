const users = [];

//Join user to diffentRoom chat
function UserJoin (id,username,room){
    const user = {
        id,
        username,
        room
    }

    users.push(user);

    return user;

}

//User Leaves chat
function UserLeave (id) {

    const index = users.findIndex( user => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }

}

// Get room Users 
function getRoomUsers (room) {
    return users.filter(user => user.room === room );
}





//Get current User
function getCurrentUser(id){
    return users.find(user =>
            user.id === id
        );
}

module.exports = {
    UserJoin,
    getCurrentUser,
    UserLeave,
    getRoomUsers
}