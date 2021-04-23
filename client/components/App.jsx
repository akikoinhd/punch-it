import React from 'react';


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
            result: {}
        },

        this.handleChange = this.handleChange.bind(this),
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(event) {
        this.setState({searchField: event.target.value})
    }

    handleSearch(event) {
        event.preventDefault();
        fetch(`/api/results?drinkName=${this.state.searchField.toLowerCase()}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    displaySearch: false,
                    displayResults: true,
                    result: data
                });
                return this.state;
            })
    }

    render() {
        const resultName = this.state.searchField.toLowerCase();
        const arrayIngs = [];
        const arrayMeasures = [];
        for (let i=0; i<=this.state.result.length; i++) {
            arrayIngs.push(<div key={i+'ing'}>{this.state.result[0][i]}</div>);
            arrayMeasures.push(<div key={i+'vol'}>{this.state.result[1][i]}</div>);
        }
        if (this.state.displaySearch) {
            return(
                <div>
                    <div>
                        <form onSubmit={this.handleSearch}>
                            <input className="search" type='text' onChange={this.handleChange} placeholder="Search by name"/>
                            <input className="button" type="submit" value="Search It!"/>
                        </form>
                    </div>
                </div>
            )
        }
        if (this.state.displayResults) {
            return(
                <div>
                    <p id="resultName">{resultName}</p>
                    <hr></hr>
                    <div className="results">
                        <div id="ings">
                            {arrayIngs}
                        </div>
                        <div id="measures">
                            {arrayMeasures}
                        </div>
                    </div>
                </div>
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
            ingredients: [],
            ingState: {
                item: '',
                volume: 0,
                measure: '',
            },
            clicked: false,
            arrayIngs: [],
            arrayVol: [],
            posted: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.post = this.post.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

// vvvvvvv write this damn post request Aki vvvvvvv

    post(event) {
        console.log(this.state.ingredients);
        event.preventDefault();
        console.log(`Attempting to store ${this.state.name} in the database.`)
        fetch(`/api/results/${this.state.name}`, {
            method: 'POST',
            body: JSON.stringify({ drinkName: this.state.name }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then(() => {
                this.setState({posted: true,})
            });

    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            renderedFields: this.state.fields,
        });
    }

    handleClick() {
        this.setState({
            clicked: true,
        })
        let array = [];
        for (let i=0; i<this.state.ingredients.length; i++) {
            array.push(this.state.ingredients[i]);
        };
        for (let i=0; i<this.state.ingredients.length; i++) {
            this.state.arrayIngs.push(array[i]);
            this.state.arrayVol.push(<p>`${array[i][volume]}${array[i][measure]}`</p>);
        }
    }

    render() {
        const array = [];
        for (let i=0; i<this.state.fields; i++) {
            array.push(<Ingredient key={i} state={this.state}/>);
        }
        if (this.state.renderedFields===0) {
            return(
                <div>
                    <p>Got a recipe?</p>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input className="search" type="text" name="name" placeholder="Name your cocktail" onChange={this.handleChange}/>
                            <input className="search" type="text" name="fields" placeholder="How many ingredients?" onChange={this.handleChange}/>
                            <input className="button" type="submit" value="Submit It!"/>
                        </form>
                    </div>
                </div>
            )
        }
        if (this.state.clicked) {
            return(
                <div>
                    <div>
                        {this.state.name}
                    </div>
                    <div>
                        {this.state.arrayIngs}
                    </div>
                    <div>
                        {this.state.arrayVol}
                    </div>
                </div>
            )
        }
        if (this.state.posted) {
            return(
                <div>
                    <p>Successfully stored {this.state.name} in the PunchIt database!</p>
                </div>
            )
        }
        else {
            return(
                <div>
                    <p>{this.state.name}</p>
                    <div>
                        <div>
                            {array}
                        </div>
                        <input className="button" type="button" onClick={this.handleClick} value="Punch It!"/>
                    </div>
                </div>
            )
        }
    }
}



//*************************************************************************//
// <!__INGREDIENT FIELD GENERATION GOES HERE__!>
//*************************************************************************//

class Ingredient extends Scaler {
    constructor(props) {
        super(props);
        this.handleChange1 = this.handleChange.bind(this);
        this.handleSubmit1 = this.handleSubmit.bind(this);
    }

    handleChange1(event) {
        event.preventDefault();
        console.log('typing')
        this.state.ingState[event.target.name] = event.target.value
        console.log(this.state.ingState[event.target.name]);
    }

    handleSubmit1(event) {
        event.preventDefault();
        let obj = this.state.ingState;
        this.state.ingredients.push(obj);
        console.log(this.state.ingredients);
    }

    render() {
        
        return(
            <div className="ingredientFields">
                <form onSubmit={this.handleSubmit1}>
                    <input className="searchI" type="text" name="item" placeholder="Ingredient" onChange={this.handleChange1}/>
                    <input className="searchV" type="text" name="volume" placeholder="Volume" onChange={this.handleChange1}/>
                    <input className="searchM" type="text" name="measure" placeholder="oz/mL" onChange={this.handleChange1}/>
                    <input className="bbbutton" type="submit" value="▶"></input>
                </form>
            </div>
        )
    }
}


export default App;