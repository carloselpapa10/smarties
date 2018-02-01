(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();

			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
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
			
			/* Items*/

			mosq.onconnect = function(rc){
				if(rc=='0'){ alert("Connected successfully!");}
				
				var p = document.createElement("p");
				p.innerHTML = "CONNACK " + rc;
				$("#debug").append(p);				
				
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
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		Page.prototype.publish = function(){
			var topic = $('#pub-topic-text')[0].value;
			var payload = $('#payload-text')[0].value;
			mosq.publish(topic, payload, 0);
		};
		Page.prototype.publish = function(topic, payload){
			mosq.publish(topic, payload, 0);
		};
		Page.prototype.change_items = function(topic, payload){
			switch (topic){
				case "myhouse/livingroom/light_1":
					if(payload == "1"){
						$("#light_1").removeClass("light-off").addClass("light-on");
					}else if(payload == "0"){
						$("#light_1").removeClass("light-on").addClass("light-off");
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