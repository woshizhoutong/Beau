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


var app = angular.module("datasets", ["ngRoute", "ui.bootstrap", "angular-bootstrap-select", "smart-table"]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider
	.when('/comDatasets/:comId', {
		controller: 'comDatasetsCtl',
		templateUrl: '/' + getRootFolderName() + '/resources/app/datasets/view/comDatasetsTmpl.html'
	});
	$httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $("meta[name='_csrf']").attr("content");
}]);