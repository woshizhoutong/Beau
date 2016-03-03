editorApp.factory('questionEditorService',['$http', '$filter', function($http, $filter){
	
	var origin_x = 110;
	var origin_y = 100;
	var gapBetweenTwoNodes = 80;
	var thisAllQuestionData;
	
	var questionEditorService = {
			
			getAllQuestionData: function(versionNum){

				var promise = $http.get('/' + getRootFolderName() + '/editor/getAllParentQuestion').then(function(response){
					var data = response.data.result;
					thisAllQuestionData = data;
					return data;
				});
				return promise;
			},
			
			setAllQuestionData: function(all){
				thisAllQuestionData = all;
			},
			
			getAllQuestionNumList: function(){
				var allQuestionNumList = new Array(thisAllQuestionData.length);
				for(var i=0; i<thisAllQuestionData.length; i++){
					allQuestionNumList[i] = (i + 1).toString();
				}
				return allQuestionNumList;
			},
			
			getFlowChartDataWithAllQuestionData: function(allData){
				
				var flowchartData = {"class": "go.GraphLinksModel",
						  "linkFromPortIdProperty": "fromPort",
						  "linkToPortIdProperty": "toPort",
						  "nodeDataArray": [],
						  "linkDataArray": []
					};
				
				var nodeDataArray = [];
				var linkDataArray = [];
				for(var i=0; i<allData.length; i++){
					//**********************//
					//  * parent question * //
					//**********************//
					//nodeDataArray
					var parentQuestion = allData[i];
					var nodeData = {
						"key": parentQuestion.qstNum,
						"qstNum" : parentQuestion.qstNum,
						"text" : parentQuestion.qstNum + ". " + parentQuestion.qstTitle,
						"loc" : parentQuestion.loc
					};
					nodeDataArray.push(nodeData);
					
					//linkDataArray
					// primary link from node to next node, only n-1 primary link
					if(i < (allData.length - 1)){
						var nextParentQuestion = allData[i+1];
						var primaryLinkData = {
							"optNum": null,
							"from" : parentQuestion.qstNum,
							"to" : nextParentQuestion.qstNum,
							"fromPort" : 'B',
							"toPort": 'T',
							"points" : null,
							"primaryLink": true,
							"category":"primary"
						};
						linkDataArray.push(primaryLinkData);
					}
					
					var parentOptions = parentQuestion.editOptionModels;
					for(var j=0; j<parentOptions.length; j++){
						var parentOption = parentOptions[j];
						if(parentOption.jumpTrg == true){
							var linkData = {
								"optNum": parentOption.optNum,
								"from" : parentQuestion.qstNum,
								"to" : parentOption.jumpQstNum,
								"fromPort" : parentOption.fromPort,
								"toPort": parentOption.toPort,
								"points" : parentOption.points,
								"primaryLink": parentOption.primaryLink,
								"category":"jump"
							};
							linkDataArray.push(linkData);
						}
					}
					
					//**********************//
					//  * child question * //
					//**********************//
					//linkDataArray only
					var childQuestions = parentQuestion.editChildQuestionModels;
					for(var j=0; j<childQuestions.length; j++){
						var childQuestion = childQuestions[j];
						
						var childOptions = childQuestion.editOptionModels;
						for(var k=0; k<childOptions.length; k++){
							var childOption = childOptions[k];
							if(childOption.jumpTrg == true){
								var linkData = {
									"optNum": childOption.optNum,
									"from" : parentQuestion.qstNum,
									"to" : childOption.jumpQstNum,
									"fromPort" : childOption.fromPort,
									"toPort": childOption.toPort,
									"points" : childOption.points,
									"primaryLink": childOption.primaryLink,
									"category":"jump"
								};
								linkDataArray.push(linkData);
							}
						}
					}
					
				}
				
				flowchartData.linkDataArray = linkDataArray;
				flowchartData.nodeDataArray = nodeDataArray;
				return flowchartData;
			},
			
//			saveFlowchartData: function(nodeDataArray, linkDataArray){
//				
//				saveNodes(nodeDataArray).then(function(response){
//					saveLinks(linkDataArray).then(function(response){
//						alert("Question saved successfully!");
//					});
//				});
//			},
			
			getParentQuestionByQstNumWithAllQuestionData: function(allData, num){
				return $filter('filter')(allData, {qstNum:num})[0];
			},
			
			getOptionByOptNumWithParentQuestion: function(parentQuestion, thisOptNum){
				var parentOption = $filter('filter')(parentQuestion.editOptionModels, {optNum:thisOptNum})[0];
				if((parentOption != null) && !(typeof parentOption === undefined)){
					return parentOption;
				}else{
					for(var i=0; i<parentQuestion.editChildQuestionModels.length; i++){
						var childQuestion = parentQuestion.editChildQuestionModels[i];
						var childOption = $filter('filter')(childQuestion.editOptionModels, {optNum:thisOptNum})[0];
						if((childOption != null) && !(typeof childOption === undefined)){
							return childOption;
						}
					}
				}
				
			},
			
			getLinkByOptNumWithLinkDataArray: function(linkDataArray, thisOptNum){
				return $filter('filter')(linkDataArray, {optNum:thisOptNum})[0];
			},
			
//			updateAllQuestionDataWithNewQuestion: function(allQuestionData, newQuestion){
//				for(var i=0; i<allQuestionData.length; i++){
//					if(allQuestionData[i].qstId == newQuestion.qstId){
//						allQuestionData[i] = newQuestion;
//						break;
//					}
//				}
//				return allQuestionData;
//			}
			
			deleteParentQuestionWithAllQuestionData: function(all, chosenDeleteQuestion){
				for(var i=0; i<all.length; i++){
					if(all[i].qstNum == chosenDeleteQuestion.qstNum){
						all.splice(i, 1);
						var adjustStartIndex = i;
						break;
					}
				}
				
				//adjust qstNum according to chosenDeleteQuestion
				for(var i=adjustStartIndex; i<all.length; i++){
					alert(i);
					all[i] = updateQstNumForParentQuestion(all[i], (i+1).toString());
				}
				
				//sort the array of question by qstNum
				sortByKey(all, 'qstNum');
				
				//reset the option jump destination and related info if the destination is deleted.
				var options = getOptionsByJumpDestinationQstNumWithAllData(all, chosenDeleteQuestion.qstNum);
				for(var i=0; i<options.length; i++){
					var option = options[i];
					option.jumpTrg = false;
					option.jumpDestination = null;
					option.fromPort = null;
					option.toPort = null;
					option.primaryLink = false;
					option.points = null;
				}
			},
			
			updateAllQuestionDataWithSequenceChange: function(all, newQuestion, oldQstNum){
				var newQuestionQstNum = Number(newQuestion.qstNum);
				for(var i=0; i<all.length; i++){
					if(all[i].qstNum == oldQstNum){
						oldQuestionQstNum = Number(all[i].qstNum);
						//update the whole parent question to the newQuestion
//						all[i] = newQuestion;
						all[i] = updateQstNumForParentQuestion(newQuestion, newQuestion.qstNum);
					}
				}
				
				//adjust the qstNum for each parent question, child question and option according to newQuestion
				var diff = oldQuestionQstNum - newQuestionQstNum;
				
				if(diff > 0){ //change sequence of the question from larger number to smaller number
					for(var i=newQuestionQstNum; i<oldQuestionQstNum; i++){
						all[i-1] = updateQstNumForParentQuestion(all[i-1], (i+1).toString());
					}
				}else{ //change sequence of the question from smaller number to larger number
					for(var i=newQuestionQstNum; i>oldQuestionQstNum; i--){
						all[i-1] = updateQstNumForParentQuestion(all[i-1], (i-1).toString());
					}
				}
				//update the jump destination question num for all options.
				updateJumpQstNumForAllOptions(all);
				
				//sort the array of question by qstNum
				sortByKey(all, 'qstNum');
				
				//reset location of all nodes and link points for all links
				resetAllNodeLocAndLinkPoints(all);
			},
			
			addQuestionToAllQuestionDataWithSequenceChange: function(all, newQuestion, isSequenceChanged){
				
				if(all.length != 0){
					var locOfLastNode = all[all.length - 1].loc;
					var x = locOfLastNode.split(" ")[0];
					var y = Number(locOfLastNode.split(" ")[1]) + gapBetweenTwoNodes;
					newQuestion.loc = x.toString() + " " + y.toString();
				}else{
					var x = origin_x;
					var y = origin_y;
					newQuestion.loc = x.toString() + " " + y.toString();
				}
				all.push(newQuestion);
				
				if(isSequenceChanged == true){	
					var newQuestionQstNum = Number(newQuestion.qstNum);
					oldQuestionQstNum = all.length;
					
					//adjust the qstNum according to newQuestion
					var diff = oldQuestionQstNum - newQuestionQstNum;
					
					if(diff > 0){ //change sequence of the question from larger number to smaller number
						for(var i=newQuestionQstNum; i<oldQuestionQstNum; i++){
							all[i-1] = updateQstNumForParentQuestion(all[i-1], (i+1).toString());
						}
					}
					
					//update the jump destination question num for all options.
					updateJumpQstNumForAllOptions(all);
					
					//sort the array of question by qstNum
					sortByKey(all, 'qstNum');
					
					//reset location of all nodes and link points for all links
					resetAllNodeLocAndLinkPoints(all);
				}
			},
			
			resetFlowchart: function(all){
				resetAllNodeLocAndLinkPoints(all);
			},
			
			getQuestionTypeList: function(){
				var promise = $http.get('/' + getRootFolderName() + "/editor/getQuestionTypeList").then(function(response){
					var data = response.data.result;
					return data;
				});
				return promise;
			},
			
			getAnswerDataTypeList: function(){
				var promise = $http.get('/' + getRootFolderName() + "/editor/getAnswerDataTypeList").then(function(response){
					var data = response.data.result;
					return data;
				});
				return promise;
			},
			
			saveAllQuestionDataToServer: function(allQuestionData){
				var promise = $http.post('/' + getRootFolderName() + "/editor/saveQuestions", allQuestionData).then(function(data, status){
					var result = data.data;
					return result;
				});
				return promise;
			},
			
			finilizaAllQuestionDataToServer: function(allQuestionData){
				var promise = $http.post('/' + getRootFolderName() + "/editor/finalizeQuestions", allQuestionData).then(function(data, status){
					var result = data.data;
					return result;
				});
				return promise;
			},
			
			getLastestVersionNum: function(){
				var promise = $http.get('/' + getRootFolderName() + "/editor/getLastedVersionNum").then(function(response){
					var lastestVersionNum = response.data.result;
					var versionNumList = [];
					for(var i=0; i<lastestVersionNum; i++){
						versionNumList.push(i + 1);
					}
					return versionNumList;
				});
				return promise;
			},
			
			getExistingQuestionsByVersionNum: function(versionNum){
				var promise = $http.get('/' + getRootFolderName() + "/editor/getExistringParentQuestionByVersionNum?versionNum=" + versionNum).then(function(response){
					var data = response.data.result;
					return data;
				});
				return promise;
			},
			
			deleteAllQuestionDataFromServer: function(allQuestionData){
				var promise = $http.get('/' + getRootFolderName() + "/editor/deleteQuestions").then(function(response){
					var result = data.data;
					return result;
				});
				return promise;
			}

	};
	
	
///////////////////////////////////////////////////////////////////////////
/////////////////////////////Functions/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
	function getAllQuestionData(){
		var promise = $http.get('/' + getRootFolderName() + "/editor/getAllQuestionData").then(function(response){
			var data = response.data.result;
			return data;
		});
		return promise;
	}

	function sortByKey(array, key) {
	    return array.sort(function(a, b) {
	        var x = a[key]; var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	}

	function updateQstNumForParentQuestion(question, newQstNumOfThisQuestion){
		question.qstNum = newQstNumOfThisQuestion;
		//update the qstNum of parent options;
		for(var j=0; j<question.editOptionModels.length; j++){
			var parentOption = question.editOptionModels[j];
			parentOption.qstNum = newQstNumOfThisQuestion;
			parentOption.parentQstNum = newQstNumOfThisQuestion;
			
		}
		//update the qstNum of childQuestions
		for(var j=0; j<question.editChildQuestionModels.length; j++){
			var childQuestion = question.editChildQuestionModels[j];
			var oldChildQstNum = childQuestion.qstNum;
			childQuestion.qstNum = newQstNumOfThisQuestion + '.' + oldChildQstNum.split('.')[1];
			childQuestion.parentQstNum = newQstNumOfThisQuestion;
			 
			//update the qstNum of childQuestion options;
			for(var k=0; k<childQuestion.editOptionModels.length; k++){
				var childOption = childQuestion.editOptionModels[k];
				childOption.qstNum = childQuestion.qstNum;
				childOption.parentQstNum = newQstNumOfThisQuestion;
			}
		}
		return question;
	}
	
	function updateJumpQstNumForAllOptions(all){
		for(var i=0; i<all.length; i++){
			var parentQuestion = all[i];
			var parentOptionsWithJumpTrg = $filter('filter')(parentQuestion.editOptionModels, {jumpTrg:true});
			if(parentOptionsWithJumpTrg != undefined && parentOptionsWithJumpTrg != null){
				for(var j=0; j<parentOptionsWithJumpTrg.length; j++){
					var parentOptionJumpQstNum = parentOptionsWithJumpTrg[j].jumpQstNum;
					parentOptionsWithJumpTrg[j].jumpQstNum = all[parseInt(parentOptionJumpQstNum) - 1].qstNum;
				}
			}
			
			for(var j=0; j<parentQuestion.editChildQuestionModels.length; j++){
				var childQuestion = parentQuestion.editChildQuestionModels[j];
				var childOptionsWithJumpTrg = $filter('filter')(childQuestion.editOptionModels, {jumpTrg:true});
				if(childOptionsWithJumpTrg != undefined && childOptionsWithJumpTrg != null){
					for(var k=0; k<childOptionsWithJumpTrg.length; k++){
						var childOptionJumpQstNum = childOptionsWithJumpTrg[k].jumpQstNum;
						childOptionsWithJumpTrg[k].jumpQstNum = all[parseInt(childOptionJumpQstNum) - 1].qstNum;
					}
				}
			}
		}
	}

	function resetAllNodeLocAndLinkPoints(all){
		var x = origin_x;
		var y = origin_y;
		for(var i=0; i<all.length; i++){
			var question = all[i];
			//reset node location
			question.loc = x.toString() + " " + y.toString();
			y = y + gapBetweenTwoNodes;
			
			//reset links of parent question option
			for(var j=0; j<question.editOptionModels.length; j++){
				var parentOption = question.editOptionModels[j];
				parentOption.points = null;
				if(parentOption.jumpTrg == true){
//					var jumpDestinationQstNum = $filter('filter')(all, {qstNum:parentOption.jumpQstNum})[0].qstNum;
					var jumpDestinationQstNum = parentOption.jumpQstNum;
					if(eval(jumpDestinationQstNum > parentOption.qstNum)){
						parentOption.fromPort = 'R';
						parentOption.toPort = 'R';
					}else if (eval(jumpDestinationQstNum < parentOption.qstNum)){
						parentOption.fromPort = 'L';
						parentOption.toPort = 'L';
					}
				}
			}
			
			//reset links of child question option
			for(var j=0; j<question.editChildQuestionModels.length; j++){
				var childQuestion = question.editChildQuestionModels[j];
				for(var k=0; k<childQuestion.editOptionModels.length; k++){
					var childOption = childQuestion.editOptionModels[k];
					childOption.points = null;
					if(childOption.jumpTrg == true){
//						var jumpDestinationQstNum = $filter('filter')(all, {qstId:childOption.jumpDestination})[0].qstNum;
						var jumpDestinationQstNum = childOption.jumpQstNum;
						if(eval(jumpDestinationQstNum > childOption.qstNum)){
							childOption.fromPort = 'R';
							childOption.toPort = 'R';
						}else if (eval(jumpDestinationQstNum < childOption.qstNum)){
							childOption.fromPort = 'L';
							childOption.toPort = 'L';
						}
					}
				}
			}
			
		}
	}

	function getOptionsByJumpDestinationQstNumWithAllData(all, jumpQstNum){
		var options = [];
		for(k=0; k<all.length; k++){
			var parentQuestion = all[k];
			var parentOption = $filter('filter')(parentQuestion.editOptionModels, {jumpQstNum:jumpQstNum})[0];
			if((parentOption != null) && !(typeof parentOption === undefined)){
				options.push(parentOption);
			}else{
				for(var i=0; i<parentQuestion.editChildQuestionModels.length; i++){
					var childQuestion = parentQuestion.editChildQuestionModels[i];
					var childOption = $filter('filter')(childQuestion.editOptionModels, {jumpQstNum:jumpQstNum})[0];
					if((childOption != null) && !(typeof childOption === undefined)){
						options.push(childOption);
					}
				}
			}
		}
		return options;
	}
	
	return questionEditorService;
}]);



