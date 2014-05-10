(function() {

	var searchForm = document.getElementById('search_form');
	var searchInput = document.getElementById('search_input');
	var searchText = document.getElementById('search_text');
	var resultMessage = document.getElementById('result_message');

	searchForm.addEventListener('submit', handleSubmit);

	function handleSubmit(evt) {
		evt.preventDefault();
		performSearch(searchInput.value);
	}

	function performSearch(query) {
		var queryLength = query.length;
		var matchIndicies = [];
		var i = 0;
		var matchIndex;

		while ((matchIndex = searchText.innerText.indexOf(query, i)) > -1) {
			matchIndicies.push(matchIndex);
			i = matchIndex + queryLength;
		}

		console.log(matchIndicies);
	}

}());