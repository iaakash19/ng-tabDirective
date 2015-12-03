// console.clear();
var app = angular.module('customTabs', []);

app.directive('ngTab', ngTab);
app.controller('ngTabController', ngTabController);

app.directive('tab', tab); 


// Directive
function ngTab() {
  var ngTabDef = { 
    restrict: 'E',
    scope:{},  
    templateUrl: 'tabset.html',
    transclude: true,
    bindToController: true,
    controller: 'ngTabController as tabWrap',
    link: function(scope, el, attrs) {
      
    } 
  };
  
  return ngTabDef;
}

function tab() {
  var tabDef = {
    restrict: 'E',
    templateUrl: 'tabContent.html',
    transclude: true,
    require:'^ngTab',
    scope: {
      heading: '@',
      isActive: '@active'
    },
    link: function(scope, el, attrs, ngTabController) {
      scope.active = (scope.isActive == 'true');
      ngTabController.addTab(scope);
    }  
  };
  
  return tabDef;
}

// Controllers
function ngTabController() {
  var self = this;
  self.tabs = [];
  
  self.addTab = addTab;
  self.select = select;
  
  function addTab(newTab) {
    self.tabs.push(newTab);
    console.log(newTab); 
  }
  
  function select(selectedTab) {
    angular.forEach(self.tabs, function(tab){
      if( tab.active && tab!== selectedTab ) {
        tab.active = false;
      }
    })
    selectedTab.active = true;
    
  }
}


