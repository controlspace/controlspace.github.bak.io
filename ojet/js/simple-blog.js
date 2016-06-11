/* global Service */

require(['knockout',
  'ojs/ojcore',
  'jquery',
  'ojs/ojknockout','knockout.punches',
  'Service', 'comment-sorter', 'ojs/ojselectcombobox', 'ojs/ojlistview', ,'ojs/ojarraytabledatasource'
], function(ko, oj, $) {
    'use strict';

	function SimpleBlogViewModel() {
		var self = this;
		ko.punches.enableAll();
		self.loaded = ko.observable(false);
		self.searchHandler = function searchHandler(context, valueParam) {
			if(valueParam.option === 'value') {
				var filteredArticles = Service.findArticlesByQuery(valueParam.value[0]);

				filteredArticles
					.then(function(val) {
						self.filteredItems(val);
					})
					.catch(function(reason){
						self.filteredItems([]);
						console.log(reason);
					});
			}
		};

		var articles = Service.getAllArticles();

		self.filteredItems = ko.observableArray([]);

		self.dataSource = new oj.ArrayTableDataSource(self.filteredItems, {idAttribute: "id"});

		self.selectedItem = ko.observable();
		self.loaded = ko.observable(false);
		
		self.commentsorter = CommentSorter();

		articles
			.then(function(val) {
				self.filteredItems(val);
				if(val.length > 0)
				{
					var match = self.commentsorter.sortComments(val[0]);
					self.selectedItem(match);
				}
				self.loaded(true);
			})
			.catch(function(reason){
				self.filteredItems([]);
				console.log(reason);
			});

		self.articleSelected = function articleSelected(event, ui) {
			if(ui.option === 'selection') {
				var match = ko.utils.arrayFirst(this.filteredItems(), function(item) {
					return ui.value[0] === item.id;
				});
				if(match) {
					match = self.commentsorter.sortComments(match);
					this.selectedItem(match);
				}
			}
		};
	};

  	ko.applyBindings(new SimpleBlogViewModel());
});


requirejs.config({
  // Path mappings for the logical module names
  paths: {
    'knockout': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
    'knockout.punches': 'https://cdn.jsdelivr.net/knockout.punches/0.5.1/knockout.punches.min',
	'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
    "jqueryui": "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui",
    "jqueryui-amd": "https://cdn.rawgit.com/jquery/jquery-ui/1-11-stable/ui",
    "promise": "https://cdn.rawgit.com/components/es6-promise/c95149ffaa2e8162601c57d4282362eac84f929b/promise.min",
    "hammerjs": "https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.4/hammer.min",
    "ojdnd": "https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0.min",
    "ojs": "https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/oj/min",
    "ojL10n": "https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/oj/ojL10n",
    "ojtranslations": "https://cdn.rawgit.com/oracle/oraclejet/master/dist/js/libs/oj/resources",
    "text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
    "signals": "https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min"
  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jqueryui-amd': {
      exports: "$",
      deps: ['jquery']
    },
    'jquery': {
      exports: ['jQuery', '$']
    }
  }
});
