sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("sap.ajScannerBQ.controller.Scan3SF", {
			onInit: function() {
			var loStorageData = JSON.parse(localStorage.getItem('dataDownloadSF'));
			var model = new sap.ui.model.json.JSONModel(loStorageData);
			this.getView().setModel(model, "SfConfirmation");
		},
		onScanSFConfirmPress: function(oEvent) {
		 var arr = ["SalesOrderNo", "CustomerNo", "CustomerName", "SalesOrderQuantity"]
                this.PressScannerBtn("dataDownloadSF", "SfConfirmation", arr).bind(this);
		},
		DeleteSingleScanRowPress: function(oEvent) {
		 this.DeleteSingleRowPress(oEvent,"dataDownloadSF","SfConfirmation").bind(this);
		},
		DeletedataScanAllPress: function() {
		 this.DeletedAllTableData("dataDownloadSF","SfConfirmation").bind(this);
		},
		exportScanPress: function() {
		 var Arr=["SalesOrderNo","CustomerNo","CustomerName","SalesOrderQuantity"];
             this.exportPress("SfConfirmation",Arr).bind(this);
		},
		handleListDataPackingPress: function() {
				this.handleListF4InputDialogPress("sap.ajScannerBQ.Dialogs.listSfConfirmation",null).bind(this);
		
		},
		SelectedItemDialogSfConfrimationPress: function(oEvent) {
		 var indexPack = parseInt(oEvent.getSource().getBindingContext("SfConfirmationM").getPath().split("/Sales/").join(""));
                var getmodel = this.getView().getModel("SfConfirmationM").getData();
                var dataPack = getmodel.Sales[indexPack];
                console.log(dataPack);
                var modelPack = new JSONModel(dataPack);
                this.getView().setModel(modelPack, "SalesListSF");
                oEvent.getSource().getParent().getParent().close();
		},
		TableLinkPress:function(oEvent){
			var PressItem = oEvent.getSource().getBindingContext("SfConfirmation");
			var indexPack = parseInt(oEvent.getSource().getBindingContext("SfConfirmation").getPath().split("/").join(""));
			var getmodel = this.getView().getModel("SfConfirmation").getData();
				var dataPack = getmodel[indexPack];
				var Item={
					IO:dataPack.SalesOrderNo,
					IT:dataPack.CustomerNo,
					IF:dataPack.CustomerName,
					ITH:dataPack.SalesOrderQuantity,
				}
			var header = {
				FH: "Material Order No",
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