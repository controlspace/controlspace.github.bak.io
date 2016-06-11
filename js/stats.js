var config = {
  apiKey: "AIzaSyA3Wlw_8U4ueX3yuauALX5ysKGRTY68CpQ",
  authDomain: "controlspace-github-io-92200.firebaseapp.com",
  databaseURL: "https://controlspace-github-io-92200.firebaseio.com",
  storageBucket: "controlspace-github-io-92200.appspot.com"
};
var debug = true;
try{ 
	
	if(!app)
		var app = firebase.initializeApp(config);
	firebase.auth().signInAnonymously().catch(function(error) {
		log(error);
	  });
	
	var url = document.location.pathname;
	var host = document.location.hostname;
	url = url.replace(".html","");	
	url = url.replace(".","");
	url = url.replace("controlspacegithub/","");
	if(host.indexOf("localhost") !== -1)
		url = "localhost/" + url;
	else
		url = "remotehost/" + url;
	if(debug === true || host.indexOf("localhost") === -1) {
		app.database().ref(url+"/count").once('value').then(function(snapshot) {
			var count = snapshot.val();
			app.database().ref(url+"/count").set(1+count);
		});
	}
		
} catch(err) {
	log(err);
}

log: function log(info) {
	if(debug === true)
		console.log(info);
};