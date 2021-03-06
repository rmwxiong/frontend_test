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

	//By assuming data comes from a JSON source, the clientside software can remain unchanged and cached.
	//This static variable, for instance, could be the result of some XmlHttpRequest.
	//In addition, it is also easier to manipulate and compare data 
	//when it does not need to be first parsed out of HTML.
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
	}];
	

	//////////////////
	///////APP////////
	//////////////////
	var transformPrefix = identifyTransformPrefix();
	var currentSlideIndex = 0;

	var rotator = document.getElementById('rotator');
	var slide1 = document.getElementById('port-slide');
	var slide2 = document.getElementById('starboard-slide');
	slide1.XOffset = 0;
	slide2.XOffset = 0;
	identifySlideNodes(slide1);
	identifySlideNodes(slide2);
	
	var mainSlide = slide2;
	var hiddenSlide = slide1;

	var rotatorWidth = rotator.offsetWidth;

	window.setInterval(nextSlide, 3000);

	//Quick loop to test which version of transform is available
	function identifyTransformPrefix() {
		//Note: Animating transforms is much faster than animating top/left attributes.
		//See http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
		var prefixes = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
		var testDiv = document.createElement('div');
		for (var i = 0; i < prefixes.length; i++) {
			if (testDiv.style[prefixes[i]] !== undefined) {
				return prefixes[i];
			}
		}
	}

	//One time function to set properties on the DOM objects for the slide elements
	function identifySlideNodes(element) {
		var nodes = element.childNodes;
		for(var i = 0; i < nodes.length; i++) {
			switch (nodes[i].nodeName.toUpperCase()) {
				case 'IMG':
					element.imgNode = nodes[i];
					break;
				case 'H4':
					element.titleNode = nodes[i];
					break;
				case 'DIV':
					element.captionNode = nodes[i];
					break;
			}
		}
	}

	//Main 3s loop to show the next slide
	function nextSlide() {
		setSlideData(hiddenSlide, SLIDES[(currentSlideIndex + 1) % SLIDES.length]);
		setXTransform(hiddenSlide, -rotatorWidth);
		setXTransform(hiddenSlide.titleNode, -hiddenSlide.titleNode.offsetWidth);
		setYTransform(hiddenSlide.captionNode, hiddenSlide.captionNode.offsetHeight);
		currentSlideIndex += 1;
		hiddenSlide.style.zIndex = 1;
		mainSlide.style.zIndex = 0;
		//Only execute animation if transform style exists
		if (transformPrefix) window.requestAnimationFrame(renderFrame);
	}

	//Helper function to set the "transform: translateX()" style of an element
	function setXTransform(element, offset) {
		if (!transformPrefix) return;
		element.style[transformPrefix] = 'translateX(' + offset + 'px)';
		element.XOffset = offset;
	}

	function setYTransform(element, offset) {
		if (!transformPrefix) return;
		element.style[transformPrefix] = 'translateY(' + offset + 'px)';
		element.YOffset = offset;
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
		var newOffset = 0;
		if (hiddenSlide.XOffset < 0 || hiddenSlide.titleNode.XOffset < 0 || hiddenSlide.captionNode.YOffset > 0) {
			newOffset = -rotatorWidth * easeOut(currentTime - startTime, 1000);
			setXTransform(hiddenSlide, Math.min(newOffset, 0));

			newOffset = -hiddenSlide.titleNode.offsetWidth * easeOut(currentTime - startTime - 500, 1500);
			setXTransform(hiddenSlide.titleNode, Math.min(newOffset, 0));

			newOffset = hiddenSlide.captionNode.offsetHeight * easeOut(currentTime - startTime - 800, 1300);
			setYTransform(hiddenSlide.captionNode, Math.max(newOffset, 0));
			window.requestAnimationFrame(renderFrame);
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