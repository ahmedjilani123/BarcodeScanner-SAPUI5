sap.ui.define([
	"./BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sap.ajScannerBQ.controller.View1", {
		onInit: function() {

		},
		NavigationPress: function(oEvent) {
			var headers = this.getView().getModel("Header");
			var getData = oEvent.getParameter("listItem").getProperty("text");
			var Router = this.getOwnerComponent().getRouter();
			if (getData === "Delivery and PGI") {
				Router.navTo("Delivery_PGI");
					headers.setProperty("/Title","Delivery and PGI");
			} else if (getData === "SFG Confirmation") {
				Router.navTo("SFG_Confirmation");
					headers.setProperty("/Title","SFG Confirmation");
			} else if (getData === "FG Confirmation"){
				Router.navTo("FG_Confirmation");
					headers.setProperty("/Title","FG Confirmation");
			}else{
					Router.navTo("Stock");
						headers.setProperty("/Title","Stock Transfer");
			}
		}
	});
});