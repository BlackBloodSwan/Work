import React, { Component } from "react";
import NameForm from "./Form"
import GoogleLogin from 'react-google-login';

class App extends Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false
        }
    }
    responseGoogle = (response) => {
        console.log(response);

    }

    failure = (response) => {
        console.log(response)
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.isLoggedIn === false
                        ? <GoogleLogin
                            clientId="583258145332-nc2pi59numak156h8boc49easpo22jp5.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.failure}
                            cookiePolicy={'single_host_origin'}
                        />
                        : <NameForm />
                }
            </div>
        );
    }
}

export default App;
