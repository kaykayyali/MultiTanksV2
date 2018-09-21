$(document).ready(function() {
	Client.init();
	if (!navigator.userAgent.indexOf('mobile') && !location.hash) {
		setTimeout(function() {
			window.scrollTo(100, 10); 
		}, 1000);
	}
});