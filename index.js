import React from 'react';
import ReactDOM from 'react-dom';

class SearchPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.typedSearch = this.typedSearch.bind(this);
        this.search = this.search.bind(this);

        this.suggestionsArray = ['cats', 'fireworks', 'museums'];
    }

    typedSearch(event)
    {
        event.preventDefault();
        let query = this.refs.search_field.value;
        if(query)
        {
            console.log(query);
            search(query);
        }
    }

    search(query)
    {
        this.refs.search_field.value = query;
    }

    render()
    {
        return (

            <React.Fragment>
                <form onSubmit={this.typedSearch}>
                    <input type="text" ref="search_field" name="search_field" id="search_field" placeholder="Search for images here"/>
                    <button type="submit">Search!</button>
                </form>

                <div id="suggestions_pane">
                    <p>Try these search suggestions</p>
                    {this.suggestionsArray.map((suggestion, index) => (
                        <button className="suggestion" key={index} onClick={ () => this.search(suggestion)}>
                            {suggestion}
                        </button>))
                    }
                </div>
            </React.Fragment>
        );
    }
}

class App extends React.Component
{
    render()
    {
        return (
            <div id="content">
                <SearchPanel />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));