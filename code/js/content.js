;(function() {
  console.log('CONTENT SCRIPT WORKS!');
  var $ = require('./libs/jquery');
  // here we use SHARED message handlers, so all the contexts support the same
  // commands. but this is NOT typical messaging system usage, since you usually
  // want each context to handle different commands. for this you don't need
  // handlers factory as used below. simply create individual `handlers` object
  // for each context and pass it to msg.init() call. in case you don't need the
  // context to support any commands, but want the context to cooperate with the
  // rest of the extension via messaging system (you want to know when new
  // instance of given context is created / destroyed, or you want to be able to
  // issue command requests from this context), you may simply omit the
  // `handlers` parameter for good when invoking msg.init()
  var handlers = require('./modules/handlers').create('ct');
  //require('./modules/msg').init('ct', handlers);
  console.log('jQuery version:', $().jquery);
})();


const listOfRegex = [
	/you won['’]?t believe/i,
	/what happens next/i, 
];

function checkIfClickbait(title)
{
	len = title.length
	//check if title is long/short enough to be clickbait
	if (len > 80 || len < 15) return 0;

	return listOfRegex.some(function(clickbait, thisObj)
	{
		//Error Handling
		if (typeof clickbait != "function") throw new TypeError();

		if (clickbait.test(title))
		{
			//console.log(thisObj, title);
			return 1;
		}
	});
}


function changeClickbait(item)
{
	if(checkIfClickbait(item.textContent) == 1){
		item.style.textDecoration = 'line-through';
		// attempted to change the link to which clickbait leads to.
		item.setAttribute('href', 'about:blank'); //currently not working for facebook.
		item.removeAttribute('onclick')
		item.removeAttribute('onmouseover')
	}
}

function recurseClickbaitLinks(item) {
	// Check all links for Clickbait titles
	items = item.getElementsByTagName('a');
	//use spread operator and pass each of the items through clickbait checker
	[...items].forEach(changeClickbait);
}


recurseClickbaitLinks(document.body);
initObserver();
