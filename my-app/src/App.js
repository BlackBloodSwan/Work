import React, { Component } from "react";
import NameForm from "./Form"
import GoogleLogin from 'react-google-login';
import CheckToken from "./CheckToken";
import "./index.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import { getKeyFromChildrenIndex } from "rc-menu/lib/util";

const { Header, Content, Footer } = Layout;

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
    if (res.status !== 200) {
      console.log(res)
    }
    else {
      this.setState({ isLoggedIn: true })
    }
  }

  failure = (response) => {
    console.log(response)
  }

  async componentDidMount() {
    //Vom lokal storage den Token holen 
    const res = await CheckToken(localStorage.getItem("token"))
    if (res.status !== 200) {
      console.log(res)
      localStorage.clear()
    }
    else {
      this.setState({ isLoggedIn: true })
    }
  }


  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Add User to binding</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '100 100px', position: "relative", textAlign: "center"}}>
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
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made with Love by Data Access Team</Footer>
      </Layout>
    );
  }
}

export default App;

