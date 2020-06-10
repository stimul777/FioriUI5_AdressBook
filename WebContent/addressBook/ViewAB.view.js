sap.ui.jsview("addressBook.ViewAB", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf addressBook.ViewAB
	*/ 
	getControllerName : function() {
		return "addressBook.ViewAB";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf addressBook.ViewAB
	*/ 
	createContent : function(oController) {
		
		
		var oScrollContainer = new sap.m.ScrollContainer({
			horizontal: true,
			vertical: true,
			content: [oController.CreateTable(),]
		});
		var oPage = new sap.m.Page({
			title: "Адресная книга сотрудников",
			content: [
				oScrollContainer,
			]			
		});

 		return oPage;
 		
	}	

});