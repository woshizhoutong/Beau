editorApp.factory('editOptionService',['$http', '$filter', function($http, $filter){
	
	var thisAllQuestionData;
	
	var editOptionService = {
			
			setAllQuestionData: function(allQuestionData){
				thisAllQuestionData = allQuestionData;
			},

			updateQuestionWithNewOption: function(questionData, newOption){
				for(var i=0; i<questionData.editOptionModels.length; i++){
					if(questionData.editOptionModels[i].optNum == newOption.optNum){
						questionData.editOptionModels[i] = newOption;
						return questionData;
					}
				}
				
			},
			
			getJumpDestinationQstNumList: function(qstNumOfThisOption){
				var jumpDestinationQstNumList = new Array(thisAllQuestionData.length);
				for(var i=0; i<thisAllQuestionData.length; i++){
					jumpDestinationQstNumList[i] = (i + 1).toString();
				}

				for(var i=0; i<jumpDestinationQstNumList.length; i++){
					if(jumpDestinationQstNumList[i] == qstNumOfThisOption){
						jumpDestinationQstNumList.splice(i, 1);
						break;
					}
				}
				return jumpDestinationQstNumList;
			},
			
			getShowOrderList: function(question){
				var showOrderList = new Array(question.editOptionModels.length);
				for(var i=0; i<showOrderList.length; i++){
					showOrderList[i] = (i);
				}
				return showOrderList;
			},
			
			deleteOption: function(question, chosenDeleteoption){
				var options = question.editOptionModels;
	    		for(var i=0; i<options.length; i++){
	    			if(options[i].optNum == chosenDeleteoption.optNum){
	    				question.editOptionModels.splice(i, 1);
	    				break;
	    			}
	    		}
	    		for(var i=0; i<options.length;i++){
	    			options[i].showOrder = i;
	    		}
	    		
			},
			
			getTotalNumOfOptions: function(){
				var count = 0;
				for(var i=0; i<thisAllQuestionData.length; i++){
					var parentQuestion = thisAllQuestionData[i];
					count = count + parentQuestion.editOptionModels.length;
					
					var childQuestions = parentQuestion.editChildQuestionModels;
					for(var j=0; j<childQuestions.length; j++){
						var childQuestion = childQuestions[j];
						count = count + childQuestion.editOptionModels.length;
					}
				}
				return count;
			},
			
			updateOptionShowOrderChange: function(olderOrder, newOrder, question){
				var optionList = question.editOptionModels;
				var diff = olderOrder - newOrder;
				if(diff > 0){ //change sequence of the question from larger number to smaller number
					for(var i=newOrder; i<olderOrder; i++){
						optionList[i].showOrder++;
					}
				}else{ //change sequence of the question from smaller number to larger number
					for(var i=newOrder; i>olderOrder; i--){
						optionList[i].showOrder--;
					}
				}
				console.log(optionList);
				optionList.sort(function(a, b){
					return a.showOrder - b.showOrder;
				});
				question.editOptionModels = optionList;
				
			}
	};
	
	return editOptionService;
}]);


