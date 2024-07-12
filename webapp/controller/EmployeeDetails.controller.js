// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "alfa02/alfa02/model/formatter"
],
function(Controller, formatter) {
    "use strict";
    
    function onInit(){

        };
    function onCreateIncidence(){
        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment("alfa02.alfa02.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index : index + 1 });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    };
    function onDeleteIncidence(oEvent){

        var tableIncidence = this.getView().byId("tableIncidence");
        var rowIncidence = oEvent.getSource().getParent().getParent();
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var contextObject = rowIncidence.getBindingContext("incidenceModel");

        odata.splice(contextObject.index - 1, 1);
        for(var i in odata){
            odata[i].index = parseInt(i) + 1;

        }

        incidenceModel.refresh();

        tableIncidence.removeContent(rowIncidence);

        for(var j in tableIncidence.getContent()){
            tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
        }

    };

    var EmployeeDetails = Controller.extend("alfa02.alfa02.controller.EmployeeDetails", {});

    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    return EmployeeDetails;

});