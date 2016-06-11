/**
 * panelWithIcons module
 */
define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
	/**
	 * The view model for the main content view template
	 */
	function panelWithIconsContentViewModel() {
		var self = this;
		self.val = "Hello Punch";
		self.collapsed = ko.observable(false);

		self.collapse = function collapse(event) {
		  $("#collapsableContent").slideToggle();
		  self.collapsed(!self.collapsed());
		};
		
		self.close = function collapse(event) {
		  $("#panel").remove();
		};
	}
	
	return panelWithIconsContentViewModel;
});

