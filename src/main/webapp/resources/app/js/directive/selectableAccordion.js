angular.module("c.selectableAccordion.tpls", ["template/accordion/selectable-accordion-group.html","template/accordion/selectable-accordion.html"]);

angular.module('c.selectableAccordion', ['ui.bootstrap.collapse', 'c.selectableAccordion.tpls'])

.constant('selectableAccordionConfig', {
  closeOthers: true
  /*activeClass: 'active',
  toggleEvent: 'click'*/
})

.controller('SelectableAccordionController', ['$scope', '$attrs', 'selectableAccordionConfig', function ($scope, $attrs, selectableAccordionConfig) {

  // This array keeps track of the accordion groups
  groups = this.groups = $scope.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : selectableAccordionConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(index, 1);
    }
  };
  
  
  this.select = function(selectedGroup) {
	  angular.forEach(groups, function(group) {
		  if (group.active && group !== selectedGroup) {
			  group.active = false;
			  group.onDeselect();
		  }
	  });
	  selectedGroup.active = true;
	  selectedGroup.onSelect();
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('selectableAccordion', function () {
  return {
    restrict:'EA',
    controller:'SelectableAccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/selectable-accordion.html'
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('selectableAccordionGroup', function() {
  return {
    require:'^selectableAccordion',         // We need this directive to be inside an accordion
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl: 'template/accordion/selectable-accordion-group.html',
    scope: {
      title: '@',
      expand: '@',               // Interpolate the expand attribute onto this scope
      isOpen: '=?',
      isDisabled: '=?',
      active: '=?',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
      					   //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      this.setExpand = function(element) {
        this.expand = element;
      };
      this.setTitle = function(element) {
    	  this.title = element;
      };
      
    },
    link: function(scope, element, attrs, selectableAccordionCtrl) {
    	selectableAccordionCtrl.addGroup(scope);
    	
    	scope.$watch('active', function(active) {
            if (active) {
            	selectableAccordionCtrl.select(scope);
            }
          });

      scope.$watch('isOpen', function(value) {
        if ( value ) {
        	selectableAccordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function() {
        if ( !scope.isDisabled ) {
          scope.isOpen = !scope.isOpen;
        }
      };
      
      scope.select = function() {
          if ( !scope.isDisabled ) {
        	  scope.active = true;
          }
      };
      
    }
  };
})

// Use selectable-accordion-expand below an accordion-group to provide a expand containing HTML
// <selectable-accordion-group>
//   <selectable-accordion-expand>Expand containing HTML - <img src="..."></selectable-accordion-expand>
// </selectable-accordion-group>
.directive('selectableAccordionExpand', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the expand
    template: '',       // In effect remove this element!
    replace: true,
    require: '^selectableAccordionGroup',
    link: function(scope, element, attr, selectableAccordionGroupCtrl, transclude) {
      // Pass the expand to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
    	selectableAccordionGroupCtrl.setExpand(transclude(scope, angular.noop));
    }
  };
})


.directive('selectableAccordionTitle', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the title
    template: '',       // In effect remove this element!
    replace: true,
    require: '^selectableAccordionGroup',
    link: function(scope, element, attr, selectableAccordionGroupCtrl, transclude) {
      // Pass the title to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
    	selectableAccordionGroupCtrl.setTitle(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the expand to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-expand" ><a ... selectable-accordion-transclude="expand">...</a></div>
//   ...
// </div>
.directive('selectableAccordionTranscludeExpand', function() {
  return {
    require: '^selectableAccordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.selectableAccordionTranscludeExpand]; }, function(expand) {
        if ( expand ) {
          element.html('');
          element.append(expand);
        }
      });
    }
  };
})

.directive('selectableAccordionTranscludeTitle', function() {
  return {
    require: '^selectableAccordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.selectableAccordionTranscludeTitle]; }, function(title) {
        if ( title ) {
          element.html('');
          element.append(title);
        }
      });
    }
  };
})

;


angular.module("template/accordion/selectable-accordion-group.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("template/accordion/selectable-accordion-group.html",
	    "<div class=\"c-selectable-accordion-group\">\n" +
	   
	    "    <li ng-class=\"{active: active}\" class=\"list-group-item\" ng-click=\"select()\">\n" +
	    
	    "      <h4 class=\"panel-title\">\n" +
	    "        <span tabindex=\"0\" selectable-accordion-transclude-title=\"title\">{{title}}</span>\n" +
	    "        <a href=\"#\" tabindex=\"0\" class=\"accordion-toggle pull-right\" ng-click=\"$event.preventDefault(); toggleOpen()\" selectable-accordion-transclude-expand=\"expand\"><span ng-class=\"{'text-muted': isDisabled}\">{{expand}}</span></a>\n" +
	    "      </h4>\n" +
	    
	    "    </li>\n" +
	   
	    "  <div class=\"panel-collapse collapse\" collapse=\"!isOpen\">\n" +
	    "	  <div class=\"panel-body\" ng-transclude></div>\n" +
	    "  </div>\n" +
	    "</div>\n" +
	    "");
	}]);

	angular.module("template/accordion/selectable-accordion.html", []).run(["$templateCache", function($templateCache) {
	  $templateCache.put("template/accordion/selectable-accordion.html",
		"<ul class=\"list-group\" ng-transclude></ul>");
	}]);