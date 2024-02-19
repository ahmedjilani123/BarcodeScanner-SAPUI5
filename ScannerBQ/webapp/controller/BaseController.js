sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ndc/BarcodeScanner",
	"sap/m/MessageToast",
	"sap/m/MessageBox"

], function(Controller, BarcodeScanner, MessageToast, MessageBox) {
	"use strict";
	var localdata = [];

	return Controller.extend("sap.ajScannerBQ.controller.BaseController", {

		BackToHomePress: function() {
				var headers = this.getView().getModel("Header");
			var that=this;
			headers.setProperty("/Title","Barcode Scanner");
					var Router = that.getOwnerComponent().getRouter();
						Router.navTo("View1");
			// MessageBox.show("!", {
			// 	title: "If you want to back !",
			// 	actions: [MessageBox.Action.YES, MessageBox.Action.NO],
			// 	emphasizedAction: MessageBox.Action.YES,
			// 	onClose: function(oAction) {
			// 		if (oAction === "YES") {
			// 			headers.setProperty("/Title","Barcode Scanner");
			// 			var Router = that.getOwnerComponent().getRouter();
			// 			Router.navTo("View1");
			// 		} else {
			// 			MessageToast.show("Thanks");
			// 		}
			// 	}
			// })

		},
		PressScannerBtn: function(localModel, modelName, arr) {
		
			var local = localModel;
			var omodel = modelName;
			var namearray = arr;
			var that = this;
			BarcodeScanner.scan(
				function(mResult) {
					if (!mResult.cancelled) {
						var invoice = mResult.text;
						
						if (invoice.includes("\\n")) {
							// var replacedata =invoice.replace(/[\\n#$%^&*@!_-]/g," ")
							// var fieldN = replacedata.split(" ");
							// for(var i=0;i<fieldN.length;i+=2){
							//     console.log(i);
							// }
							// var SalesOrderNo = fieldN[0];
							// var CustomerNo = fieldN[2];
							// var CustomerName = fieldN[4];
							// var SalesOrderQuantity = fieldN[6];

							// var Values=[SalesOrderNo,CustomerNo,CustomerName,SalesOrderQuantity]
							// var data1={};
							// Array.forEach((key,i)=> {
							//     data1[key]=Values[i]

							// });
						} else {
							var fieldN = invoice.split(" ");
							var Values = [];
							for (var i = 0; i < fieldN.length; i++) {
								Values.push(fieldN[i]);
							}
							var data1 = {};
							for (var j = 0; j < namearray.length; j++) {
								data1[namearray[j]] = Values[j];
							}
						}
						if (JSON.parse(localStorage.getItem(local)) !== null) {
							var loStorageData = JSON.parse(localStorage.getItem(local));
							loStorageData.push(data1);
							localStorage.setItem(local, JSON.stringify(loStorageData));
							that.getView().getModel(omodel).refresh();
							that.getView().getModel(omodel).setData(loStorageData);
						} else {
							localdata.push(data1);
							localStorage.setItem(local, JSON.stringify(localdata));
							that.getView().getModel(omodel).refresh();
							that.getView().getModel(omodel).setData(localdata);
						}
						that.getView().getModel(omodel).refresh();
						sap.m.MessageToast.show(namearray[0] + ":" + Values[0] + "\n" + namearray[1] + ":" + Values[1] + "\n" + namearray[2] + ":" +
							Values[2] + "\n" + namearray[3] + ":" + Values[3]);

					}
				},
				function(Error) {
					alert("Scanning failed: " + Error);
				}
			);
		},
		DeleteSingleRowPress: function(oEvent, local, model) {
			var getIndex = parseInt(oEvent.getSource().getBindingContext(model).getPath().split("/").join(""));
			var dataD = JSON.parse(localStorage.getItem(local));
			dataD.splice(getIndex, 1);
			localStorage.setItem(local, JSON.stringify(dataD));
			this.getView().getModel(model).setData(dataD)
			this.getView().getModel(model).refresh();
		},
		DeletedAllTableData: function(local, model) {
			localStorage.removeItem(local);
			localdata = [];
			this.getView().getModel(model).setData(localdata)
			this.getView().getModel(model).refresh();
		},

		exportPress: function(model, Arr) {
			var data = this.getView().getModel(model).getData();
			if (data.length !== undefined) {
				var Arrays = Arr;
				var newData = [];
				for (var i = 0; i < data.length; i++) {
					var DataArray = [];
					for (var j = 0; j < Arrays.length; j++) {
						var SA = data[i][Arrays[j]];
						DataArray.push(SA)
					}
					newData.push(DataArray);
				}
				var wbook = XLSX.utils.book_new();
				var wsheet = XLSX.utils.aoa_to_sheet([Arrays]);

				XLSX.utils.sheet_add_aoa(wsheet, newData, {
					origin: -1
				});
				XLSX.utils.book_append_sheet(wbook, wsheet, 'Sheet1');
				XLSX.writeFile(wbook, 'exported_data.xlsx');
			} else {

				MessageToast.show("Sorry!,Data is not available in the Table");

			}

			// var aCols, oRowBinding, oSettings, oSheet, oTable;

			// if (!this._oTable) {
			//     this._oTable = this.getView().byId('exportTable');
			// }

			// oTable = this._oTable;
			// oRowBinding = oTable.getBinding('items');
			// aCols = this.createColumnConfig(Arr);

			// oSettings = {
			//     workbook: {
			//         columns: aCols,
			//         hierarchyLevel: 'Level'
			//     },
			//     dataSource: oRowBinding,
			//     fileName: 'Table export sample.xlsx',
			//     worker: false
			// };

			// oSheet = new Spreadsheet(oSettings);
			// oSheet.build().finally(function() {
			//     oSheet.destroy();
			// });

		},
		CancelDialogListPress: function(oEvent) {
			oEvent.getSource().getParent().close();
		},
		handleListF4InputDialogPress: function(url,data) {
			
			 this.getView().getModel("AllItemPress").setData(data);
			this.uDialog=undefined;
			if (!this.uDialog) {
				this.uDialog = sap.ui.xmlfragment(url, this);
				this.getView().addDependent(this.uDialog);
			}
			this.uDialog.open()
		}

	});

});