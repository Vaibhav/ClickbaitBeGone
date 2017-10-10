
const listOfRegex = [
	/you won['’]?t believe/i,
	/what happens next/i,
	/A Woman Had A/i,
	/^\d+ (\w+ )?(animals|pictures|lessons|movies|secrets|shows|stories|things|times|trailers|tumblr|tweets)/i,
	/^\d+ of the \w+est/i,
	/^can you/i,
	/^here['’]s (how|what)/i,
	/^this could/i,
	/all (he|she|they) did was/i,
	/all the best/i,
	/best comeback/i,
	/can['’]t handle/i,
	/can teach us about/i,
	/didn['’]t know what/i,
	/get rid of/i,
	/how one (man|woman)/i,
	/how \w+ are you/i,
	/may affect/i,
	/never realized/i,
	/(pictures|photos) of/i,
	/secret of/i,
	/signs you['’]?re/i,
	/somebody needs to/i,
	/things that will/i,
	/trump/i,
	/until you see/i,
	/you (need to|should) (know|watch)/i,
	/we bet you can/i,
	/we can (tell|guess) (what )?your/i,
	/we need to talk about/i,
	/what could possibly/i,
	/what happens/i,
	/what (he|she|they) found/i,
	/what I learned about/i,
	/what this/i,
	/what to expect/i,
	/when (he|she|they)/i,
	/when this (man|woman|baby|child|puppy|dog|kitten)/i,
	/when you read these/i,
	/who['’]d thougt/i,
	/why we really shouldn['’]?t/i,
	/with this one/i,
	/will never tell/i,
	/won['’]?t believe/i,
	/\s(celebrit|epic|fantastic|genius|heartbreaking|incredibl|powerful|shocking|teen|terribl|unusual|weirdly)/i,
	/[0-9]+ (tips|jokes|tricks|magic|secrets)/i,
	/[0-9]+ (people|kids|funniest|hot|sexiest|sexy|sex)/i,
	/[0-9]+ (awesome|must|excited|needed|amazing)? products/i,
	/[0-9]+ (of the|of|tweets)/i,
	/[0-9]+ pranks/i,
	/[0-9]+ (high|middle) school/i
];


function isClickbait( string ) {

	var len = string.length;
	//check if title is long/short enough to be clickbait
	if (len >= 100 || len < 16) return false;

	return listOfRegex.some( function ( clickbait, i ) {

		if ( clickbait.test( string ) ) {

			console.log( i, string );
			return true;

		}

	} );

}


function strikeIfClickbait( element ) {

	if ( isClickbait( element.textContent.trim() ) ) {

		element.style.textDecoration = 'line-through';
		element.setAttribute('href', 'about:blank');

	}

}

function strikeClickbaitLinks( element ) {

	// Check all links for Clickbait titles
	const items = element.getElementsByTagName('a');
	//use spread operator and pass each of the items through clickbait checker
	[...items].forEach(strikeIfClickbait);
	
}

function initObserver() {

	const observer = new MutationObserver( function ( mutations ) {

		mutations.forEach( function ( mutation ) {

			mutation.addedNodes.forEach( function ( node ) {

				if ( node.nodeType === Node.ELEMENT_NODE ) strikeClickbaitLinks( node );

			} );

		} );

	} );

	observer.observe( document.body, { childList: true, subtree: true } );

}

//Call methods to update page
strikeClickbaitLinks( document.body );
initObserver();
