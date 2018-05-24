const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const apiKey = 'AIzaSyA3bNqqehaVeGZo9faJ4IuBiW74TfvT6SA';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
        part: 'snippet',
        key: apiKey,
        q: `${searchTerm} in:name`
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
    return `
    <div class="injected-results-container">
      <div>
        <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a>
      </div>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img alt = "youtube video"src="${result.snippet.thumbnails.medium.url}"></a>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
     $('main').prop('hidden', false);
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
