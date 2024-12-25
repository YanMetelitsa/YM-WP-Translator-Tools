'use strict';

chrome.tabs.onUpdated.addListener( ( tabId, changeInfo, tab ) => {
	if ( 'complete' === changeInfo.status ) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files:  ['js/script.js']
		});
	}
});