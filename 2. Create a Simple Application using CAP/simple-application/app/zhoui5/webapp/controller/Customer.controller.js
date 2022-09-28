sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "ai/clouddna/training00/zhoui5/controller/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment, History, Formatter) {
        "use strict";

        return Controller.extend("ai.clouddna.training00.zhoui5.controller.Customer", {
            formatter: Formatter,
            
            _fragmentList: {},
            bCreate: false,

            onInit: function () {
                let oEditModel = new JSONModel({
                    editMode: false
                });

                let oCustomerModel = new JSONModel({
                    CustomerId: 0,
                    FirstName: "",
                    LastName: "",
                    AcademicTitle: "",
                    Gender: "",
                    Email: "",
                    Phone: "",
                    Website: ""
                });

                this.getView().setModel(oEditModel, "editModel");
                this.getView().setModel(oCustomerModel, "customerModel");

                this._showCustomerFragment("DisplayCustomer");

                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Customer").attachPatternMatched(this._onPatternMatched, this);
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
                let oModel = this.getView().getModel();
                oModel.bindList("/Customers").resetChanges().then(() => {
                    if(this.bCreate) {
                        this.onNavBack();
                    } else {
                        this._toggleEdit(false);
                    }
                });
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
                this.bCreate = false;

                let sPath = oEvent.getParameters().arguments.path;
                this.sCustomerPath = "/" + sPath;
                console.log(this.sCustomerPath);
                this.getView().bindElement(this.sCustomerPath);

                this.getView().getModel("editModel").setProperty("/editMode", false);
                this._showCustomerFragment("DisplayCustomer");
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