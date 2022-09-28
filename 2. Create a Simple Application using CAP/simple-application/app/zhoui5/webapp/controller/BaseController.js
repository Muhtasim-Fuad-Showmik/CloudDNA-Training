sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/base/Log"
], function(
	Controller, History, Log
) {
	"use strict";

	return Controller.extend("ai.clouddna.training00.zhoui5.controller.BaseController", {
        _sContentDensityClass: "",

        _getContentDensity: function () {
            if(!this._sContentDensityClass) {
                if(sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCozy";
                } else {
                    this._sContentDensityClass = "sapUiSizeCompact";
                }
            }

            return this._sContentDensityClass;
        },

        setContentDensity: function () {
            this.getView().addStyleClass(this._getContentDensity());
        },

        getModel: function (sName) {
            return this.getView().getModel(sName);
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getRouter: function () {
            return this.getOwnerComponent().getRouter();
        },

        getLocalizedText: function (sId, aParams) {
            let oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            return oBundle.getText(sId, aParams);
        },

        logDebug: function (sMessage) {
            this.logOutput(sMessage, "DEBUG");
        },

        logError: function (sMessage) {
            this.logOutput(sMessage, "ERROR");
        },

        logFatal: function (sMessage) {
            this.logOutput(sMessage, "FATAL");
        },

        logInfo: function (sMessage) {
            this.logOutput(sMessage, "INFO");
        },

        logTrace: function (sMessage) {
            this.logOutput(sMessage, "TRACE");
        },

        logWarning: function (sMessage) {
            this.logOutput(sMessage, "WARNING");
        },

        logOutput: function (sMessage, logType) {
            let oLogger = Log.getLogger(this.getView().getControllerName());
            oLogger.error("" + logType + " - " + sMessage);
        },

        onNavBack: function () {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if(sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Main", {}, true);
            }
        }
	});
});