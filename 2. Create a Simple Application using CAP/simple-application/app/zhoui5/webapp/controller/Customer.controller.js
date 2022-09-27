sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment, History) {
        "use strict";

        return Controller.extend("ai.clouddna.training00.zhoui5.controller.Customer", {
            _fragmentList: {},

            onInit: function () {
                let oEditModel = new JSONModel({
                    editMode: false
                });

                this.getView().setModel(oEditModel, "editModel");

                this._showCustomerFragment("DisplayCustomer");

                let oRouter = this.getOwnerComponent().getRouter().getRoute("Customer")
                    .attachPatternMatched(this._onPatternMatched, this);
            },

            _showCustomerFragment: function (sFragmentName) {
                let oPage = this.getView().byId("page");

                oPage.removeAllContent();

                if(this._fragmentList[sFragmentName]) {
                    oPage.insertContent(this._fragmentList[sFragmentName]);
                } else {
                    Fragment.load({
                        id: this.getView().createId(sFragmentName),
                        name: "ai.clouddna.training00.zhoui5.view.fragment." + sFragmentName,
                        controller: this
                    }).then(function(oFragment) {
                        this._fragmentList[sFragmentName] = oFragment;
                        oPage.insertContent(this._fragmentList[sFragmentName]);
                    }.bind(this));
                }
            },

            _toggleEdit: function (bEditMode) {
                let oEditModel = this.getView().getModel("editModel");

                oEditModel.setProperty("/editMode", bEditMode);

                this._showCustomerFragment(bEditMode ? "ChangeCustomer" : "DisplayCustomer");
            },

            onCancelPressed: function () {
                this._toggleEdit(false);
            },

            onEditPressed: function () {
                this._toggleEdit(true);
            },

            onSavePressed: function() {
                let oModel = this.getView().getModel();
                let oData = oModel.getData();
                MessageBox.success(JSON.stringify(oData));

                this._toggleEdit(false);
            },

            onNavBack: function () {
                let oHistory = History.getInstance();
                let sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    let oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Main");
                }
            },

            _onBindingChange: function (oEvent) {
                // if(!this.getView().getBindingContext()) {
                //     this.getRouter().getTargets().display("notFound");
                // }
            },

            _onPatternMatched: function(oEvent){
                // let oArgs, oView;
                // oArgs = oEvent.getParameter("arguments");
                // oView = this.getView();

                // oView.bindElement({
                //     path: "/Customer(" + oArgs.customerId + ")",
                //     events: {
                //         change: this._onBindingChange.bind(this),
                //         dataRequested: function (oEvent) {
                //             oView.setBusy(true);
                //         },
                //         dataReceieved: function (oEvent) {
                //             oView.setBusy(false);
                //         }
                //     }
                // });
                console.log("CHecking pattern matched");
                let sPath = oEvent.getParameters().arguments.path;
                this.sCustomerPath = "/" + sPath;
                this.getView().bindElement(this.sCustomerPath);
                // this.getView().getElementBinding().refresh(true);
            },

            genderFormatter: function (sKey) {
                let oView = this.getView();
                let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();
                let sText = oResourceBundle.getText(sKey);
                return sText;
            }
        });
    });
