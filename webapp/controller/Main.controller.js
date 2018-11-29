sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.pabz.VerificaDomanda.controller.Main", {

		onInit: function () {
			// set mock data
			var sPath = "model/mockData/document.json";
			//this.getView().setModel(new JSONModel(sPath), "uploadedDocument");
			this.getView().setModel(new JSONModel({
				"items": []
			}), "uploadedDocument");
		},

		onAfterRendering: function () {
			this._setSwitchPersValue(false);
			this._setSwitchStatValue(false);
			this._setSwitchInvValue(false);
		},

		onApproveAllPers: function (oEvent) {
			//setto tutti gli switch su on
			this._setSwitchPersValue(true);
		},

		onApproveAllStat: function (oEvent) {
			//setto tutti gli switch su on
			this._setSwitchStatValue(true);
		},

		onApproveAllInv: function (oEvent) {
			//setto tutti gli switch su on
			this._setSwitchInvValue(true);
		},

		_setSwitchPersValue: function (val) {
			var oModel = this.getView().getModel();
			oModel.setProperty("/surname_vrf", val);
			oModel.setProperty("/owner_vrf", val);
			oModel.setProperty("/piva_vrf", val);
			oModel.setProperty("/fiscalCode_vrf", val);
			oModel.setProperty("/sector_vrf", val);
			oModel.setProperty("/street_vrf", val);
			oModel.setProperty("/city_vrf", val);
			oModel.setProperty("/postCode_vrf", val);
			oModel.setProperty("/state_vrf", val);
			oModel.setProperty("/telephone_vrf", val);
			oModel.setProperty("/mail_vrf", val);
			oModel.setProperty("/pec_vrf", val);
			oModel.setProperty("/iban_vrf", val);
			oModel.setProperty("/language_vrf", val);
		},

		_setSwitchStatValue: function (val) {
			var oModel = this.getView().getModel();
			oModel.setProperty("/company_vrf", val);
			oModel.setProperty("/claim_vrf", val);
			oModel.setProperty("/claimScore30_vrf", val);
			oModel.setProperty("/claimScore15_vrf", val);
			oModel.setProperty("/claimScore10_vrf", val);
		},

		_setSwitchInvValue: function (val) {
			var oModel = this.getView().getModel();
			oModel.setProperty("/totalA_vrf", val);
			oModel.setProperty("/totalB_vrf", val);
			oModel.setProperty("/tableC_1_vrf", val);
			oModel.setProperty("/tableC_2_vrf", val);
			oModel.setProperty("/tableC_3_vrf", val);
			oModel.setProperty("/tableC_4_vrf", val);
			oModel.setProperty("/claim_yes_no_vrf", val);
		},

	});
});