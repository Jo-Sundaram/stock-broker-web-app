  
import React, { Component } from 'react';
import Navbar from "./components/NavBar/navbar.component";


export default class Secret extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: ''      
        }
    }
//const [user, setUser] = useState();

    componentDidMount() {
        fetch("http://localhost:5000/api/secret", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        })
        .then((res) => {
            return res.json();
        })
        .then((user) => {
            console.log(user);
            this.setState({
                user: user.email
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <Navbar/>

                <div className = "userInfo">
                    <h1>Your Account</h1>

                    <h3>Email: {this.state.user}</h3>

                </div>
            </div>

        );
    }
}