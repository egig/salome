"use strict";

var Component = {
  init: function init(apiKey) {

    var SearchForm = React.createClass({
      displayName: "SearchForm",

      render: function render() {
        return React.createElement(
          "form",
          null,
          React.createElement(
            "div",
            { className: "mdl-textfield mdl-js-textfield" },
            React.createElement("input", { className: "mdl-textfield__input", type: "text", id: "search-q", onChange: this.handleChange, placeholder: "Search youtube video..." })
          )
        );
      },

      handleChange: function handleChange(event) {
        var q = event.target.value;

        if (q.length < 3) {
          return;
        }

        var url = 'https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=' + apiKey + '&q=' + encodeURI(q);

        function NumberList(props) {
          var numbers = props.numbers;
          var listItems = numbers.map(function (item) {
            return React.createElement(
              "li",
              { key: item.id.videoId, className: "mdl-list__item mdl-list__item--three-line" },
              React.createElement(
                "span",
                { className: "mdl-list__item-primary-content" },
                React.createElement(
                  "a",
                  { href: "#", "data-id": item.id.videoId, className: "track" },
                  React.createElement("img", { height: "40px", className: "media-object", src: item.snippet.thumbnails.default.url })
                ),
                React.createElement(
                  "b",
                  null,
                  item.snippet.title
                ),
                React.createElement(
                  "span",
                  { className: "mdl-list__item-text-body" },
                  item.snippet.description
                )
              ),
              React.createElement(
                "span",
                { className: "mdl-list__item-secondary-content" },
                React.createElement(
                  "a",
                  { className: "mdl-list__item-secondary-action add-track", href: "javascript:;",
                    "data-video-id": item.id.videoId,
                    "data-video-title": item.snippet.title,
                    "data-video-thumbnail": item.snippet.thumbnails.default.url
                  },
                  React.createElement(
                    "i",
                    { className: "material-icons" },
                    "play_for_work"
                  )
                )
              )
            );
          });

          return React.createElement(
            "ul",
            { className: "mdl-list" },
            listItems
          );
        }

        $.getJSON(url, function (data) {

          ReactDOM.render(React.createElement(NumberList, { numbers: data.items }), document.getElementById('search-result'));
          $('#search-result').show();
        });
      }

    });

    ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('react-form-container'));
  }
};