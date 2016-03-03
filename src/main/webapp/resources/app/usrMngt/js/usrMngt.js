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


var app = angular.module("usrMngt", ["ngRoute", "treeControl", "ui.bootstrap", "angular-bootstrap-select", "smart-table", "c.selectableAccordion"]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider
	.when('/ccpm', {
		controller: 'ccpmUsrMngtCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/ccpmUsrMngtTmpl.html'
	})
	.when('/cdp', {
		controller: 'cdpUsrMngtCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/cdpUsrMngtTmpl.html'
	})
	.when('/mcia', {
		controller: 'mciaUsrMngtCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/mciaUsrMngtTmpl.html'
	})
	.when('/cats', {
		controller: 'catsUsrMngtCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/usrMngt/view/catsUsrMngtTmpl.html'
	});
	$httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $("meta[name='_csrf']").attr("content");
}]);


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
