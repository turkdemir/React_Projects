import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      job: "",
    };
    this.initialState = this.state;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.isUpdating
      ? this.props.updateUser(
          JSON.parse(window.localStorage.getItem("user")),
          this.state
        )
      : this.props.newUser(this.state);
    this.setState(this.initialState);
    document.getElementById("myForm").reset();
  };




  componentDidUpdate(prevProps, prevState) {
        
    console.log('componentdidupdate works')
    if (this.props.selectedUser !== prevProps.selectedUser) {
      console.log('setstatte works')
      this.setState(this.props.selectedUser);
      window.localStorage.setItem(
        "user",
        JSON.stringify(this.props.selectedUser)
      );
    }
    
  }

  cancel = () => {
    this.setState(this.initialState);
    document.getElementById("myForm").reset();
    this.props.cancelUpdate();
  };

  render() {
    const { selectedUser, isUpdating } = this.props;
    console.log(selectedUser);
    console.log(isUpdating);
    console.log(this.state);
    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={selectedUser ? selectedUser.name : ""}
            onChange={(e) => this.setState({ name: e.target.value })}
            required
          />
          <label htmlFor="job">Job</label>
          <input
            type="text"
            name="job"
            id="job"
            defaultValue={selectedUser ? selectedUser.job : ""}
            onChange={(e) => this.setState({ job: e.target.value })}
          />
          <div className="buttons">
            <button type="submit">
              {isUpdating ? "Update User" : "Add User"}
            </button>
            <div style={{ visibility: isUpdating ? "" : "hidden" }}>
              <input type="button" value="Cancel" onClick={this.cancel} />
            </div>
          </div>
        </form>
        {this.state.name || this.state.job ? (
          <h2>
            Entered name is: {this.state.name}, and entered job is:{" "}
            {this.state.job}
          </h2>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Form;
