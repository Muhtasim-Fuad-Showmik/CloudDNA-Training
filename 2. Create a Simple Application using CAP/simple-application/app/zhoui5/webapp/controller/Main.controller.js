sap.ui.define([
    "ai/clouddna/training00/zhoui5/controller/BaseController",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox) {
        "use strict";

        return BaseController.extend("ai.clouddna.training00.zhoui5.controller.Main", {
            onInit: function () {
                this.setContentDensity();

                this.getRouter().getRoute("Main").attachPatternMatched(this._onPatternMatched, this);
            },

            onCreatePressed: function () {
                let oRouter = this.getRouter();
                oRouter.navTo("CreateCustomer", null, false);
            },            

            onDeleteButtonPressed: function (oEvent) {
                this._delete(oEvent.getSource());
            },

            onDeletePressed: function (oEvent) {
                this._delete(oEvent.getParameters().listItem);
            },

            _delete: function (oListItem) {
                let oModel = this.getModel();
                let sPath = oListItem.getBindingContext().getPath();

                MessageBox.warning(this.getLocalizedText("sureToDeleteQuestion"), {
                    title: this.getLocalizedText("sureToDeleteTitle"),
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function(oAction) {
                        if(MessageBox.Action.OK === oAction) {
                            oModel.delete(sPath).then(function () {
                                MessageBox.success(this.getLocalizedText("dialog.delete.success"));
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
                let sPath = oEvent.getSource().getBindingContext().getPath();

                this.getRouter().navTo("Customer", {
                    path: sPath.split("/")[1]
                });
            }
        });
    });
