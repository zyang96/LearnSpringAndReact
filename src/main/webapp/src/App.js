import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
          searchValue : '',
          items: []
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    // handles the search button
    handleClick() {
      // If the proxy is already set, then just need to specify path
      axios.get('api/items')
          .then(response => {
            // when call another method in the class, we need to add 'this'
            const matchedItems = this.changeSearchResults(response.data);
            this.setState({items : matchedItems})
          });
    }

    changeSearchResults(data) {
      const matchedItems = data.filter(item =>
        item.name.toLowerCase().includes(this.state.searchValue)
        || item.type.name.toLowerCase().includes(this.state.searchValue)
        || item.store.toLowerCase().includes(this.state.searchValue));
      return matchedItems;
    }

    // handles the text input change
    handleChange(event) {
      event.preventDefault();
      this.setState({searchValue : event.target.value.toLowerCase()});
    }

    // handles the form submit event
    handleSubmit(event) {
      // prevent default page refreshing
      event.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-intro">
                        <h2>Coconut Man</h2>
                        <form onSubmit={this.handleSubmit}>
                          <label>
                            <input
                              type="text"
                              name="name"
                              onChange={this.handleChange}
                              placeholder="search single grocery item you want"
                            />
                          </label>
                          <button onClick = {this.handleClick}>
                              Search
                          </button>
                        </form>
                        <body>
                        <ol>
                            {this.state.items.map((item, index) =>
                                <li key = {item.id}>
                                    {item.name} | {item.store} | {item.type.name}
                                </li>
                            )}
                        </ol>
                        </body>
                    </div>
                </header>
            </div>
        );
    }
}

export default App
