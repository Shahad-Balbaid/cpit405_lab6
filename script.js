let btnXHR = document.getElementById('xhr');
let btnFetch = document.getElementById('promice');
let btnFetchAsyncAwait = document.getElementById('async');
let searchText = document.querySelector('header input[type="text"]');
let searchResults = document.getElementById("searchResults");

btnXHR.addEventListener("click", function() {
  // clear previous search results
  searchResults.innerHTML = "";
  fetchGiphyAPI_UsingXHR(searchText.value);
});

btnFetch.addEventListener("click", function() {
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingFetch(searchText.value);
  });


function fetchGiphyAPI_UsingXHR(keyword) {
  if (!keyword) {
    return;
  }
  var url = "https://api.unsplash.com/search/photos";
  const apiKey = "LwQZh6fDYWpZjkTEoTAbqPAWMOSwinvDRAhcOVmGIQY";
  var params = "client_id=" + apiKey + "&query=" + encodeURIComponent(keyword) + "&per_page=5";
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      processResponse(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", url + "?" + params);
  xhr.send();
}
function fetchGiphyAPI_UsingFetch(keyword) {
    if (!keyword) {
      return;
    }
    var url = "https://api.unsplash.com/search/photos";
    const apiKey = "LwQZh6fDYWpZjkTEoTAbqPAWMOSwinvDRAhcOVmGIQY";
    var params = "client_id=" + apiKey + "&query=" + encodeURIComponent(keyword) + "&per_page=5";
    var requestOptions = {
      method: 'GET'
    };
    fetch(url + "?" + params, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        processResponse(data)
      })
      .catch((e) => {
        console.error(e);
      })
  }

  btnFetchAsyncAwait.addEventListener("click", function() {
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingFetchAsyncAwait(searchText.value)
      .catch((e) => {
        console.error(e);
      });
  });
  
  async function fetchGiphyAPI_UsingFetchAsyncAwait(keyword) {
    var url = "https://api.unsplash.com/search/photos";
    const apiKey = "LwQZh6fDYWpZjkTEoTAbqPAWMOSwinvDRAhcOVmGIQY";
    var params = "client_id=" + apiKey + "&query=" + encodeURIComponent(keyword) + "&per_page=5";
    if (!keyword) {
      return;
    }
    var requestOptions = {
      method: 'GET'
    };
  
    const response = await fetch(url + "?" + params, requestOptions); // Wait until the request completes.
    const data = await response.json(); // waits until the response completes
    processResponse(data);
  }


function processResponse(resp) {
  for (item of resp.results) {
    let imgElement = document.createElement("img");
    imgElement.src = item.urls.small;
    imgElement.alt = item.slug; 
    searchResults.appendChild(imgElement);
  }
}