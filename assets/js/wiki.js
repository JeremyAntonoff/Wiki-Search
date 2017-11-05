let res = [];
const input = $('input[type=text]');
let searchItem;
$(document).ready(function() {
  inputSearch();
});

function searchwiki() {
  $.ajax({
    url:
      'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=' +
      searchItem +
      '&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?',
    dataType: 'json',
    headers: { 'Api-User-Agent': 'Example/1.0' }
  })
    .then(appendResults)
    .catch(appendError);
}

function appendResults(results) {
  res = [];
  var array = Object.keys(results.query.pages).map(function(key) {
    return key;
  });
  for (var i = 0; i < array.length; i++) {
    res.push({
      title: results.query.pages[array[i]].title,
      pageid: results.query.pages[array[i]].pageid,
      content: results.query.pages[array[i]].extract
    });
  }
  listItems(res);
}

function appendError() {
  $('ul').append('<li><p>Something went wrong. Please try again later.</li>');
  $('li').css({ color: 'red', 'text-align': 'center' });
}

function inputSearch() {
  input.on('keypress', e => {
    searchItem = input.val();
    if (e.which === 13) {
      removeList();
      return searchwiki();
    }
  });
}

function listItems() {
  for (var i = 0; i < res.length; i++) {
    $('ul').append(
      `<li><span id = 'title'><a href = https://en.wikipedia.org/?curid=res${[i]
        .pageid} >${res[i].title}</a></span><br><br>${res[i].content}</li>`
    );
  }
}

function removeList() {
  $('ul').html(' ');
}
