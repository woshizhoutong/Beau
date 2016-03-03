editorApp.factory('questionTemplateService',['$http', '$filter', function($http, $filter){
	
	
	var questionTemplateService = {
			
			deleteChildQuestion: function(parentQuestion, chosenDeleteQuestion){
				var childQuestions = parentQuestion.editChildQuestionModels;
	    		for(var i=0; i<childQuestions.length; i++){
	    			if(childQuestions[i].qstId == chosenDeleteQuestion.qstId){
	    				parentQuestion.editChildQuestionModels.splice(i, 1);
	    				break;
	    			}
	    		}
	    		for(var i=0; i<childQuestions.length;i++){
	    			childQuestions[i].qstNum = parentQuestion.qstNum + "." + (i + 1);
	    		}
			},
			
			updateChildQuestionWithShowOrderChange: function(parentQuestion, newQuestion, oldQstNum){
				var childQuestions = parentQuestion.editChildQuestionModels;

				for(var i=0; i<childQuestions.length; i++){
					if(childQuestions[i].qstNum == oldQstNum){
						//update the  child question to the newQuestion
						childQuestions[i] = updateQstNumForChildQuestion(newQuestion, newQuestion.qstNum.split(".")[1]);
					}
				}
				
				var newQuestionQstNum = parseInt(newQuestion.qstNum.split(".")[1]);
				var oldQuestionQstNum = parseInt(oldQstNum.split(".")[1]);
				//adjust the qstNum for each parent question, child question and option according to newQuestion
				var diff = oldQuestionQstNum - newQuestionQstNum;
				console.log(childQuestions);
				if(diff > 0){ //change sequence of the question from larger number to smaller number
					for(var i=newQuestionQstNum; i<oldQuestionQstNum; i++){
						childQuestions[i-1] = updateQstNumForChildQuestion(childQuestions[i-1], (i+1).toString());
					}
				}else{ //change sequence of the question from smaller number to larger number
					for(var i=newQuestionQstNum; i>oldQuestionQstNum; i--){
						childQuestions[i-1] = updateQstNumForChildQuestion(childQuestions[i-1], (i-1).toString());
					}
				}
				console.log(childQuestions);
			}
	};
	
	function updateQstNumForChildQuestion(childQuestion, newShowOrderNumThisQuestion){
		childQuestion.qstNum = childQuestion.parentQstNum + "." + newShowOrderNumThisQuestion;
		
		for(var j=0; j<childQuestion.editOptionModels.length; j++){
			childQuestion.editOptionModels[j].qstNum = childQuestion.parentQstNum + "." + newShowOrderNumThisQuestion;
		}
		return childQuestion;
	}
	
	return questionTemplateService;
}]);
