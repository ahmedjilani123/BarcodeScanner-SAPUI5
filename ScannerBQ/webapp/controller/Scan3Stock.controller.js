sap.ui.define([
	"./BaseController",
		"sap/ui/model/json/JSONModel"
], function(BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("sap.ajScannerBQ.controller.Scan3Stock", {
		onInit: function() {
			var loStorageData = JSON.parse(localStorage.getItem('dataDownloadStock'));
			var model = new sap.ui.model.json.JSONModel(loStorageData);
			this.getView().setModel(model, "TStock");
		},
		onScanStockPress: function(oEvent) {
			var arr = ["SalesOrderNo", "CustomerNo", "CustomerName", "SalesOrderQuantity"]
			this.PressScannerBtn("dataDownloadStock", "TStock", arr).bind(this);
		},
		DeleteSingleStockPress: function(oEvent) {
			this.DeleteSingleRowPress(oEvent, "dataDownloadStock", "TStock").bind(this);
		},
		DeletedataScanAllStockPress: function() {
			this.DeletedAllTableData("dataDownloadStock", "TStock").bind(this);
		},
		exportScanStockPress: function() {
			var Arr = ["SalesOrderNo", "CustomerNo", "CustomerName", "SalesOrderQuantity"];
			this.exportPress("TStock", Arr).bind(this);
		},
		handleListDataStockPress: function() {
				this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.listStock",null).bind(this);
		},
		SelectedItemDialogStockPress: function(oEvent) {
			var indexPack = parseInt(oEvent.getSource().getBindingContext("StockfragmentData").getPath().split("/Sales/").join(""));
			var getmodel = this.getView().getModel("StockfragmentData").getData();
			var dataPack = getmodel.Sales[indexPack];
			console.log(dataPack);
			var modelPack = new JSONModel(dataPack);
			this.getView().setModel(modelPack, "InputStock");
			oEvent.getSource().getParent().getParent().close();
		},
		LinkTablePressStock:function(oEvent){
		
				var PressItem = oEvent.getSource().getBindingContext("TStock");
			var indexPack = parseInt(oEvent.getSource().getBindingContext("TStock").getPath().split("/").join(""));
			var getmodel = this.getView().getModel("TStock").getData();
				var dataPack = getmodel[indexPack];
				var Item={
					IO:dataPack.SalesOrderNo,
					IT:dataPack.CustomerName,
					IF:dataPack.CustomerNo,
					ITH:dataPack.SalesOrderQuantity,
				}
			var header = {
				FH: "Stock Order No",
				SH: "Stock No",
				TH: "Stock Name",
				FTH: "Quantity"
			}
				var combine={...Item,...header};
				var dta=[]
				
			dta.push(combine);
				this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.TableListItem",dta).bind(this);
		}

	});

});