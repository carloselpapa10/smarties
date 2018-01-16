Steps to configure the mosquitto environment

1. Install mosquitto following these steps.
	a. Add the mosquitto repository by given below commands
		$sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
	   	$sudo apt-get update
	   
	b. Execute the given below command to install the Mosquitto broker package
		$sudo apt-get install mosquitto
	
	c. Install Mosquitto developer libraries to develop MQTT clients
		sudo apt-get install libmosquitto-dev
	
	d. Execute the given below command to install Mosquitto client packages
		$sudo apt-get install mosquitto-clients
	
	e. Ensure that Mosquitto broker is running
		$sudo service mosquitto status
		
	f. Ensure that Mosquitto broker is running
		$sudo service mosquitto status 
		
	h. Testing		
		Use two terminals to test mqtt protocol
		
		$mosquitto_sub -h localhost -t "mqtt" -v
		
		$mosquitto_pub -h localhost -t "mqtt" -m "Hello MQTT"
	
	This informartion is provided by this link http://wingsquare.com/blog/setting-up-mqtt-mosquitto-broker-in-ubuntu-linux/
	
2. Go to the folder located at /etc/mosquitto/conf.d/ and create a new file called configuration.conf. Inside the file paste this:
	listener 1883
	protocol mqtt

	listener 1884
	protocol websockets

	connection_messages true

3. restart mosquitto
	sudo service mosquitto restart
	
4. To test websockets, let's use a public, browser-based MQTT client. There are a few out there, but mqtt-admin is simple and straightforward
	
	https://hobbyquaker.github.io/mqtt-admin/
	
	protocol= ws
	hostname= localhost
	port= 1884	
	username=
	password=
	clientId= mqtt-admin
	
Once we configure these steps successfully. we can start to use PAHO MQTT js using web sockets.

MQTT Javascript Client
https://www.eclipse.org/paho/clients/js/
https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js
https://www.hivemq.com/blog/build-javascript-mqtt-web-application
https://www.hivemq.com/blog/build-javascript-mqtt-web-application
http://jsfiddle.net/gLBsu/3/?utm_source=website&utm_medium=embed&utm_campaign=gLBsu
https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js
https://www.hivemq.com/blog/mqtt-toolbox-mqtt-spy
http://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
https://www.eclipse.org/paho/clients/js/

	
		