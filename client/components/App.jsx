import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route, Redirect, useHistory, useLocation } from "react-router-dom";


class App extends React.Component {
    render() {
        return(
            <div>
                <div className="banner">
                    <h1>Punch It!</h1>
                </div>
                <hr></hr>
                <div className="flexGuy">
                    <div><Field /></div>
                </div>
            </div>
        )
    }
}

class Field extends App {
    render() {
        return(
            <div className="whiteFrame">
                <div></div>
                <p>Got a recipe?</p>
                <div className="scaleIt">
                    <Scaler/>
                </div>
                <p>Access the PunchIt database:</p>
                <div className="searchdb">
                    <Search/>
                </div>
                <div className="credits">
                    <p>© Voyáge, Inc.</p>
                </div>
            </div>
        )
    }
}

class Search extends Field {
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
        },
        this.handleChange = this.handleChange.bind(this),
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(event) {
        this.setState({searchField: event.target.value})
    }

    handleSearch(event) {
        event.preventDefault();
        // do stuff here
        console.log(`Searched for ${this.state.searchField}`)
    }

    render() {
        return(
            <div>
                <div>
                    <button className="button">My Cocktails</button>
                </div>
                <div>
                    <form method="POST" action='/search' onSubmit={this.handleSearch}>
                        <input className="search" type='text' onChange={this.handleChange} placeholder="Search by name"/>
                        <input className="button" type="submit" value="Search It!"/>
                    </form>
                </div>
            </div>
        )
    }
}

class Scaler extends Field {
    constructor (props) {
        super(props),
        this.state = {
            name: '',
            fields: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(`Will attempt to render ${this.state.fields} fields...`)
        // do some stuff that calls the render
    }
    render() {
        return(
            <div>
                <div>
                    <form method="POST" action='/create' onSubmit={this.handleSubmit}>
                        <input className="search" type="text" name="name" placeholder="Name your cocktail" onChange={this.handleChange}/>
                        <input className="search" type="text" name="fields" placeholder="How many ingredients?" onChange={this.handleChange}/>
                        <input className="button" type="submit" value="Submit It!"/>
                    </form>
                </div>
            </div>
        )
    }
}
export default App;