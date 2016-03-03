editorApp.factory('editQuestionService',['$http', '$filter', function($http, $filter){
	
	var thisAllQuestionData;
	
	var editQuestionService = {
			
			setAllQuestionData: function(allQuestionData){
				thisAllQuestionData = allQuestionData;
			},
			
			getAllQuestionNumList: function(){
				var allQuestionNumList = new Array(thisAllQuestionData.length);
				for(var i=0; i<thisAllQuestionData.length; i++){
					allQuestionNumList[i] = (i + 1).toString();
				}
				return allQuestionNumList;
			},
			
			getAllChildQuestionNumList: function(parentQstNum){
				var parentQuestion = thisAllQuestionData[parseInt(parentQstNum) - 1];
				var allChildQuestionNumList = new Array(parentQuestion.editChildQuestionModels.length);
				for(var i=0; i<allChildQuestionNumList.length; i++){
					allChildQuestionNumList[i] = parentQstNum + "." + (i + 1).toString();
				}
				return allChildQuestionNumList;
			},
			
			updateQuestionWithoutSequenceChange: function(oldQuestion, newQuestion){
				//only update title, instruction, sequncenum(qstNum)
				oldQuestion.qstTitle = newQuestion.qstTitle;
				oldQuestion.qstInstruction = newQuestion.qstInstruction;
			}
			
	};
	
	return editQuestionService;
}]);
