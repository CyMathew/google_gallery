import React from 'react';
import ReactDOM from 'react-dom';
import GoogleImages from 'google-images';
import config from './config'

var client;

const ImageGallery = (props) => 
{
    if(props.data != undefined && props.data.length > 0)
    {
        return(
            <div id="results">            
              <h3>Results</h3>
              <div id="gallery">
                  {props.data.map((image, index) => (<img src={image.url} key={index}/>))}
              </div>
            </div>
        )
    }
    else
    {
        return null;
    }
};

class SearchPanel extends React.Component
{
    constructor(props)
    {
        super(props);
        this.suggestionsArray = ['cat', 'fireworks', 'museums', 'bird', 'code', 'flower'];
        this.typedSearch = this.typedSearch.bind(this);
        this.search = this.search.bind(this);
    }
    
    typedSearch(event)
    {
        event.preventDefault();
        let query = this.refs.search_field.value;
        if(query)
            this.search(query);
    }
    
    search(query)
    {
        this.refs.search_field.value = query;
        
        client.search(query)
            .then((images) => this.props.shareDataRef(images));
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
    constructor(props)
    {
        super(props);
        
        this.state = {
            images: []
        };
        
        client = new GoogleImages(config.CSE_ID, config.API_KEY);
        this.getData = this.getData.bind(this);

    }

    getData(images)
    {
        this.setState({ images: images });
    }

    render()
    {
        return (
            <React.Fragment>
                <header>
                    <img src="./logos/logo_google.svg" height="100px" width="100px"/>
                    <img src="./logos/plus_icon.svg" height="40px" width="40px" />
                    <img src="./logos/logo_react.svg" height="115px" width="115px"/>
                </header>
                <div id="content">
                    <SearchPanel shareDataRef={this.getData} />
                    <ImageGallery data={this.state.images} />
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));