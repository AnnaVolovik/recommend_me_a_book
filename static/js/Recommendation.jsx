import React from "react";

var $ = require('jquery');
require('jquery-ui-bundle');

export default class Recommendation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {book: this.props.name + ' by ' + this.props.author,
                      description: this.props.description};
        this.getPythonBook = this.getPythonBook.bind(this);
    }

    getPythonBook() {
        // we call the url (http://127.0.0.1:5000/) + hello, getting the data
        // calling the function with that data
        // that set state
        $.getJSON(window.location.href + 'recommend_me_a_book', (data) => {
            this.setState({
                book: data.name + ' by ' + data.author,
                description: data.description
            })
        });
    }

    render () {
        return (
            <div>
                <h1>{this.state.book}</h1>
                <hr/>
                <p>{this.state.description}</p>
                <button onClick={this.getPythonBook}>Recommend me a book!</button>
            </div>
            );
        }
    }

