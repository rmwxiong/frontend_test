window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

(function() {

	//////////////////
	///DECLARATIONS///
	//////////////////

	var SLIDES = 
	[{
		imageUrl: '../img/kat_1.jpg',
		title: 'Katarina',
		caption: 'Fruitcake bonbon donut jelly-o brownie biscuit marzipan pie.'
	},
	{
		imageUrl: '../img/kat_2.jpg',
		title: 'Red Card Katarina',
		caption: 'Cheesecake marzipan cupcake biscuit candy canes pudding.'
	},
	{
		imageUrl: '../img/kat_3.jpg',
		title: 'Kitty Cat Katarina',
		caption: 'Applicake topping halvah lemon drops wypas cotton candy.'
	},
	{
		imageUrl: '../img/kat_4.jpg',
		title: 'High Command Katarina',
		caption: 'Oat cake macaroon souffle cupcake chupa chups chocolate bar bear claw dragee lemon drops.'
	},];
	

	//////////////////
	///////APP////////
	//////////////////
	var currentSlideIndex = 0;

	var rotator = document.getElementById('rotator');
	var slide1 = document.getElementById('slide1');
	var slide2 = document.getElementById('slide2');
	slide1.XOffset = 0;
	slide2.XOffset = 0;
	identifySlideNodes(slide1);
	identifySlideNodes(slide2);
	
	var mainSlide = slide2;
	var hiddenSlide = slide1;

	var rotatorWidth = rotator.offsetWidth;

	window.setInterval(nextSlide, 3000);

	//One time function to set properties on the DOM objects for the slide elements
	function identifySlideNodes(element) {
		var nodes = element.childNodes;
		for(i = 0; i < nodes.length; i++) {
			switch (nodes[i].nodeName.toUpperCase()) {
				case 'IMG':
					element.imgNode = nodes[i];
					break;
				case 'H4':
					element.titleNode = nodes[i];
					break;
				case 'P':
					element.captionNode = nodes[i];
					break;
			}
		}
	}

	//Main 3s loop to show the next slide
	function nextSlide() {
		setXTransform(hiddenSlide, -rotatorWidth);
		setSlideData(hiddenSlide, SLIDES[(currentSlideIndex + 1) % SLIDES.length]);
		currentSlideIndex += 1;
		hiddenSlide.style.zIndex = 1;
		mainSlide.style.zIndex = 0;
		requestAnimationFrame(renderFrame);
	}

	//Helper function to set the "transform: translateX()" style of an element
	function setXTransform(element, offset) {
		var transformString = "translateX(" + offset + "px)";
		element.style.webkitTransform = transformString;
		element.style.transform = transformString;
		element.XOffset = offset;
	}

	//Sets the nodes of a '.slide' element to the data provided from SLIDES
	function setSlideData(element, slideData) {
		element.imgNode.src = slideData.imageUrl;
		element.titleNode.innerHTML = slideData.title;
		element.captionNode.innerHTML = slideData.caption;
	}

	//////////////////
	///RENDER LOGIC///
	//////////////////
	var startTime = 0;

	//Main callback for requestAnimationFrame. Moves the slide into frame based on time
	function renderFrame(currentTime) {
		if (startTime === 0) startTime = currentTime;

		if (hiddenSlide.XOffset < 0) {
			var newOffset = -rotatorWidth * easeOut(currentTime - startTime, 1000);

			setXTransform(hiddenSlide, Math.min(newOffset, 0));
			requestAnimationFrame(renderFrame);
		} else {
			startTime = 0;
			var temp = mainSlide;
			mainSlide = hiddenSlide;
			hiddenSlide = temp;
		}
	}

	//Simple math function for y = -(x-1)^3
	function easeOut(timeProgress, duration) {
		var progress = timeProgress / duration - 1;
		return -progress * progress * progress;
	}
	
}());