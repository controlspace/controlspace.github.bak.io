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
		
		self.collapse = function collapse(event) {
		  $("#collapsableContent").slideToggle();
		};
		
		self.close = function collapse(event) {
		  $("#panel").remove();
		};
	}
	
	return panelWithIconsContentViewModel;
});

