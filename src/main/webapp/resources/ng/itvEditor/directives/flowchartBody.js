editorApp.directive('flowchartBody', function(){
	return{
        restrict: 'E',
        template: '<div id="myDiagram"></div>',  // just an empty DIV element
        replace: true,
        scope: { model: '=goModel'
        	},
        link: function(scope, element, attrs) {
        	var $ = go.GraphObject.make;
            var diagram =  // create a Diagram for the given HTML DIV element
              $(go.Diagram, element[0],
                {
                  nodeTemplate: $(go.Node, "Spot", nodeStyle(),
                		  			$(go.Panel, "Auto",
		                                  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),

		                                  $(go.Shape, "RoundedRectangle",
		                                    {
		                                      fill: "#00A9C9",
		                                      stroke: null
		                                    },
		                                  	new go.Binding("figure", "figure")),
		                                    $(go.TextBlock,
	                                            {
	                                              font: "bold 11pt Helvetica, Arial, sans-serif",
	                                              stroke: "whitesmoke",
	                                              margin: 8,
	                                              maxSize: new go.Size(480, NaN),
	                                              wrap: go.TextBlock.WrapFit,
	                                              editable: false
	                                            },
	                                            new go.Binding("text", "text").makeTwoWay()
		                                    )
	                		  			),
                                 // four named ports, one on each side:
                                    makePort("T", go.Spot.Top, false, true),
                                    makePort("L", go.Spot.Left, true, true),
                                    makePort("R", go.Spot.Right, true, true),
                                    makePort("B", go.Spot.Bottom, true, false)
                                ),
			                    
                initialContentAlignment: go.Spot.Center,
                allowDrop: true,  // must be true to accept drops from the Palette
//                    "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
//                    "LinkRelinked": showLinkLabel,
                "animationManager.duration": 800, // slightly longer than default (600ms) animation
                "undoManager.isEnabled": true  // enable undo & redo
            });
            
            
            
            diagram.linkTemplateMap.add("",
            		$(go.Link,  // the default link panel
                	        {
		                      routing: go.Link.AvoidsNodes,
		                      curve: go.Link.JumpOver,
		                      corner: 5, toShortLength: 4,
		                      reshapable: false,
		                      resegmentable: false,
		                      selectable:false,
		                      deletable: false,
		                      // mouse-overs subtly highlight links:
//		                      mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
//		                      mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
		                    },
		                    new go.Binding("points").makeTwoWay(),
		                    new go.Binding("relinkableFrom").makeTwoWay(),
		                    $(go.Shape,  // the highlight shape, normally transparent
		                      { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
		                    $(go.Shape,  // the link path shape
		                      { isPanelMain: true, stroke: "gray", strokeWidth: 2 }),
		                    $(go.Shape,  // the arrowhead
		                      { toArrow: "standard", stroke: null, fill: "gray"}),
		                    $(go.Panel, "Auto",  // the link label, normally not visible
		                      { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
		                      new go.Binding("visible", "visible").makeTwoWay(),
		                      $(go.Shape, "RoundedRectangle",  // the label shape
		                        { fill: "#F8F8F8", stroke: null }),
		                      $(go.TextBlock, "Yes",  // the label
		                        {
		                          textAlign: "center",
		                          font: "10pt helvetica, arial, sans-serif",
		                          stroke: "#333333",
		                          editable: false
		                        },
		                        new go.Binding("text", "text").makeTwoWay())
		                    )
	                    ));
            
            
            diagram.linkTemplateMap.add("jump",
            		$(go.Link,  // the jump link panel
                	        {
		                      routing: go.Link.AvoidsNodes,
		                      curve: go.Link.JumpOver,
		                      corner: 5, toShortLength: 4,
		                      reshapable: true,
		                      resegmentable: true,
		                      deletable: false,
		                      // mouse-overs subtly highlight links:
		                      mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
		                      mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
		                    },
		                    new go.Binding("points").makeTwoWay(),
		                    new go.Binding("relinkableFrom").makeTwoWay(),
		                    $(go.Shape,  // the highlight shape, normally transparent
		                      { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT"}),
		                    $(go.Shape,  // the link path shape
		                      { isPanelMain: true, stroke: "gray", strokeWidth: 2, strokeDashArray:[25,5] }),
		                    $(go.Shape,  // the arrowhead
		                      { toArrow: "standard", stroke: null, fill: "gray"}),
		                    $(go.Panel, "Auto",  // the link label, normally not visible
		                      { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
		                      new go.Binding("visible", "visible").makeTwoWay(),
		                      $(go.Shape, "RoundedRectangle",  // the label shape
		                        { fill: "#F8F8F8", stroke: null }),
		                      $(go.TextBlock, "Yes",  // the label
		                        {
		                          textAlign: "center",
		                          font: "10pt helvetica, arial, sans-serif",
		                          stroke: "#333333",
		                          editable: false
		                        },
		                        new go.Binding("text", "text").makeTwoWay())
		                    )
	                    ));
            
//            diagram.addDiagramListener("Modified", function(e) {
//                var button = document.getElementById("btn_save");
//                if (button) button.disabled = !diagram.isModified;
//                var idx = document.title.indexOf("*");
//                if (diagram.isModified) {
//                  if (idx < 0) document.title += "*";
//                } else {
//                  if (idx >= 0) document.title = document.title.substr(0, idx);
//                }
//            });
            // Define a function for creating a "port" that is normally transparent.
            // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
            // and where the port is positioned on the node, and the boolean "output" and "input" arguments
            // control whether the user can draw links from or to the port.
            function makePort(name, spot, output, input) {
              // the port is basically just a small circle that has a white stroke when it is made visible
              return $(go.Shape, "Circle",
                       {
                          fill: "transparent",
                          stroke: null,  // this is changed to "white" in the showPorts function
                          desiredSize: new go.Size(8, 8),
                          alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                          portId: name,  // declare this object to be a "port"
                          fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                          fromLinkable: false, toLinkable: false,  // declare whether the user may draw links to/from here
                          cursor: "pointer"  // show a different cursor to indicate potential link point
                       });
            }  
            
            function nodeStyle() {
                return [
                  // The Node.location comes from the "loc" property of the node data,
                  // converted by the Point.parse static method.
                  // If the Node.location is changed, it updates the "loc" property of the node data,
                  // converting back using the Point.stringify static method.
                  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                  {
                    // the Node.location is at the center of each node
                    locationSpot: go.Spot.Center,
                    deletable: false,
                    copyable: false,
                    //isShadowed: true,
                    //shadowColor: "#888",
                    // handle mouse enter/leave events to show/hide the ports
//                    mouseEnter: function (e, obj) { showPorts(obj.part, true); },
//                    mouseLeave: function (e, obj) { showPorts(obj.part, false); }
                  }
                ];
              }
            
          //Make all ports on a node visible when the mouse is over the node
            function showPorts(node, show) {
              var diagram = node.diagram;
              if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
              node.ports.each(function(port) {
                  port.stroke = (show ? "white" : null);
                });
            }
            
            diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
            diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
            
            
//**********************      **********************    **********************   **********************    //   
//**********************      **********************    **********************   **********************    //              
            
         // whenever a GoJS transaction has finished modifying the model, update all Angular bindings
            function updateAngular(e) {
              if (e.isTransactionFinished) scope.$apply();
            }
            
            function addDiagramListener(e) {
                var selnode = diagram.selection.first();
                diagram.model.selectedNodeData = (selnode instanceof go.Node ? selnode.data : null);
                diagram.model.selectedLinkData = (selnode instanceof go.Link ? selnode.data : null);
                scope.$apply();
            }
            
            // notice when the value of "model" changes: update the Diagram.model
           scope.$watch("model", function(newmodel) {
              var oldmodel = diagram.model;
              if (oldmodel !== newmodel) {
                if (oldmodel) oldmodel.removeChangedListener(updateAngular);
                diagram.removeDiagramListener("ChangedSelection", addDiagramListener);
                newmodel.addChangedListener(updateAngular);
                diagram.model = newmodel;
                diagram.addDiagramListener("ChangedSelection", addDiagramListener);
              }
            });

            scope.$watch("model.selectedNodeData.text", function(newname) {
              // disable recursive updates
              diagram.model.removeChangedListener(updateAngular);
              // change the name
              diagram.startTransaction("change text");
              // the data property has already been modified, so setDataProperty would have no effect
              var node = diagram.findNodeForData(diagram.model.selectedNodeData);
              if (node !== null) node.updateTargetBindings("text");
              diagram.commitTransaction("change text");
              // re-enable normal updates
              diagram.model.addChangedListener(updateAngular);
            });
//
//            // update the model when the selection changes
            diagram.addDiagramListener("ChangedSelection", addDiagramListener);
           
        }
      };
});