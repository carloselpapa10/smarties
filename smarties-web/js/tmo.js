(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();	
			
			var dataEvent = [];
			var dataEventPre = new Array();
			var index = 0;
			
			function addDataEvent(value){
				data = {name:"event", val: value};
				dataEvent[index]=data;				
				
				//url: 'http://localhost:8090/getPredictionAKOM',
				//url: 'http://localhost:8090/getPredictionLZ78',
				
				lastLengthData=60;
				
				if(index >= lastLengthData){
					$.ajax({
						url: 'http://localhost:8090/getPredictionLZ78',
						type: 'post',						
						contentType: "application/json",
						data: JSON.stringify(dataEvent.slice(dataEvent.length-lastLengthData,dataEvent.length)),						
						success: function (data) {
							if(data != null){
								dataEventPre.push(data);
								
								$('#temperature_3').val(data);
								changeInhabitantRedPosition(data);
							}
						}
						
					});
				
				}
				
				index++;
			}
			
			function init_sequence(){
				var firstEvent = 1;	
				var nextEvent = nextMovement(1);
				
				openOffEffectorsNext(nextEvent);
				changeInhabitantPosition(firstEvent, nextEvent);
				openOffEffectorsCurrent(nextEvent);
				
				addDataEvent(nextEvent);
				//storeEvent("event", nextEvent);
				console.log("from = "+firstEvent+" - to = "+nextEvent);

				setTimeout(function(){ 
					setInterval(function(){ 
						
						firstEvent = nextEvent;		
						nextEvent = nextMovement(firstEvent);
						
						openOffEffectorsNext(nextEvent);

						changeInhabitantPosition(firstEvent, nextEvent);
						openOffEffectorsCurrent(nextEvent);
						
						addDataEvent(nextEvent);
						//storeEvent("event", nextEvent);
						console.log("from = "+firstEvent+" - to = "+nextEvent);
					}, 15000);

				}, 2000);				
			}
			
			function storeEvent(name, value){
				$.post( "http://localhost:8090/addEvent", { name: name, value: value } );
			}
			
			function nextMovement(node){
			
				var notRandomNumbers = [];
				switch(node){
					case 1:
						notRandomNumbers = [4, 4, 4, 4, 4, 4, 2, 2, 3, 3];
						break;
					case 2:
						notRandomNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2];
						break;
					case 3:
						notRandomNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 3, 3];
						break;
					case 4:
						notRandomNumbers = [1, 1, 1, 1, 1, 4, 5, 5, 5, 5];
						break;
					case 5:
						notRandomNumbers = [4, 4, 6, 6, 7, 7, 13, 13, 10, 10];
						break;
					case 6:
						notRandomNumbers = [6, 6, 6, 5, 5, 5, 7, 7, 7, 9];
						break;
					case 7:
						notRandomNumbers = [6, 6, 6, 6, 7, 7, 8, 5, 5, 5];
						break;
					case 8:
						notRandomNumbers = [7, 7, 7, 7, 7, 7, 7, 7, 8, 8];
						break;
					case 9:
						notRandomNumbers = [6, 6, 6, 6, 6, 6, 6, 6, 9, 9];
						break;
					case 10:
						notRandomNumbers = [11, 11, 11, 11, 11, 5, 5, 5, 5, 5];
						break;
					case 11:
						notRandomNumbers = [11, 11, 11, 11, 12, 12, 10, 10, 10, 10];
						break;
					case 12:
						notRandomNumbers = [11, 11, 11, 11, 11, 11, 11, 11, 12, 12];
						break;
					case 13:
						notRandomNumbers = [5, 5, 5, 5, 5, 14, 14, 14, 14, 14];
						break;
					case 14:
						notRandomNumbers = [14, 14, 14, 14, 15, 15, 13, 13, 13, 13];
						break;
					case 15:
						notRandomNumbers = [14, 14, 14, 14, 14, 14, 14, 14, 15, 15];
						break;
					case 16:
						notRandomNumbers = [5, 5, 5, 5, 5, 5, 5, 5, 16, 16];
						break;
					default:
						alert("error");
						break;					
				}
				
				var idx = Math.floor(Math.random() * notRandomNumbers.length);
  				return notRandomNumbers[idx];
			
			}
			
			function changeInhabitantPosition(prevNode, CurrNode){
				$("#inhabitant").removeClass("inhabitant-"+prevNode).addClass("inhabitant-"+CurrNode);
			}
			
			function changeInhabitantRedPosition(NextNode){
				$("#inhabitant-red").removeClass();
				$("#inhabitant-red").addClass("inhabitant-red-"+NextNode);
			}
			
			function openOffEffectorsNext(node){
				if(node == 4){
					_this.publish("myhouse/bedroom/door_3", "1");
				}else if(node == 10){
					_this.publish("myhouse/bed/door_5", "1");
				}else if(node == 13){
					_this.publish("myhouse/bathroom/door_4", "1");
				}else if(node == 16){
					_this.publish("myhouse/livingroom/door_1", "1");
				}else if(node == 2){
					var flag;
				
					if($('#window_3').hasClass('window-closed')){
						flag = "1";
					}else{
						flag = "0";
					}
					_this.publish("myhouse/bedroom/window_3", flag);
				}else if(node == 3){
					var flag;
				
					if($('#window_4').hasClass('window-closed')){
						flag = "1";
					}else{
						flag = "0";
					}
					_this.publish("myhouse/bedroom/window_4", flag);
				}else if(node == 12){
					var flag;
				
					if($('#window_6').hasClass('window-closed')){
						flag = "1";
					}else{
						flag = "0";
					}
					_this.publish("myhouse/bed/window_6", flag);
				}else if(node == 15){
					var flag;
				
					if($('#window_5').hasClass('window-closed')){
						flag = "1";
					}else{
						flag = "0";
					}
					_this.publish("myhouse/bathroom/window_5", flag);
				}else if(node == 8){
					var flag;
				
					if($('#window_2').hasClass('window-closed')){
						flag = "1";
					}else{
						flag = "0";
					}
					_this.publish("myhouse/kitchen/window_2", flag);					
				}else if(node == 9){
					var flag;
				
					if($('#window_1').hasClass('window-closed')){
						flag = "1";
					}else{
						flag = "0";
					}
					_this.publish("myhouse/kitchen/window_1", flag);		
				}
			}
			
			function openOffEffectorsCurrent(node){
				
				/*doors*/
				if(node != 4){
					_this.publish("myhouse/bedroom/door_3", "0");
				} 
				if(node != 10){
					_this.publish("myhouse/bed/door_5", "0");
				}
				if(node != 13){
					_this.publish("myhouse/bathroom/door_4", "0");
				}
				
				if(node != 16){
					_this.publish("myhouse/livingroom/door_1", "0");
				}
				
				/*motion*/
				
				if(node == 1 || node == 2 || node == 3){
					_this.publish("myhouse/bedroom/motion_3", "1");
					_this.publish("myhouse/bedroom/light_3", "1");
				}else{
					_this.publish("myhouse/bedroom/motion_3", "0");
					_this.publish("myhouse/bedroom/light_3", "0");
					_this.publish("myhouse/bedroom/window_3", "0");
					_this.publish("myhouse/bedroom/window_4", "0");
				}
				
				if(node == 12 || node == 11){
					_this.publish("myhouse/bed/motion_5", "1");
					_this.publish("myhouse/bed/light_5", "1");
				}else{
					_this.publish("myhouse/bed/motion_5", "0");
					_this.publish("myhouse/bed/light_5", "0");
					_this.publish("myhouse/bed/window_6", "0");
				}
				
				if(node == 5 || node == 16){
					_this.publish("myhouse/livingroom/motion_1", "1");
					_this.publish("myhouse/livingroom/light_1", "1");					
				}else{
					_this.publish("myhouse/livingroom/motion_1", "0");
					_this.publish("myhouse/livingroom/light_1", "0");	
				}
				
				if(node == 6 || node == 7 || node == 8 || node == 9){
					_this.publish("myhouse/kitchen/motion_2", "1");
					_this.publish("myhouse/kitchen/light_2", "1");
				}else{
					_this.publish("myhouse/kitchen/motion_2", "0");
					_this.publish("myhouse/kitchen/light_2", "0");
					_this.publish("myhouse/kitchen/window_1", "0");
					_this.publish("myhouse/kitchen/window_2", "0");
				}
				
				if(node == 14 || node == 15){
					_this.publish("myhouse/bathroom/motion_4", "1");
					_this.publish("myhouse/bathroom/light_4", "1");
				}else{
					_this.publish("myhouse/bathroom/motion_4", "0");
					_this.publish("myhouse/bathroom/light_4", "0");
					_this.publish("myhouse/bathroom/window_5", "0");
				}
			}
			
			
			/*setInterval(function(){ 				
				
				$.get( "http://localhost:8090/noOneAtHome", function( data ) {
				  	
					if(data){
						_this.publish("myhouse/noOneAtHome", "1");
					}else{
						_this.publish("myhouse/noOneAtHome", "0");
					}
						
				});
			
			}, 60000);*/
			
			
			$("#initialize_items").click(function(){
				_this.publish("myhouse/livingroom/light_1", "0");
				_this.publish("myhouse/kitchen/light_2", "0");
				_this.publish("myhouse/bedroom/light_3", "0");
				_this.publish("myhouse/bathroom/light_4", "0");
				_this.publish("myhouse/bed/light_5", "0");
				_this.publish("myhouse/livingroom/motion_1", "0");
				_this.publish("myhouse/kitchen/motion_2", "0");
				_this.publish("myhouse/bedroom/motion_3", "0");
				_this.publish("myhouse/bathroom/motion_4", "0");
				_this.publish("myhouse/bed/motion_5", "0");
				_this.publish("myhouse/kitchen/window_1", "0");
				_this.publish("myhouse/kitchen/window_2", "0");
				_this.publish("myhouse/bedroom/window_3", "0");
				_this.publish("myhouse/bedroom/window_4", "0");
				_this.publish("myhouse/bathroom/window_5", "0");
				_this.publish("myhouse/bed/window_6", "0");
				_this.publish("myhouse/livingroom/door_1", "0");
				_this.publish("myhouse/bedroom/door_3", "0");
				_this.publish("myhouse/bathroom/door_4", "0");
				_this.publish("myhouse/bed/door_5", "0");
				_this.publish("myhouse/livingroom/temp_1", "20");
				_this.publish("myhouse/kitchen/temp_2", "20");
				_this.publish("myhouse/bedroom/temp_3", "20");
				_this.publish("myhouse/bathroom/temp_4", "20");
				_this.publish("myhouse/bed/temp_5", "20");
			});
			
			$('#check').change(function()
			{
				if(this.checked==true)
					return _this.connect();
				else
					return _this.disconnect();
			});

			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			$('#publish-button').click(function() {
				return _this.publish();
			});

			/* Items*/
			$('#light_1').click(function() {
				var flag;
				
				if($('#light_1').hasClass('light-off')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/livingroom/light_1", flag);
			});
			
			$('#light_2').click(function() {
				var flag;
				
				if($('#light_2').hasClass('light-off')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/kitchen/light_2", flag);
			});

			$('#light_3').click(function() {
				var flag;
				
				if($('#light_3').hasClass('light-off')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bedroom/light_3", flag);
			});

			$('#light_4').click(function() {
				var flag;
				
				if($('#light_4').hasClass('light-off')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bathroom/light_4", flag);
			});

			$('#light_5').click(function() {
				var flag;
				
				if($('#light_5').hasClass('light-off')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bed/light_5", flag);
			});
			
			$('#motion_1').click(function() {
				var flag;
				
				if($('#motion_1').hasClass('motion-0')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/livingroom/motion_1", flag);
			});
			
			$('#motion_2').click(function() {
				var flag;
				
				if($('#motion_2').hasClass('motion-0')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/kitchen/motion_2", flag);
			});
			
			$('#motion_3').click(function() {
				var flag;
				
				if($('#motion_3').hasClass('motion-0')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bedroom/motion_3", flag);
			});
			
			$('#motion_4').click(function() {
				var flag;
				
				if($('#motion_4').hasClass('motion-0')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bathroom/motion_4", flag);
			});
			
			$('#motion_5').click(function() {
				var flag;
				
				if($('#motion_5').hasClass('motion-0')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bed/motion_5", flag);
			});
			

			$('#window_1').click(function() {
				var flag;
				
				if($('#window_1').hasClass('window-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/kitchen/window_1", flag);
			});

			$('#window_2').click(function() {
				var flag;
				
				if($('#window_2').hasClass('window-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/kitchen/window_2", flag);
			});

			$('#window_3').click(function() {
				var flag;
				
				if($('#window_3').hasClass('window-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bedroom/window_3", flag);
			});

			$('#window_4').click(function() {
				var flag;
				
				if($('#window_4').hasClass('window-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bedroom/window_4", flag);
			});

			$('#window_5').click(function() {
				var flag;
				
				if($('#window_5').hasClass('window-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bathroom/window_5", flag);
			});

			$('#window_6').click(function() {
				var flag;
				
				if($('#window_6').hasClass('window-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bed/window_6", flag);
			});
			
			$('#door_1').click(function() {
				var flag;
				
				if($('#door_1').hasClass('door-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/livingroom/door_1", flag);
			});
			
			$('#door_3').click(function() {
				var flag;
				
				if($('#door_3').hasClass('door-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bedroom/door_3", flag);
			});
			
			$('#door_4').click(function() {
				var flag;
				
				if($('#door_4').hasClass('door-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bathroom/door_4", flag);
			});
			
			$('#door_5').click(function() {
				var flag;
				
				if($('#door_5').hasClass('door-closed')){
					flag = "1";
				}else{
					flag = "0";
				}
				
				return _this.publish("myhouse/bed/door_5", flag);
			});
			
			$('#temperature_1').change(function(){
				return _this.publish("myhouse/livingroom/temp_1", $('#temperature_1').val());
			});
			
			$('#temperature_2').change(function(){
				return _this.publish("myhouse/kitchen/temp_2", $('#temperature_2').val());
			});
			
			$('#temperature_3').change(function(){
				return _this.publish("myhouse/bedroom/temp_3", $('#temperature_3').val());
			});
			
			$('#temperature_4').change(function(){
				return _this.publish("myhouse/bathroom/temp_4", $('#temperature_4').val());
			});
			$('#temperature_5').change(function(){
				return _this.publish("myhouse/bed/temp_5", $('#temperature_5').val());
			});
			
			/* Items*/

			mosq.onconnect = function(rc){
				if(rc=='0'){ alert("Connected successfully!");}				
				_this.subscribe();				
				var p = document.createElement("p");
				p.innerHTML = "CONNACK " + rc;
				$("#debug").append(p);				
				
				init_sequence();
			};			
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				p.innerHTML = "Lost connection";
				$("#debug").append(p);
			};
			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				p.innerHTML = "PUBLISH " + topic + " " + payload;
				$("#debug").append(p);	
				_this.change_items(topic, payload);
			};
		}
		
		Page.prototype.connect = function(){
			//var url = "ws://test.mosquitto.org:8080/mqtt";
			var url = "ws://localhost:1884/mqtt";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			//alert("YES SUB");
			mosq.subscribe("myhouse/+/+", 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		Page.prototype.publish = function(topic, payload){
			
			mosq.publish(topic, payload, 0);
		};
		Page.prototype.change_items = function(topic, payload){
			
			switch (topic.split("/")[1]){
				case "livingroom":					
					switch (topic.split("/")[2]){					
						case "light_1":
							if(payload == "1"){
								$("#light_1").removeClass("light-off").addClass("light-on");
							}else if(payload == "0"){
								$("#light_1").removeClass("light-on").addClass("light-off");
							}
							break;
						case "temp_1":
							if( parseInt(payload) >= 45){
								$("#t1").removeClass("temperature").addClass("temperature-warm");
							}else {
								$("#t1").removeClass("temperature-warm").addClass("temperature");
							}
							$("#temperature_1").val(payload);
							break;
						case "motion_1":
							if(payload == "1"){
								$("#motion_1").removeClass("motion-0").addClass("motion-1");
							}else if(payload == "0"){
								$("#motion_1").removeClass("motion-1").addClass("motion-0");
							}
							break;
						case "door_1":
							if(payload == "1"){
								$("#door_1").removeClass("door-closed").addClass("door-open");
							}else if(payload == "0"){
								$("#door_1").removeClass("door-open").addClass("door-closed");
							}
							break;
						default:
							break;
					}
					break;
				case "kitchen":
					switch (topic.split("/")[2]){					
						case "light_2":
							if(payload == "1"){
								$("#light_2").removeClass("light-off").addClass("light-on");
							}else if(payload == "0"){
								$("#light_2").removeClass("light-on").addClass("light-off");
							}
							break;
						case "motion_2":
							if(payload == "1"){
								$("#motion_2").removeClass("motion-0").addClass("motion-1");
							}else if(payload == "0"){
								$("#motion_2").removeClass("motion-1").addClass("motion-0");
							}
							break;
						case "temp_2":
							if( parseInt(payload) >= 45){
								$("#t2").removeClass("temperature").addClass("temperature-warm");
							}else {
								$("#t2").removeClass("temperature-warm").addClass("temperature");
							}
							break;
						case "window_1":
							if(payload == "1"){
								$("#window_1").removeClass("window-closed").addClass("window-open");
							}else if(payload == "0"){
								$("#window_1").removeClass("window-open").addClass("window-closed");
							}
							break;
						case "window_2":
							if(payload == "1"){
								$("#window_2").removeClass("window-closed").addClass("window-open");
							}else if(payload == "0"){
								$("#window_2").removeClass("window-open").addClass("window-closed");
							}
							break;
						default:
							break;
					}
					break;
				case "bedroom":
					switch (topic.split("/")[2]){					
						case "light_3":
							if(payload == "1"){
								$("#light_3").removeClass("light-off").addClass("light-on");
							}else if(payload == "0"){
								$("#light_3").removeClass("light-on").addClass("light-off");
							}
							break;
						case "motion_3":
							if(payload == "1"){
								$("#motion_3").removeClass("motion-0").addClass("motion-1");
							}else if(payload == "0"){
								$("#motion_3").removeClass("motion-1").addClass("motion-0");
							}
							break;
						case "temp_3":
							if( parseInt(payload) >= 45){
								$("#t3").removeClass("temperature").addClass("temperature-warm");
							}else {
								$("#t3").removeClass("temperature-warm").addClass("temperature");
							}
							break;
						case "window_3":
							if(payload == "1"){
								$("#window_3").removeClass("window-closed").addClass("window-open");
							}else if(payload == "0"){
								$("#window_3").removeClass("window-open").addClass("window-closed");
							}
							break;
						case "window_4":
							if(payload == "1"){
								$("#window_4").removeClass("window-closed").addClass("window-open");
							}else if(payload == "0"){
								$("#window_4").removeClass("window-open").addClass("window-closed");
							}
							break;
						case "door_3":
							if(payload == "1"){
								$("#door_3").removeClass("door-closed").addClass("door-open");
							}else if(payload == "0"){
								$("#door_3").removeClass("door-open").addClass("door-closed");
							}
							break;
						default:
							break;
					}
					break;
				case "bathroom":
					switch (topic.split("/")[2]){					
						case "light_4":
							if(payload == "1"){
								$("#light_4").removeClass("light-off").addClass("light-on");
							}else if(payload == "0"){
								$("#light_4").removeClass("light-on").addClass("light-off");
							}
							break;
						case "motion_4":
							if(payload == "1"){
								$("#motion_4").removeClass("motion-0").addClass("motion-1");
							}else if(payload == "0"){
								$("#motion_4").removeClass("motion-1").addClass("motion-0");
							}
							break;
						case "temp_4":
							if( parseInt(payload) >= 45){
								$("#t4").removeClass("temperature").addClass("temperature-warm");
							}else {
								$("#t4").removeClass("temperature-warm").addClass("temperature");
							}
							break;
						case "window_5":
							if(payload == "1"){
								$("#window_5").removeClass("window-closed").addClass("window-open");
							}else if(payload == "0"){
								$("#window_5").removeClass("window-open").addClass("window-closed");
							}
							break;
						case "door_4":
							if(payload == "1"){
								$("#door_4").removeClass("door-closed").addClass("door-open");
							}else if(payload == "0"){
								$("#door_4").removeClass("door-open").addClass("door-closed");
							}
							break;
						default:
							break;
					}
					break;
				case "bed":
					switch (topic.split("/")[2]){					
						case "light_5":
							if(payload == "1"){
								$("#light_5").removeClass("light-off").addClass("light-on");
							}else if(payload == "0"){
								$("#light_5").removeClass("light-on").addClass("light-off");
							}
							break;
						case "motion_5":
							if(payload == "1"){
								$("#motion_5").removeClass("motion-0").addClass("motion-1");
							}else if(payload == "0"){
								$("#motion_5").removeClass("motion-1").addClass("motion-0");
							}
							break;
						case "temp_5":
							if( parseInt(payload) >= 45){
								$("#t5").removeClass("temperature").addClass("temperature-warm");
							}else {
								$("#t5").removeClass("temperature-warm").addClass("temperature");
							}
							break;
						case "window_6":
							if(payload == "1"){
								$("#window_6").removeClass("window-closed").addClass("window-open");
							}else if(payload == "0"){
								$("#window_6").removeClass("window-open").addClass("window-closed");
							}
							break;
						case "door_5":
							if(payload == "1"){
								$("#door_5").removeClass("door-closed").addClass("door-open");
							}else if(payload == "0"){
								$("#door_5").removeClass("door-open").addClass("door-closed");
							}
							break;
						default:
							break;
					}
					break;
					
				default:
					break;
			}
		};
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);