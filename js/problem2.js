//Simple RequestAnimationFrame polyfill
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                              (function( callback ){window.setTimeout(function(){callback(Date.now());}, 1000 / 60);});


(function() {

	//////////////////
	///DECLARATIONS///
	//////////////////

	var TAB_CONTENT = ['Gingerbread muffin gummies gingerbread macaroon. Lollipop candy applicake toffee faworki. Bear claw topping jelly toffee toffee powder tiramisu candy chupa chups. Chupa chups dragee icing applicake chupa chups dessert. Croissant jelly faworki marzipan tootsie roll marshmallow. Marshmallow toffee sweet roll fruitcake.',
	'Chocolate faworki croissant brownie halvah macaroon gummi bears wypas. Chupa chups icing gummies pudding dessert carrot cake. Cupcake jelly beans sweet roll icing ice cream apple pie tootsie roll gummi bears marzipan. Brownie gummies chupa chups pie. Cupcake jujubes topping.',
	'Cheesecake jelly beans ice cream lollipop sweet pastry. Chupa chups dessert cheesecake sesame snaps. Cookie ice cream candy canes pastry cake muffin. Icing chocolate sweet gummi bears powder oat cake oat cake lemon drops.'];

	//////////////////
	///////APP////////
	//////////////////
	var container = document.getElementById('container');
	var tabs = document.querySelectorAll('.tab');
	var hasOpacity = (document.createElement('div').style.opacity !== undefined);
	//Run a loop to assocate tab DOM objects with their text content
	for (var i = 0; i < tabs.length; i++) tabs[i].tabContent = TAB_CONTENT[i];
	var selectedTab = document.querySelectorAll('.selected')[0];
	var tabCopyContainer = document.getElementById('tab-copy');
	var queuedCopy = '';

	//Delegate click events to the container
	container.addEventListener('click', handleContainerClick);

	function handleContainerClick(evt) {
		var element = evt.target;

		//Check if a tab was clicked
		if (element.className.indexOf('tab') > -1) {
			//Move the selected class to the clicked tab
			selectedTab.className = 'tab';
			element.className += ' selected';
			queuedCopy = element.tabContent;
			selectedTab = element;
			tabCopyContainer.style.opacity = 1;
			//Fade out the old text
			window.requestAnimationFrame(fadeOutContent);
		}
	}

	//////////////////
	///RENDER LOGIC///
	//////////////////
	var startTime = 0;

	function fadeOutContent(currentTime) {
		if (startTime === 0) startTime = currentTime;
		if (tabCopyContainer.style.opacity > 0) {
			tabCopyContainer.style.opacity = Math.max(1 - (currentTime - startTime) / 200, 0);
			requestAnimationFrame(fadeOutContent);
		} else {
			startTime = 0;
			//Set the text content to the associated tab
			tabCopyContainer.innerHTML = queuedCopy;
			requestAnimationFrame(fadeInContent);
		}
	}

	function fadeInContent(currentTime) {
		if (startTime === 0) startTime = currentTime;
		if (tabCopyContainer.style.opacity < 1) {
			tabCopyContainer.style.opacity = Math.min((currentTime - startTime) / 500, 1);
			requestAnimationFrame(fadeInContent);
		} else {
			startTime = 0;
		}
	}

}());