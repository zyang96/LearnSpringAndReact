import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        items: []
    };

    handleClick() {
        // If the proxy is already set, then just need to specify path
        axios.get('api/items')
            .then(response => this.setState({items: response.data}))
    }

    searchItem() {
        this.setState({
            items : this.data
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className="App-intro">
                        <h2>Coconut Man</h2>
                        <button onClick = {() => this.handleClick()}>
                            Click Me
                        </button>
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
