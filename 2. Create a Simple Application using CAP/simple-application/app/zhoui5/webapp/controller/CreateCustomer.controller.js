sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
	"sap/ui/commons/Message"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	MessageBox,
	JSONModel,
	Fragment,
	History,
	Message) {
        "use strict";

        return Controller.extend("ai.clouddna.training00.zhoui5.controller.CreateCustomer", {
            _fragmentList: {},

            onInit: function () {
            },

            getFormData: function () {

            },

            clearFormData: function () {
                let FirstName = this.byId("edit_input_firstname").setValue();
                let LastName = this.byId("edit_input_lastname").setValue();
                let AcademicTitle = this.byId("edit_input_title").setValue();
                let GenderSelect = this.byId("edit_select_gender");
                let SelectedGender = GenderSelect.setSelectedItem(1);
                let Email = this.byId("edit_input_email").setValue();
                let Phone = this.byId("edit_input_phone").setValue();
                let Website = this.byId("edit_input_website").setValue();
            },

            onCancelPressed: function () {
                let oModel = this.getView().getModel();
                oModel.bindList("/Customers").resetChanges().then(() => {
                    this.clearFormData();
                    this.onNavBack();
                });
            },

            onSavePressed: function() {
                let oModel = this.getView().getModel();
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                let sSuccessText = oResourceBundle.getText("dialog.create.success");

                let FirstName = this.byId("edit_input_firstname").getValue();
                let LastName = this.byId("edit_input_lastname").getValue();
                let AcademicTitle = this.byId("edit_input_title").getValue();
                let GenderSelect = this.byId("edit_select_gender");
                let SelectedGender = GenderSelect.getSelectedItem();
                let Gender = SelectedGender ? SelectedGender.getText() : "";
                let Email = this.byId("edit_input_email").getValue();
                let Phone = this.byId("edit_input_phone").getValue();
                let Website = this.byId("edit_input_website").getValue();

                let customerData = {
                    FirstName: FirstName,
                    LastName: LastName,
                    AcademicTitle: AcademicTitle,
                    Gender: Gender,
                    Email: Email,
                    Phone: Phone,
                    Website: Website
                };

                const oNewCustomerContext = this.getView().getModel().bindList("/Customer");
                let oNewCustomerContextCreated = oNewCustomerContext.create(customerData, true);
                oNewCustomerContextCreated.created().then(() => {
                    MessageBox.success(sSuccessText, {
                        onClose: () => {
                            this.clearFormData();
                            this.onNavBack();
                        }
                    });
                }, (oError) => {
                    MessageBox.error(oError.message);
                });
                
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

            genderFormatter: function (sKey) {
                let oView = this.getView();
                let oI18nModel = oView.getModel("i18n");
                let oResourceBundle = oI18nModel.getResourceBundle();
                let sText = oResourceBundle.getText(sKey);
                return sText;
            }
        });
    });
