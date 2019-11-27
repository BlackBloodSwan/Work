import React, { Component } from "react";
import NameForm from "./Form"
import GoogleLogin from 'react-google-login';
import CheckToken from "./CheckToken";

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false
    }
  }
  responseGoogle = async (response) => {
    console.log(response);
    //Weiterleitung zur Form.js
    const res = await CheckToken(response.Zi.id_token)
    if (res.status !== 200){
      console.log(res)
    }
    else{
      this.setState({isLoggedIn: true})
    }
  }

  failure = (response) => {
    console.log(response)
  }

  async componentDidMount() {
    //Vom lokal storage den Token holen 
    const res = await CheckToken(localStorage.getItem("token"))
    if (res.status !== 200){
      console.log(res)
      localStorage.clear()
    }
    else{
      this.setState({isLoggedIn: true})
    }
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

