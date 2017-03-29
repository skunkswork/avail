import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.demand.onCreated(function newtransfer() {
  // counter starts at 0
  this.text = new ReactiveVar(0);
});

Template.demand.helpers({
    demandfrom: function(){
        return ["Tong", "Store", "Ditrbutor", "Brewery", "Farmer"]
    },
    demandto: function(){
        return ["Tong", "Store", "Ditrbutor", "Brewery", "Farmer"]
    }

});

Template.demand.events({
    "change #category-from": function (event, template) {
        var demandfrom = $(event.currentTarget).val();
        console.log("demand from : " + demandfrom);
        // additional code to do what you want with the category
    },
    "change #category-to": function (event, template) {
        var demandto = $(event.currentTarget).val();
        console.log("demand to : " + demandto);
        // additional code to do what you want with the category
    },
    
});

Template.body.events({
	  'submit .amount_transfer'(event) {
	    event.preventDefault();
	    // Get value from form element
	    const target = event.target;
	    const text = target.text.value;
	    console.log(text);
	    var today=new Date();
	    var hours= today.getHours().toString();
	    var minutes= today.getMinutes().toString();
	    var newmessage="\n Store-->Tong: "+ text + " @ "+ hours+ ":"+minutes;
	    console.log(newmessage);
	    document.getElementById("diagramwf").innerHTML = "";
	    var diagram = Diagram.parse("Tong->Store: 3 @ 10:03 \n Store->Distributor:3 @ 10:05\n Distributor->Brewery: 3 @ 10:25 \n Brewery->Farmer: 3 @ 10:28\n Farmer-->Brewery: 3 @ 11:07 \n Brewery-->Distributor: 3 @ 11:14 \n Distributor-->Store: 3 @ 11:40 \n"+newmessage);
	    diagram.drawSVG("diagramwf", {theme: 'simple'});

	   
	  },
});

