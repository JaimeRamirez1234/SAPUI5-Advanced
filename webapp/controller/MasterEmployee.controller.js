
sap.ui.define([
    // "sap/ui/core/mvc/Controller",
    "alfa02/alfa02/controller/Base.controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 * @param {typeof sap.ui.model.Filter} Filter
 * @param {typeof sap.ui.model.FilterOperator} FilterOperator
 */

function (Base, Filter, FilterOperator) {
    "use strict";

    function onInit(){

        this._bus = sap.ui.getCore().getEventBus();

    };

    function onFilter (){
        //var oJSON = this.getView().getModel().getData();
        var oJSONCoutries = this.getView().getModel("jsonCountries").getData();
        var filters = [];
        if(oJSONCoutries.EmployeeId !== ""){
            filters.push(new Filter("EmployeeID", FilterOperator.EQ,oJSONCoutries.EmployeeId));
        }
        if(oJSONCoutries.CountryKey !== ""){
            filters.push(new Filter("Country", FilterOperator.EQ,oJSONCoutries.CountryKey));
        }
        var oList = this.getView().byId("tableEmployee");
        var oBinding = oList.getBinding("items");
        oBinding.filter(filters);
    };


    function onClearFilter(){
        var oModel = this.getView().getModel("jsonCountries");
        oModel.setProperty("/EmployeeId", "");
        oModel.setProperty("/CountryKey", "");
    };


    function showPostalCode(oEvent){
        var itemPress = oEvent.getSource();
        var oContext = itemPress.getBindingContext("jsonEmployees");
        var objectContext = oContext.getObject();
        sap.m.MessageToast.show(objectContext.PostalCode);

    };

    function onShowCity(){
        var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
        oJSONModelConfig.setProperty("/visibleCity", true);
        oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
        oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
    };

    function onHideCity(){
        var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
        oJSONModelConfig.setProperty("/visibleCity", false);
        oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
        oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
    };

    function showOrders(oEvent){

        // get selected controller
        var iconPressed = oEvent.getSource();

        //Context from the model
        var oContext = iconPressed.getBindingContext("odataNorthwind");

        if(!this._oDialogOrders){
            this._oDialogOrders = sap.ui.xmlfragment("alfa02.alfa02.fragment.DialogOrders", this);
            this.getView().addDependent(this._oDialogOrders);
        };

        //Dialog Binding to teh context to have access to the data of selected item

        this._oDialogOrders.bindElement("odataNorthwind>" + oContext.getPath());
        this._oDialogOrders.open();

    };

    function onCloseOrders(){
        this._oDialogOrders.close();
    };

    function showEmployee(oEvent){ 
        var path = oEvent.getSource().getBindingContext("odataNorthwind").getPath();
        this._bus.publish("flexible", "showEmployee", path);
    };

    // function toOrderDetails(oEvent){

    //     var orderID = oEvent.getSource().getBindingContext("odataNorthwind").getObject().OrderID;
    //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    //     oRouter.navTo("RouteOrderDetails", {
    //         OrderID : orderID
    //     });
    // };

    var Main = Base.extend("alfa02.alfa02.controller.MasterEmployee", {});

    // Main.prototype.onValidate = function(){
    //         var inputEmployee = this.byId("inputEmployee");
    //         var valueEmployee = inputEmployee.getValue();
            
    //         if(valueEmployee.length === 6){
    //             //inputEmployee.setDescription("OK");
    //             this.getView().byId("labelCountry").setVisible(true);
    //             this.getView().byId("slCountry").setVisible(true);
    //         }else{
    //             //inputEmployee.setDescription("Not OK");
    //             this.getView().byId("labelCountry").setVisible(false);
    //             this.getView().byId("slCountry").setVisible(false);
    //         }
    //     };

    Main.prototype.onInit = onInit;
    Main.prototype.onFilter = onFilter;
    Main.prototype.onClearFilter = onClearFilter;
    Main.prototype.showPostalCode = showPostalCode;
    Main.prototype.onShowCity = onShowCity;
    Main.prototype.onHideCity = onHideCity;
    Main.prototype.showOrders = showOrders;
    Main.prototype.onCloseOrders = onCloseOrders;
    Main.prototype.showEmployee = showEmployee;
    // Main.prototype.toOrderDetails = toOrderDetails;
    return Main;
});
