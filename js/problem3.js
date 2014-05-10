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

	function performSearch(query) {
		innerHighlight(searchText, 'CROC');
		setTimeout(removeHighlights, 1000);
	}


	function innerHighlight(node, pat) {
		var skip = 0;
		if (node.nodeType == 3) {
			var pos = node.data.toUpperCase().indexOf(pat);
			if (pos >= 0) {
				var spanNode = document.createElement('span');
				spanNode.className = 'highlight';
				spanNode.style.backgroundColor = 'yellow';
				var textNodeToHighlight = node.splitText(pos);
				var remainingTextNode = textNodeToHighlight.splitText(pat.length);
				var highlightNodeClone = textNodeToHighlight.cloneNode(true);
				spanNode.appendChild(highlightNodeClone);
				textNodeToHighlight.parentNode.replaceChild(spanNode, textNodeToHighlight);
				skip = 1;
			}
		} else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
			for (var i = 0; i < node.childNodes.length; ++i) {
				i += innerHighlight(node.childNodes[i], pat);
			}
		}
		return skip;
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