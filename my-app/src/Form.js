import React, { Component } from 'react';
import './index.css';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Input, Select, Icon } from 'antd';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const selectAfter = (
    <Select defaultValue="@mediamarktsaturn.com" style={{ width: 200 }}>
      <Option value="@mediamarktsaturn.com">@mediamarktsaturn.com</Option>
      <Option value="@mediamarktsaturn.de">@mediamarktsaturn.de</Option>
      </Select>);

class NameForm extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            response: null,
            value: ''
        };
    }


    submit = async (e) => {
        e.preventDefault();
        this.setState({ ...this.state, loading: true })
        const data = {
            "project_id": this.state.valueProjectID,
            "role": this.state.valueRole,
            "e_mail": this.state.valueEmail 
        };
        console.log(data)
        fetch('http://127.0.0.1:5000/add_user_to_binding', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => console.log(res));
        this.setState({
            ...this.state,
            loading: false,
        })
    }

    handleChangeProjectID = (event) => {
        console.log(event.target.value)
        this.setState({
            ...this.state,
            valueProjectID: event.target.value
        })
    }
    handleChangeRole = (event) => {
        console.log(event.target.value)
        this.setState({
            ...this.state,
            valueRole: event.target.value
        })
    }
    handleChangeEmail = (event) => {
        console.log(event.target.value)
        this.setState({
            ...this.state,
            valueEmail: event.target.value
        })
    }


    render() {
        return (
            <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
              <div className="App">
                <header className="App-header">
                    <form onSubmit={this.submit}>
                        <br/>
                        Project-ID :
              <Input placeholder="input in small letters" type="text" value={this.state.valueProjectID} onChange={this.handleChangeProjectID} />
                        <br /> <br />
                        <label>
                            Role :
              <Input placeholder="first letter in upper case" type="text" value={this.state.valueRole} onChange={this.handleChangeRole} />
                        </label>
                        <br /> <br />
                        <label>
                            E-Mail :
              <Input placeholder="input in small letters" addonAfter={selectAfter} type="text" value={this.state.valueEmail} onChange={this.handleChangeEmail} />
                        </label>
                        <br />
                        <br />
                        <button type="submit"> Submit </button>
                    </form>
                </header>
            </div>
            </Content>
          </Layout>
        );
    }
}

export default NameForm;