sap.ui.define([
	"sap/ui/core/UIComponent",
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("ZADDRESS_BOOK.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		createContent: function() {
			var View = sap.ui.view({
				id: "ZADDRESS_BOOK",
				viewName: "addressBook.ViewAB",
				type: sap.ui.core.mvc.ViewType.js
			})			
			return View;
		}
	});
});