sap.ui.define([
    "ai/clouddna/training00/zhoui5/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "ai/clouddna/training00/zhoui5/controller/formatter/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, JSONModel, Fragment, History, Formatter) {
        "use strict";

        return BaseController.extend("ai.clouddna.training00.zhoui5.controller.Customer", {
            formatter: Formatter,
            _fragmentList: {},
            bCreate: false,

            onInit: function () {
                this.setContentDensity();

                let oEditModel = new JSONModel({
                    editMode: false
                });

                let oCustomerModel = new JSONModel({
                    CustomerId: 0,
                    FirstName: "First",
                    LastName: "Last",
                    AcademicTitle: "Title",
                    Gender: "0",
                    Email: "Email",
                    Phone: "Phone",
                    Website: "Website"
                });

                this.setModel(oEditModel, "editModel");
                this.setModel(oCustomerModel, "customerModel");

                this._showCustomerFragment("DisplayCustomer");

                this.getRouter().getRoute("Customer").attachPatternMatched(this._onPatternMatched, this);

            },

            getFormData: function (sPropertyName, sType="Input") {
                if(sPropertyName) {
                    let propertyValue = "";

                    if(sType === "Input") {
                        propertyValue = this.byId("ChangeCustomer--edit_input_" + sPropertyName).getValue();
                    }

                    if(sType === "Select") {
                        propertyValue = this.byId("ChangeCustomer--edit_select_" + sPropertyName).getSelectedItem().getKey();
                    }

                    return propertyValue;
                } else {
                    let FirstName = this.byId("ChangeCustomer--edit_input_firstname").getValue();
                    let LastName = this.byId("ChangeCustomer--edit_input_lastname").getValue();
                    let AcademicTitle = this.byId("ChangeCustomer--edit_input_title").getValue();
                    let GenderSelect = this.byId("ChangeCustomer--edit_select_gender");
                    let SelectedGender = GenderSelect.getSelectedItem();
                    let Gender = SelectedGender ? SelectedGender.getKey() : "0";
                    let Email = this.byId("ChangeCustomer--edit_input_email").getValue();
                    let Phone = this.byId("ChangeCustomer--edit_input_phone").getValue();
                    let Website = this.byId("ChangeCustomer--edit_input_website").getValue();
    
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
                }
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
                this.getModel("editModel").setProperty("/editMode", bEditMode);
                this._showCustomerFragment(bEditMode ? "ChangeCustomer" : "DisplayCustomer");
            },

            onCancelPressed: function () {
                this.getModel().bindList("/Customers").resetChanges().then(() => {
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
            },

            onFirstNameChanged: function () {
                this.updateJSONBoundForm("firstname");
            },

            onLastNameChanged: function () {
                this.updateJSONBoundForm("lastname");
            },

            onTitleChanged: function () {
                this.updateJSONBoundForm("title");
            },

            onGenderChanged: function () {
                this.updateJSONBoundForm("gender", "Select");
            },

            onEmailChanged: function () {
                this.updateJSONBoundForm("email");
            },

            onPhoneChanged: function () {
                this.updateJSONBoundForm("phone");
            },

            onWebsiteChanged: function () {
                this.updateJSONBoundForm("website");
            },

            onNavBack: function () {
                let oHistory = History.getInstance();
                let sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Main");
                }
            },

            updateJSONBoundForm: function (sFieldName, sType = "Input") {
                if (sType === "Input"){
                    let fieldValue = this.getFormData(sFieldName);
                    this.byId("ChangeCustomer--editjson_input_" + sFieldName).setValue(fieldValue);
                }

                if (sType === "Select") {
                    let fieldValue = this.getFormData(sFieldName, sType);
                    this.byId("ChangeCustomer--editjson_select_" + sFieldName).setSelectedKey(fieldValue);
                }
            },

            _onPatternMatched: function(oEvent){
                this.bCreate = false;

                let sPath = oEvent.getParameters().arguments.path;
                this.sCustomerPath = "/" + sPath;
                this.getView().bindElement(this.sCustomerPath);

                this.getModel("editModel").setProperty("/editMode", false);
                this._showCustomerFragment("DisplayCustomer");
            }
        });
    });