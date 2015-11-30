chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.create({
		url: chrome.extension.getUrl("helloWorld.html")
	});
});