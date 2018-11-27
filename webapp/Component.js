sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/pabz/VerificaDomanda/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.pabz.VerificaDomanda.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			//this.setModel(new sap.ui.model.json.JSONModel());

			// get WF task data
			var startupParameters = this.getComponentData().startupParameters;
			var taskModel = startupParameters.taskModel;
			var taskData = taskModel.getData();
			var taskId = taskData.InstanceID;

			// initialize WF model
			var contextModel = new sap.ui.model.json.JSONModel("/bpmworkflowruntime/rest/v1/task-instances/" + taskId + "/context");
			contextModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this.setModel(contextModel);

			//add actions
			startupParameters.inboxAPI.addAction({
				action: "Confirm",
				label: "Conferma"
			}, function (button) {
				this._completeTask(taskId);
			}, this);

		},

		_completeTask: function (taskId) {
			var token = this._fetchToken();
			var oModel = this.getModel();
			this._verify(oModel);

			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
				method: "PATCH",
				contentType: "application/json",
				async: false,
				data: JSON.stringify({
					status: "COMPLETED",
					context: oModel.getData()
				}),
				headers: {
					"X-CSRF-Token": token
				}
			});
			this._refreshTask(taskId);
		},

		_fetchToken: function () {
			var token;
			$.ajax({
				url: "/bpmworkflowruntime/rest/v1/xsrf-token",
				method: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function (result, xhr, data) {
					token = data.getResponseHeader("X-CSRF-Token");
				}
			});
			return token;
		},

		_refreshTask: function (taskId) {
			this.getComponentData().startupParameters.inboxAPI.updateTask("NA", taskId);
		},

		_verify: function (oModel) {
			if (
				oModel.getProperty("/surname_vrf") === false ||
				oModel.getProperty("/owner_vrf") === false ||
				oModel.getProperty("/piva_vrf") === false ||
				oModel.getProperty("/fiscalCode_vrf") === false ||
				oModel.getProperty("/sector_vrf") === false ||
				oModel.getProperty("/street_vrf") === false ||
				oModel.getProperty("/city_vrf") === false ||
				oModel.getProperty("/postCode_vrf") === false ||
				oModel.getProperty("/state_vrf") === false ||
				oModel.getProperty("/telephone_vrf") === false ||
				oModel.getProperty("/mail_vrf") === false ||
				oModel.getProperty("/pec_vrf") === false ||
				oModel.getProperty("/iban_vrf") === false ||
				oModel.getProperty("/language_vrf") === false ||
				oModel.getProperty("/company_vrf") === false ||
				oModel.getProperty("/claim_vrf") === false ||
				oModel.getProperty("/claimScore30_vrf") === false ||
				oModel.getProperty("/claimScore15_vrf") === false ||
				oModel.getProperty("/claimScore10_vrf") === false ||
				oModel.getProperty("/totalA_vrf") === false ||
				oModel.getProperty("/totalB_vrf") === false ||
				oModel.getProperty("/tableC_1_vrf") === false ||
				oModel.getProperty("/tableC_2_vrf") === false ||
				oModel.getProperty("/tableC_3_vrf") === false ||
				oModel.getProperty("/tableC_4_vrf") === false ||
				oModel.getProperty("/claim_yes_no_vrf") === false) {
				oModel.setProperty("/supplDocum", true)
			}
		}

	});
});