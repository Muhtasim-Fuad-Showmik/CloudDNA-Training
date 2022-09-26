sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	MessageBox) {
        "use strict";

        return Controller.extend("ai.clouddna.training00.zhoui5.controller.Main", {
            onInit: function () {

            },

            onDeleteButtonPressed: function (oEvent) {
                this._delete(oEvent.getSource());
            },

            onDeletePressed: function (oEvent) {
                this._delete(oEvent.getParameters().listItem);
            },

            _delete: function (oListItem) {
                let oModel = this.getView().getModel();
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                let sPath = oListItem.getBindingContext().getPath();

                MessageBox.warning(oResourceBundle.getText("sureToDeleteQuestion"), {
                    title: oResourceBundle.getText("sureToDeleteTitle"),
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function(oAction) {
                        if(MessageBox.Action.OK === oAction) {
                            oModel.delete(sPath);
                        }
                    }
                });
            }
        });
    });