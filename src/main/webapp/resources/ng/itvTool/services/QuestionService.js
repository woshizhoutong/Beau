app.factory('QuestionService',['$http', function($http){
	
	var QuestionService = {
			
			getTotalNumOfParentQuestion: function(versionNum){
				var promise = $http.get('/' + getRootFolderName() + "/itvTool/getTotalNumOfParentQuestion?versionNum=" + versionNum).then(function(response){
					var totalNumOfParentQuestion = response.data.result;
					return totalNumOfParentQuestion;
				});
				return promise;
			},
			
			getQuestionByQstNum: function(reportId, versionNum, qstNum){
				var promise = $http.get('/' + getRootFolderName() + "/itvTool/getQuestionByQstNumAndReportId?qstNum=" + qstNum + "&reportId=" + reportId + "&versionNum=" + versionNum).then(function(response){
					var question = response.data.result;
					return question;
				});
				return promise;
			},
			
			getCurrentAnswerWithQuestion: function(question){
				//for parentAnswer
				// If Choice type then convert string[] to int[]; if not then keep string[]
				var parentAnswerContent = question.answerContent;
				var parentDataType = question.answerDataType;
				var parentAnswer = [];

				if(parentDataType.toUpperCase() == "CHOICE".toUpperCase()){
					for(var i=0; i<parentAnswerContent.length; i++){
						parentAnswer.push(parseInt(parentAnswerContent[i]));
					}
				}else{
					parentAnswer = parentAnswerContent;
				}
				
				//for childAnswer
				var childQuestions = question.childQuestionModels
				var childAnswer = {};
				
				for(var i=0; i<childQuestions.length; i++){
					var childQuestion = childQuestions[i];
					var childAnswerContent = childQuestion.answerContent;
					var childDataType = childQuestion.answerDataType
					var childAnswerTemp = [];
					if(childDataType.toUpperCase() == "CHOICE".toUpperCase()){
						for(var j=0; j<childAnswerContent.length; j++){
							childAnswerTemp.push(parseInt(childAnswerContent[j]));
						}
					}else{
						childAnswerTemp = childAnswerContent;
					}
					childAnswer[childQuestion.qstNum] = childAnswerTemp;
				}
				var answer = {
						"parent": parentAnswer,
						"child": childAnswer
				};
				return answer;
				
			},
			
			saveAnswer: function(question, reportId, answer){
				
				var answerModelList = [];

				// for the parent question answer
				var answerModel = {};
				answerModel.questionId = question.qstId;
				answerModel.answerDataType = question.answerDataType;
				answerModel.reportId = reportId;
				answerModel.answerContent = [];
				if(typeof answer.parent !== "undefined"){
					var parentAnswer = answer.parent;
					answerModel.answerContent = parentAnswer;
				}
				answerModelList.push(answerModel);
				
				// for the child question answer
				for(var i=0; i<question.childQuestionModels.length; i++){
					var answerModel = {};
					var childQuestion = question.childQuestionModels[i];
					answerModel.answerContent = [];
					answerModel.questionId = childQuestion.qstId;
					answerModel.answerDataType = childQuestion.answerDataType;
					answerModel.reportId = reportId;
					if(typeof answer.child !== "undefined"){
						var childAnswer = answer.child[childQuestion.qstNum];
						if(typeof childAnswer !== "undefined"){
							answerModel.answerContent = childAnswer;
						}
					}
					answerModelList.push(answerModel);
				}
				
				var promise = $http.post('/' + getRootFolderName() + "/itvTool/saveAnswer", answerModelList).then(function(response, status){
					var result = response.data.result;
					return result;
				});
				return promise;
			},
			
			listByVersionNumAndRptId: function(rptId, versionNum) {
				var promise = $http.get('/' + getRootFolderName() + "/itvTool/listByVersionNumAndReportId/" + versionNum + "/" + rptId).then(function(response){
					var question = response.data.result;
					return question;
				});
				return promise;
			}
	};
	
	return QuestionService;
}]);
