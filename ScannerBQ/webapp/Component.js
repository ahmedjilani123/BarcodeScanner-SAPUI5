sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ajScannerBQ/model/models",
	"sap/ui/core/routing/HashChanger",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, HashChanger, JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ajScannerBQ.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			var data = {
				"allItem":[{"IO":"ahmed","FH":"Name"}]

			};
			var omodel = new JSONModel(data);
			sap.ui.getCore().setModel(omodel, "PressItem");
			// var stop = false;
			//             var initial_timer = (1000 * 5);
			//             var timer = initial_timer;
			//             var logoutUrl = 'unlock.html?last_page_visited=' + window.location.pathname; // URL to logout page.
			//             function logOut() {
			//                 debugger;
			//                 alert("no user");
			//             }
			//             if (!stop) {
			//                 setInterval(function () {
			//                     timer -= 1000;
			//                     console.log("Timer:" + timer);
			//                     if (timer == 0 || timer < 0) {
			//                     	debugger;
			//                         logOut()
			//                         stop = true;
			//                     }
			//                 }, 1000);
			//             }
			//             $('body').bind('click dblclick keypress mousedown mouseenter mousemove mouseleave keyup keydown mouseover',
			//                 function (e) {
			//                     timer = initial_timer;
			//                 });

			HashChanger.getInstance().replaceHash("");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
		}
	});
});