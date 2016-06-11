/* global Service */

require(['knockout','ojs/ojcore', 'jquery',
  'knockout.punches','ojs/ojknockout',
  'ojs/ojmodule',
  'ojs/ojselectcombobox', 'ojs/ojlistview', 'ojs/ojarraytabledatasource',
  'Service', 'comment-sorter'
], function(ko, oj, $) {
    'use strict';
	ko.punches.enableAll();
	
	
	
    function DemoViewModel() {
		
	}
    $(document).ready(function () {
			ko.applyBindings(new DemoViewModel());
		}
    );
});


requirejs.config({
  // Path mappings for the logical module names
  paths: {
    'knockout': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
    'knockout.punches': 'https://cdn.jsdelivr.net/knockout.punches/0.5.1/knockout.punches.min',
	'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
    'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui',
    'jqueryui-amd': 'https://cdn.rawgit.com/jquery/jquery-ui/1-11-stable/ui',
    'promise': 'https://cdn.rawgit.com/components/es6-promise/c95149ffaa2e8162601c57d4282362eac84f929b/promise.min',
    'hammerjs': 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.4/hammer.min',
    'ojdnd': 'https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
    'ojs': 'https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/oj/min',
    'ojL10n': 'https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/oj/ojL10n',
    'ojtranslations': 'https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/oj/resources',
    'text': 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
    'signals': 'https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min'
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jqueryui-amd': {
      exports: '$',
      deps: ['jquery']
    },
    'jquery': {
      exports: ['jQuery', '$']
    }
  }
});

var config = {
  apiKey: "AIzaSyA3Wlw_8U4ueX3yuauALX5ysKGRTY68CpQ",
  authDomain: "controlspace-github-io-92200.firebaseapp.com",
  databaseURL: "https://controlspace-github-io-92200.firebaseio.com",
  storageBucket: "controlspace-github-io-92200.appspot.com"
};

var debug = false;
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