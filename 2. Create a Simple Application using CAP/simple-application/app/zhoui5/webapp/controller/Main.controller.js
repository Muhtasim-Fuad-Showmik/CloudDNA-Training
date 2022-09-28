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
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Main").attachPatternMatched(this._onPatternMatched, this);
            },

            onCreatePressed: function () {
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CreateCustomer", null, false);
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
                            oModel.delete(sPath).then(function () {
                                MessageBox.success(oResourceBundle.getText("dialog.delete.success"));
                            }.bind(this), function(oError) {
                                MessageBox.success(oError.message);
                            });
                        }
                    }
                });
            },
            
            _onPatternMatched: function () {
                this.byId("main_table").getBinding("items").refresh();
            },

            onListItemPressed: function (oEvent) {
                // let oItem, oCtx;
                // oItem = oEvent.getSource();
                // oCtx = oItem.getBindingContext();
                // this.getOwnerComponent().getRouter().navTo("Customer", {
                //     customerId: oCtx.getProperty("CustomerId")
                // });

                let sPath = oEvent.getSource().getBindingContext().getPath();
                let oRouter = this.getOwnerComponent().getRouter();

                oRouter.navTo("Customer", {
                    path: sPath.split("/")[1]
                });
            }
        });
    });
