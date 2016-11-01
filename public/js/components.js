var SearchForm = React.createClass({
  render: function(){
    return(
      <form>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="search-q" onChange={this.handleChange} placeholder="Search youtube video..."/>
        </div>
      </form>
    );
  },

  handleChange: function(event) {
     var q = event.target.value;

     if(q.length < 3 ) {
       return;
     }

     var apiKey = 'AIzaSyCib4u1AhhD-AYScV1hmdskxjDEZJC7Jc8';
     var url = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key='+apiKey+'&q='+encodeURI(q);

     function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((item) =>

        <li key={item.id.videoId} className="mdl-list__item mdl-list__item--three-line">
          <span className="mdl-list__item-primary-content">
            <a href="#" data-id={item.id.videoId} className="track">
              <img height="40px" className="media-object" src={ item.snippet.thumbnails.default.url }/>
            </a>
            <b>{item.snippet.title }</b>
            <span className="mdl-list__item-text-body">{ item.snippet.description }</span>
          </span>
          <span className="mdl-list__item-secondary-content">
            <a className="mdl-list__item-secondary-action add-track" href="javascript:;"
              data-video-id={ item.id.videoId }
              data-video-title={ item.snippet.title }
              data-video-thumbnail={ item.snippet.thumbnails.default.url }
            >
              <i className="material-icons">play_for_work</i></a>
          </span>
        </li>
      );

      return (
        <ul className="mdl-list">{listItems}</ul>
      );
    }


     $.getJSON(url, function(data) {

       ReactDOM.render( <NumberList numbers={data.items} />, document.getElementById('search-result') );
       $('#search-result').show();

     });
  }

});

ReactDOM.render( <SearchForm />, document.getElementById('react-form-container') )
