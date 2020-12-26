var socket = io.connect();

let user;

function createLoginButton(){
    $('.login').append($('<div id="'+ 1 +'"><div class="checklogin"></div><div>Username</div><input type="text" id="username"  value="" /><div>Password</div><input type="text" id="password"  value="" /><br></br><button id="loginButton" Onclick="login()">Login</button></div>'));
}

function login(){

    var success;
    let data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    const response =  fetch("http://localhost:5000/api/superuserLogin", {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    })
    .then((res) => {
        return res.json();
    })
    .then((response) => {
        user = response;
        if(response.success == true){
            //$(".checkLogin").empty();
            $(".login").empty();
            
            $('.sim').append($('<button id="loginButton" Onclick="daysim()">Sim Day</button>'));
            $('.checkLogin').text('Logged In');
        }
        else{
            //$(".checkLogin").empty();
            $('.checkLogin').text('Invalid Username/Password');
        }
    })
    .catch((err) => {
        console.log(err);
        success == 0;
    });
}

function daysim(){
    socket.emit("simday", user);
}