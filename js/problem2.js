//Tested in Chrome, Firefox, IE 8+
//Support for animations in IE 9+

//Note that requestAnimationFrame is used instead of CSS3 transitions for broader browser support
//and tighter control of the animations themselves.

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
	'Cheesecake jelly beans ice cream lollipop sweet pastry. Chupa chups dessert cheesecake sesame snaps. Cookie ice cream candy canes pastry cake muffin. Icing chocolate sweet gummi bears powder oat cake oat cake lemon drops. Cheesecake jelly beans ice cream lollipop sweet pastry. Chupa chups dessert cheesecake sesame snaps. Cookie ice cream candy canes pastry cake muffin. Icing chocolate sweet gummi bears powder oat cake oat cake lemon drops.'];
	//Size of padding on content for height measurements
	var CONTENT_PADDING = 50;

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
	var contentContainer = tabCopyContainer.parentElement;
	var queuedCopy = '';

	//Delegate click events to the container
	if (container.addEventListener) {
		container.addEventListener('click', handleContainerClick);
	} else {
		container.attachEvent('onclick', handleContainerClick);
	}

	function handleContainerClick(evt) {
		var element = evt.target || event.srcElement;

		//Check if a tab was clicked
		if (element.className.indexOf('tab') > -1 && selectedTab != element) {
			//Move the selected class to the clicked tab
			selectedTab.className = 'tab';
			element.className += ' selected';
			queuedCopy = element.tabContent;
			selectedTab = element;
			tabCopyContainer.style.opacity = 1;
			if (hasOpacity) {
				//Begin animation by fading out old text
				window.requestAnimationFrame(fadeOutContent);
			} else {
				tabCopyContainer.innerHTML = queuedCopy;
			}
		}
	}

	//////////////////
	///RENDER LOGIC///
	//////////////////
	var startTime = 0;
	var oldContentHeight;
	var newContentHeight;

	function fadeOutContent(currentTime) {
		if (startTime === 0) startTime = currentTime;
		if (tabCopyContainer.style.opacity > 0) {
			tabCopyContainer.style.opacity = Math.max(1 - (currentTime - startTime) / 100, 0);
			requestAnimationFrame(fadeOutContent);
		} else {
			startTime = 0;
			//Set the text content to the associated tab
			computeContainerHeights();
			tabCopyContainer.innerHTML = queuedCopy;
			requestAnimationFrame(resizeContentContainer);
		}
	}

	function computeContainerHeights() {
		oldContentHeight = contentContainer.offsetHeight;

		var originalHTML = contentContainer.innerHTML;

		contentContainer.style.height = '';
		tabCopyContainer.innerHTML = queuedCopy;
		newContentHeight = contentContainer.offsetHeight;

		tabCopyContainer.innerHTML = originalHTML;
		contentContainer.style.height = (oldContentHeight - CONTENT_PADDING) + 'px';
	}

	function resizeContentContainer(currentTime) {
		if (startTime === 0) startTime = currentTime;
		if (tabCopyContainer.style.opacity < 1 || contentContainer.style.height != (newContentHeight - CONTENT_PADDING) + 'px') {
			var heightIncrement = (newContentHeight - oldContentHeight) * Math.min(easeInOut(currentTime - startTime, 300), 1);
			contentContainer.style.height = (heightIncrement + oldContentHeight - CONTENT_PADDING) + 'px';

			tabCopyContainer.style.opacity = Math.min((currentTime - startTime) / 500, 1);
			requestAnimationFrame(resizeContentContainer);
		} else {
			startTime = 0;
		}
	}

	//Simple math function for y = x ^ 2 / (2 * x^2 - 2x + 1)
	function easeInOut(timeProgress, duration) {
		var xp = timeProgress / duration;
		if (xp > 1) return 1;
		return xp * xp / (2 * xp * xp - 2 * xp + 1);
	}

}());