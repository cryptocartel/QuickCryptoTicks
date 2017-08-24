$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});

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

	getJSON('https://api.coinmarketcap.com/v1/ticker/',
	function(err, data) {
		if (err != null) {
			console.log('Something went wrong: ' + err);
		} else {
			var list = "";
			for (var i = 0; i < data.length; i++) {
				list += "<li style='display:none'> <a href='https://coinmarketcap.com/currencies/" + data[i].id + "'>" + data[i].id + "(" + data[i].symbol + ")</a></li>";
			}
			document.getElementById("currencies").innerHTML = list;
			}
		});

$(document).ready(function(){
$("#filter").keyup(function(){

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;

		// Loop through the comment list
		$("li").each(function(){

				// If the list item does not contain the text phrase fade it out
				if ($(this).text().search(new RegExp(filter, "i")) < 0) {
						$(this).fadeOut();

				// Show the list item if the phrase matches and increase the count by 1
				} else {
						$(this).show();
						count++;
				}
		});

		// Update the count
		var numberItems = count;
		$("#filter-count").text("Results = "+count);
});
});
