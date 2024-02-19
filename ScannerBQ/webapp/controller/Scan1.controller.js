sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ndc/BarcodeScanner"
], function(BaseController, JSONModel, BarcodeScanner) {
	"use strict";

	return BaseController.extend("sap.ajScannerBQ.controller.Scan1", {
		onInit: function() {
			var loStorageData = JSON.parse(localStorage.getItem('dataDownloadPack'));
			var model = new sap.ui.model.json.JSONModel(loStorageData);
			this.getView().setModel(model, "Packing");
		},
		onScanPackingPress: function(oEvent) {
			var localModel = "dataDownloadPack";
			var modelName = "Packing";
			var arr = ["MaterialCode", "MaterialDescription", "UnitofMeasure", "Quantity"];
			this.PressScannerBtn(localModel, modelName, arr).bind(this);
		},
		DeleteSingleScanRowPress: function(oEvent) {
			this.DeleteSingleRowPress(oEvent, "dataDownloadPack", "Packing").bind(this);
		},
		DeletedataScanAllPress: function() {
			this.DeletedAllTableData("dataDownloadPack", "Packing").bind(this);
		},
		exportScanPress: function() {
			var Arr = ["MaterialCode", "MaterialDescription", "UnitofMeasure", "Quantity"];
			this.exportPress("Packing", Arr).bind(this);
		},
		handleListDataPackingPress: function() {

			this.getView().byId("GroupRadioBtnID").setSelectedIndex(-1);
				var fetchDatatoHeader = {};
				var OModel = new JSONModel(fetchDatatoHeader);
				this.getView().setModel(OModel, "MaterialTable");
			this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.listPacking").bind(this);

		},
		SelectedItemDialogPackingPress: function(oEvent) {

			var indexPack = parseInt(oEvent.getSource().getBindingContext("PackingAndPrint").getPath().split("/SFG/").join(""));
			var getmodel = this.getView().getModel("PackingAndPrint").getData();
			var dataPack = getmodel.SFG[indexPack];
			console.log(dataPack);
			var countItem = dataPack.header.Body.length;
			dataPack.header.TotalScan = countItem;
			var modelPack = new JSONModel(dataPack);
			this.getView().setModel(modelPack, "MaterialList");
			oEvent.getSource().getParent().getParent().close();
		},
		TableListItemPress: function(oEvent) {
			debugger;
			var PressItem = oEvent.getSource().getBindingContext("MaterialTable");
			var indexPack = parseInt(oEvent.getSource().getBindingContext("MaterialTable").getPath().split("/").join(""));
			var getmodel = this.getView().getModel("MaterialTable").getData();
			var dataPack = getmodel[indexPack];
			var Item = {
				IO: dataPack.MaterialCode,
				IT: dataPack.MaterialDes,
				ITH: dataPack.Quantity,
				IF: dataPack.UnitOfMeasure
			}
			var header = {
				FH: "Material Code",
				SH: "Material Description",
				TH: "Unit of Measure",
				FTH: "Quantity"
			}
			var combine = {...Item,
				...header
			};
			var dta = []

			dta.push(combine);
			this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.TableListItem", dta).bind(this);
		},
		HandleHeaderScanPress: function() {
			debugger;
			var that = this;
			BarcodeScanner.scan(
				function(mResult) {
					if (!mResult.cancelled) {
						var getScannerCode = mResult.text;
						var fetchDatatoHeader = that.getView().getModel("PackingAndPrint").getData().SFG;
						var count = 0;
						fetchDatatoHeader.forEach(function(value, i) {
							var filterData = value.header.ConfirmNum;
							if (filterData === getScannerCode) {
									that.getView().byId("GroupRadioBtnID").setSelectedIndex(-1);
								var dataPack = fetchDatatoHeader[i];
								var countItem = dataPack.header.Body.length;
								dataPack.header.TotalScan = countItem;
								var modelPack = new JSONModel(dataPack);
								that.getView().setModel(modelPack, "MaterialList");
								count = 1;
									var fetchData = {};
				
				var OModel = new JSONModel(fetchData);
				that.getView().setModel(OModel, "MaterialTable");
							}
						})
						if (count == 0) {
							sap.m.MessageToast.show("Do not match any Data !");
						}
					}
				},
				function(Error) {
					alert("Scanning failed: " + Error);
				}
			);
		},
		HandleSelectionChangeSFG: function(oEvent) {
			if (oEvent.getParameter("selectedIndex") === 0) {
				$.sap.SFGFlag = "S"; // send flag to backend
				var fetchDatatoHeader = this.getView().getModel("MaterialList").getData().header.Body;
				var OModel = new JSONModel(fetchDatatoHeader);
				this.getView().setModel(OModel, "MaterialTable");
				this.getView().byId("ScannerBtnMainPress").setEnabled(false);
			} else {
				$.sap.SFGFlag = "R"; // send flag for Rejection
				var fetchDatatoHeader = {};
				this.getView().byId("ScannerBtnMainPress").setEnabled(true);
				var OModel = new JSONModel(fetchDatatoHeader);
				this.getView().setModel(OModel, "MaterialTable");
			}

		},
		ConfirmBtnSFGPress:function(){
			sap.m.MessageToast.show("Press Confirm Btn")
		}
	});

});