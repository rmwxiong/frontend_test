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
	var tabs = document.getElementsByClassName('tab');
	for (var i = 0; i < tabs.length; i++) tabs[i].tabContent = TAB_CONTENT[i];
	var selectedTab = document.getElementsByClassName('selected')[0];
	var tabContentContainer = document.getElementById('tab-content');

	//Delegate click events to the container
	container.addEventListener('click', handleContainerClick);

	function handleContainerClick(evt) {
		var element = evt.target;

		//Check if a tab was clicked
		if (element.className.indexOf('tab') > -1) {
			//Move the selected class to the clicked tab
			selectedTab.className = 'tab';
			element.className += ' selected';
			//Set the text content to the associated tab
			tabContentContainer.innerHTML = element.tabContent;
			selectedTab = element;
		}
	}


}());