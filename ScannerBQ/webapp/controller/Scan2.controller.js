sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("sap.ajScannerBQ.controller.Scan2", {

		onInit: function() {
			var loStorageData = JSON.parse(localStorage.getItem('dataDownload'));
			var model = new sap.ui.model.json.JSONModel(loStorageData);
			this.getView().setModel(model, "Delivery");
		},
		onScanPackingPress: function(oEvent) {
		 var arr = ["SalesOrderNo", "CustomerNo", "CustomerName", "SalesOrderQuantity"]
                this.PressScannerBtn("dataDownload", "Delivery", arr).bind(this);
		},
		DeleteSingleScanRowPress: function(oEvent) {
		 this.DeleteSingleRowPress(oEvent,"dataDownload","Delivery").bind(this);
		},
		DeletedataScanAllPress: function() {
		 this.DeletedAllTableData("dataDownload","Delivery").bind(this);
		},
		exportScanPress: function() {
		 var Arr=["SalesOrderNo","CustomerNo","CustomerName","SalesOrderQuantity"];
             this.exportPress("Delivery",Arr).bind(this);
		},
		handleListDataPackingPress: function() {
				this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.listDelivery",null).bind(this);
		},
		SelectedItemDialogDeliveryPress: function(oEvent) {
		 var indexPack = parseInt(oEvent.getSource().getBindingContext("Deliveryandpgi").getPath().split("/Sales/").join(""));
                var getmodel = this.getView().getModel("Deliveryandpgi").getData();
                var dataPack = getmodel.Sales[indexPack];
                console.log(dataPack);
                var modelPack = new JSONModel(dataPack);
                this.getView().setModel(modelPack, "SalesList");
                oEvent.getSource().getParent().getParent().close();
		},
		TablePressItemLink:function(oEvent){
				var PressItem = oEvent.getSource().getBindingContext("Delivery");
			var indexPack = parseInt(oEvent.getSource().getBindingContext("Delivery").getPath().split("/").join(""));
			var getmodel = this.getView().getModel("Delivery").getData();
				var dataPack = getmodel[indexPack];
				var Item={
					IO:dataPack.SalesOrderNo,
					IT:dataPack.CustomerNo,
					IF:dataPack.CustomerName,
					ITH:dataPack.SalesOrderQuantity,
				}
			var header = {
				FH: "Sales Order No",
				SH: "Customer No",
				TH: "Customer Name",
				FTH: "Quantity"
			}
				var combine={...Item,...header};
				var dta=[]
				
			dta.push(combine);
				this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.TableListItem",dta).bind(this);
		}

	});

});