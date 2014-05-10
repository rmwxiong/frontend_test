(function() {

	var searchForm = document.getElementById('search_form');
	var searchInput = document.getElementById('search_input');
	var searchText = document.getElementById('search_text');
	var resultMessage = document.getElementById('result_message');

	searchForm.addEventListener('submit', handleSubmit);

	function handleSubmit(evt) {
		evt.preventDefault();
		if (searchInput.value.length > 0) performSearch(searchInput.value);
	}

	function performSearch(query) {
		var queryLength = query.length;
		var matchIndicies = [];
		var i = 0;
		var matchIndex;
		var matchCount = 0;
		var matchText = searchText.innerText || searchText.textContent;

		while ((matchIndex = matchText.indexOf(query, i)) > -1) {
			matchCount += 1;
			i = matchIndex + queryLength;
		}

		resultMessage.innerHTML = 'Found ' + matchCount + ' occurances of the word "' + query + '" in the below text.';
	}

}());