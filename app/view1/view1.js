'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]).
controller("View1Ctrl", ['$scope', function($scope) {
    $scope.delete = function(data) {
        data.nodes = [];
    };
    $scope.add = function(data) {
    		if(data.id in $scope.originalDataDict){
        	//console.log("found");
          //console.log($scope.originalDataDict[data.id]);
          var nodes = $scope.getNodes($scope.originalDataDict[data.id]);
          for(var n in nodes){
          	data.nodes.push(nodes[n]);
          }
        }else{
        	console.log("not found");
        }
    };
    $scope.click = function(data){
    	if(data.nodes.length != 0){
      	$scope.delete(data);
      }else{
      	$scope.add(data);
      }
    };
    $scope.originalDataDict = {
    
    };
    $scope.originalData = [
        {
            id:1,
            name: "Friends",
            type: "Group",
            contacts: [
                {id:2, name: "Udi", type: "Contact"},
                {id:3, name: "Tommy", type: "Contact"},
                {
                    id:6,
                    name: "Old Friends",
                    type: "Group",
                    contacts: [
                        {id:7, name: "Itay", type: "Contact"},
                    ]
                },
            ]
        },
        {
            id:4,
            name: "Family",
            type: "Group",
            contacts: [
                {id:5, name: "Roni", type: "Contact"},
            ]
        },
        {id: 8, name: "Ori", type: "Contact"},
    ];
    $scope.parseDictItem = function(item){
    	//console.log("parseDictItem");
     console.log("parseDictItem item = " +item);
      if(item.type=="Group"){
    		$scope.originalDataDict[item.id] = item.contacts;
        for(var c in item.contacts)
        {
      		$scope.parseDictItem(item.contacts[c]); 			              
        }
       
      }
    };
    $scope.getNodes = function(root){
    	//console.log("getNodes");
    	//console.log(item);
    	var col = [];
      for(var itemKey in root){
      	var item = root[itemKey];
        var i1 = {name:item.name,id:item.id, type:item.type, nodes:[]};
      	col.push(i1);
      }
      console.log("getNodes col = " + col);
    	return col;
     
    };
    
    $scope.parseRoot = function(){
      //console.log("parse root started");
    	var col =  $scope.getNodes($scope.originalData);      
      for(var itemKey in $scope.originalData){
      	var item = $scope.originalData[itemKey];
        $scope.parseDictItem(item);
      }
      console.log("parseRoot col = " + col);
      return col;
    };
    $scope.tree = $scope.parseRoot();
}]);