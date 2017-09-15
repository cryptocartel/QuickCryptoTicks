
function getJSON(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status == 200) {
			callback(null, xhr.response);
		} else {
			callback(status);
		}
	};
	xhr.send();
}

    search = function(word){
      getJSON('https://api.coinmarketcap.com/v1/ticker/',
      function(err, data) {
        if (err != null) {
          console.log('Something went wrong: ' + err);
        } else {
          var list = [];

          for (var i = 0; i < data.length; i++) {
              list.push({id : data[i].id, ticker : data[i].symbol});
          }
          var found = 0;
          for (i = 0; i < list.length; i++) {
            if (list[i].ticker == word) {
              chrome.tabs.create({url: "https://coinmarketcap.com/currencies/" + data[i].id});
              found = 1;
            }
          }
          if (found == 0) {
            alert(word + " not found on Coinmarketcap");
          }
          console.log(word);
          }
        });
     };

     searchCash = function(word) {
       search(word.selectionText.substring(1));
     }

     searchPlain = function(word) {
       search(word.selectionText);
     }

    chrome.contextMenus.create({
     title: "Search Cashtag",
     contexts:["selection"],  // ContextType
     onclick: searchCash // A callback function
    });

    chrome.contextMenus.create({
     title: "Search plain text",
     contexts:["selection"],  // ContextType
     onclick: searchPlain // A callback function
    });
