'use strict';
var entityMap = {
	"&" : "&amp;",
	"<" : "&lt;",
	">" : "&gt;",
	'"' : '&quot;',
	"'" : '&#39;',
	"/" : '&#x2F;'
};
function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function(s) {
		return entityMap[s];
	});
}
var nonSpace = /\S/;
function trimIndent(content) {
	var lines = content.split("\n");
	var begin = 0;
	var end = lines.length - 1;
	while ((nonSpace.exec(lines[begin]) == null) && (begin < lines.length))
		begin = begin + 1;
	while ((nonSpace.exec(lines[end]) == null) && end >= begin)
		end = end - 1;
	var ident = nonSpace.exec(lines[begin]).index;
	var formatted = "";
	for (var i = begin; i <= end; i++) {
		formatted = formatted + lines[i].slice(ident - 1)
				+ ((i < end) ? "\n" : "");
	}
	return formatted;
}
//var app = angular.module("ccpm", [ "ngRoute", "treeControl", "ui.bootstrap", "template/tabs/tab.html","template/tabs/tabset.html" ])
//	.factory("$savedContent", function() {
//		return [];
//	}).directive("saveContent", function($savedContent) {
//			return {
//				restrict : "A",
//				compile : function($element, $attrs) {
//					var content = $element.html();
//					$savedContent[$attrs.saveContent] = content;
//					}
//	}
//}).directive("applyContent", function($savedContent) {
//	return {
//		restrict : "EAC",
//		compile : function($element, $attrs) {
//			return function($scope, $element, $attrs) {
//				var content = $savedContent[$attrs.applyContent];
//				var lang = $attrs.highlightLang;
//				if (lang == "html")
//					content = escapeHtml(content);
//				content = trimIndent(content);
//				var pre = prettyPrintOne(content, lang);
//				$element.html(pre);
//			}
//		}
//	}
//}).directive(
//		"nav",
//		function() {
//			return {
//				restrict : "A",
//				compile : function($element) {
//					var sections = $("section");
//					angular.forEach(sections, function(section) {
//						var $section = $(section);
//						var id = $section.attr('id');
//						var titleHtml = $section.find("h1").html();
//						titleHtml = titleHtml.slice(0, titleHtml.indexOf("<"))
//								.trim();
//						$element.append("<li><a href='#" + id + "'>"
//								+ titleHtml + "</a></li>")
//					})
//				}
//			}
//		});

var app = angular.module("ccpm", [ "ngRoute", "treeControl", "ui.bootstrap", "angular-bootstrap-select", "c.selectableAccordion"]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/oriRpt/:oriRptId', {
		controller: 'oriRptCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/view/originalReportTmpl.html'
	})
	.when('/rpt/:rptId', {
		controller: 'rptCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/view/reportTmpl.html'
	})
	.when('/inc/:incId', {
		controller: 'incCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/view/incidentTmpl.html'
	})
	.when('/itvs/:rptId', {
		controller: 'itvsCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/view/interviewsTmpl.html'
	});
}]);

app.config(['$provide', Decorate]);
function Decorate($provide) {
    $provide.decorator('accordionGroupDirective', function($delegate) {
      var directive = $delegate[0];
      
      directive.templateUrl = '/ccpm/resources/app/view/accordion-group.html';
      
      return $delegate;
    });
  }

angular.module('angular-bootstrap-select', [])
.directive('selectpicker', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.selectpicker($parse(attrs.selectpicker)());
      element.selectpicker('refresh');
      
      scope.$watch(attrs.ngModel, function (newVal, oldVal) {
        scope.$parent[attrs.ngModel] = newVal;
        scope.$evalAsync(function () {
          if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
          element.selectpicker('refresh');
        });
      });
      
      scope.$on('$destroy', function () {
        scope.$evalAsync(function () {
          element.selectpicker('destroy');
        });
      });
    }
  };
}]);