import React, { Component } from "react";
import "./App.css";
import fullListOfContacts from "./contacts.json";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: fullListOfContacts.slice(0, 5),
      sorted: false
    };
    this.handleRandomContact = this.handleRandomContact.bind(this);
    this.handleSortContact = this.handleSortContact.bind(this);
    this.handleSortByPopularity = this.handleSortByPopularity.bind(this);
  }

  handleRandomContact() {
    let i = Math.floor(Math.random() * fullListOfContacts.length);
    let random = fullListOfContacts[i];
    this.setState({ contact: [...this.state.contact, random] });
  }

  handleSortContact = () => {
    const { contact } = this.state;
    contact.sort((a, b) => {
      if (a.name < b.name) return -1;
      else return 1;
    });
    this.setState(prevState => {
      return { contact: [...prevState.contact] };
    });
  };

  handleSortByPopularity = () => {
    const { contact } = this.state;
    contact.sort((a, b) => b.popularity - a.popularity); // number
    this.setState(prevState => {
      return { contact: [...prevState.contact] };
    });
  };

  handleRemove = i => {
    this.setState({
      contact: this.state.contact.filter((c, j) => i !== j)
    });
  };
  render() {
    const { contact } = this.state;

    return (
      <div className="App">
        <div className="btn">
          <button onClick={this.handleRandomContact}>Add Random Contact</button>
          <button onClick={this.handleSortContact}>Sort Contact</button>
          <button onClick={this.handleSortByPopularity}>
            Sort By Popularity
          </button>
        </div>
        <div className="container">
          <table>
            <thead>
              <tr className="container">
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contact.map((people, i) => (
                <tr key={i} className="container">
                  <td>
                    <img
                      src={people.pictureUrl}
                      alt=""
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{people.name}</td>
                  <td>{people.popularity.toFixed(2)}</td>
                  <td>
                    <button onClick={() => this.handleRemove(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
