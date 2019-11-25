import React, { Component } from 'react';

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
    this.setState({...this.state, loading: true})
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
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.submit}>
            <label>
              Project-ID (all letters small):
              <input style={{borderColor: "blue"}} type="text" value={this.state.valueProjectID} onChange={this.handleChangeProjectID}></input>
            </label>
            <br/> <br/>
            <label>
              Role (first letter in upper case): 
              <input style={{borderColor: "blue"}} type="text" value={this.state.valueRole} onChange={this.handleChangeRole}></input>
            </label>
            <br/> <br/>
            <label>
              E-Mail (all letters small):
              <input style={{borderColor: "blue"}} type="text" value={this.state.valueEmail} onChange={this.handleChangeEmail}></input>
            </label>
            <button> submit </button>
          </form>
        </header>
      </div>
    );
  }
}

class Form extends React.Component {}
export default NameForm;