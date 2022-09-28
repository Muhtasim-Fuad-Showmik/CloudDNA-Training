sap.ui.define([
    "ai/clouddna/training00/zhoui5/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
	"sap/ui/commons/Message",
    "ai/clouddna/training00/zhoui5/controller/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, JSONModel, Fragment, History, Message, Formatter) {
        "use strict";

        return BaseController.extend("ai.clouddna.training00.zhoui5.controller.CreateCustomer", {
            formatter: Formatter,
            _fragmentList: {},

            onInit: function () {
                this.setContentDensity();
            },

            getFormData: function () {
                let FirstName = this.byId("edit_input_firstname").getValue();
                let LastName = this.byId("edit_input_lastname").getValue();
                let AcademicTitle = this.byId("edit_input_title").getValue();
                let GenderSelect = this.byId("edit_select_gender");
                let SelectedGender = GenderSelect.getSelectedItem();
                let Gender = SelectedGender ? SelectedGender.getKey() : "0";
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

                return customerData;
            },

            clearFormData: function () {
                let FirstName = this.byId("edit_input_firstname").setValue();
                let LastName = this.byId("edit_input_lastname").setValue();
                let AcademicTitle = this.byId("edit_input_title").setValue();
                let GenderSelect = this.byId("edit_select_gender");
                let SelectedGender = GenderSelect.setSelectedItem(0);
                let Email = this.byId("edit_input_email").setValue();
                let Phone = this.byId("edit_input_phone").setValue();
                let Website = this.byId("edit_input_website").setValue();
            },

            onCancelPressed: function () {
                this.getModel().bindList("/Customers").resetChanges().then(() => {
                    this.clearFormData();
                    this.onNavBack();
                });
            },

            onSavePressed: function() {
                let sSuccessText = this.getLocalizedText("dialog.create.success");

                let customerData = this.getFormData();

                const oNewCustomerContext = this.getModel().bindList("/Customer");
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
                    this.getRouter().navTo("Main");
                }
            }
        });
    });
