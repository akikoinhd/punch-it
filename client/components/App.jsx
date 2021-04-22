import React from 'react';

const db = 'mongodb+srv://akiko:kse4VhApZLJ7wZW3Y18g@cluster0.eu8ky.mongodb.net/cocktaildb?retryWrites=true&w=majorit';


//********************************************************************//
// <!__ROOT COMPONENT__!>
//********************************************************************//

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedCocktails: false,
            cocktails: {}
        }
    }

    // componentDidMount() {
    //     fetch('/api/')
    //         .then(res => res.json())
    //         .then(data) => {
    //             res.locals = data;
    //             return this.setState({
    //                 fetchedCocktails: true,
    //                 cocktails: res.locals
    //             })
    //         }

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



//**************************************************************************//
// <!__DISPLAY FIELD COMPONENT__!>
//**************************************************************************//

class Field extends App {
    render() {
        return(
            <div className="whiteFrame">
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



//**************************************************************************//
// <!__SEARCH BAR COMPONENT HERE__!>
//**************************************************************************//

class Search extends Field {
    constructor(props) {
        super(props);
        this.state = {
            searchField: '',
            displaySearch: true,
            displayResults: false,
        },

        this.results = '',

        this.handleChange = this.handleChange.bind(this),
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(event) {
        this.setState({searchField: event.target.value})
    }

    handleSearch(event) {
        event.preventDefault();
        console.log(`Searching for ${this.state.searchField}`)
        fetch(`http://localhost:3000/api/results?drinkName=${event.target.value}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({displaySearch: false, displayResults: true});
                this.results = data;
                return this.results;
            })
    }

    render() {
        if (this.state.displaySearch) {
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
        if (this.state.displayResults) {
            return(
                <p>Results for {this.state.searchField} will display here!</p>
            )
        }
    }
}



//*************************************************************************//
// <!__COCKTAIL CREATION AND SCALING GOES HERE__!>
//*************************************************************************//

class Scaler extends Field {
    constructor (props) {
        super(props),
        this.state = {
            name: '',
            fields: 0,
            renderedFields: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({renderedFields: this.state.fields});
        console.log(`Will attempt to render ${this.state.fields} fields...`)
        // do some stuff that calls the render
    }
    render() {
        const array = [];
        for (let i=0; i<this.state.fields; i++) {
            array.push(<Ingredient key={i}/>);
        }
        if (this.state.renderedFields===0) {
            return(
                <div>
                    <p>Got a recipe?</p>
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
        else return(
            <div>
                <p>{this.state.name}</p>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>{array}</div>
                        <input className="button" type="submit" value="Punch It!"/>
                    </form>
                </div>
            </div>
        )
    }
}



//*************************************************************************//
// <!__INGREDIENT FIELD GENERATION GOES HERE__!>
//*************************************************************************//

class Ingredient extends Scaler {
    constructor() {
        super();
        this.state = {
            ingredient: null,
            volume: null,
            measure: null,
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return(
            <div className="ingredientFields">
                <input className="searchI" type="text" name="ingredient" placeholder="Ingredient" onChange={this.handleChange}/>
                <input className="searchV" type="text" name="ingredient" placeholder="Volume" onChange={this.handleChange}/>
                <input className="searchM" type="text" name="ingredient" placeholder="oz/mL" onChange={this.handleChange}/>
            </div>
        )
    }
}
export default App;