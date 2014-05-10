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

	//BASIC SOLUTION:

	// function performSearch(query) {
	// 	var queryLength = query.length;
	// 	var matchIndicies = [];
	// 	var i = 0;
	// 	var matchCount = 0;

	// 	while ((matchIndex = searchText.innerText.indexOf(query, i)) > -1) {
	// 		matchCount += 1;
	// 		i = matchIndex + queryLength;
	// 	}

	// 	resultMessage.innerHTML = 'Found ' + matchCount + ' occurances of the word "' + query + '" in the below text.';
	// }

	//HIGHLIGHT SOLUTION:

	function performSearch(query) {
		var queryLength = query.length;
		var matchIndicies = [];
		var i = 0;
		var matchCount = 0;

		while ((matchIndex = searchText.innerText.indexOf(query, i)) > -1) {
			matchCount += 1;
			i = matchIndex + queryLength;
		}

		resultMessage.innerHTML = 'Found ' + matchCount + ' occurances of the word "' + query + '" in the below text.';

		removeHighlights();
		highlightText(searchText, query);
	}

	function highlightText(searchText, query) {
		nodeHTML = searchText.innerHTML;
		//Escape any regex characters in the query
		query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		//Adjust regex to preserve matching whitespace on either side of HTML tags
		query = query.replace(/(\s+)/,'(<[^>]+>)*$1(<[^>]+>)*');
		//Use lookahead to avoid matching on text with tags. i.e. "the" in <a href="ectoterms.html"> 
		var pattern = new RegExp('('+query+'(?![^<]*>))', 'gi');

		//First naively replace all query matches, including tags in between, with wrapping span tags
		nodeHTML = nodeHTML.replace(pattern, '<span class="highlight">$1</span>');
		//Fix any intermediary tags by closing and reopening the span tags
		nodeHTML = nodeHTML.replace(/(<span class="highlight">[^<>]*)((<[^>]+>)+)([^<>]*<\/span>)/,'$1</span>$2<span class="highlight">$4');

		searchText.innerHTML = nodeHTML;
	}

	function removeHighlights() {
		var highlightNodes = document.getElementsByClassName('highlight');
		for (var i = highlightNodes.length - 1; i >= 0; i--) {
			var currentNode = highlightNodes[i];
			var nodeParent = currentNode.parentNode;
			nodeParent.replaceChild(currentNode.firstChild, currentNode);
			nodeParent.normalize();
		}
	}

}());