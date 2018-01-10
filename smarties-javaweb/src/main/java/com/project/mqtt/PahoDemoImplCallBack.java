package com.project.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class PahoDemoImplCallBack implements MqttCallback{

	@Override
	public void connectionLost(Throwable arg0) {
		// TODO Auto-generated method stub
		System.out.println("The connection with the server is lost. !!!!");
	}

	@Override
	public void deliveryComplete(IMqttDeliveryToken arg0) {
		// TODO Auto-generated method stub
		System.out.println("The delivery has been complete. The delivery token is " + arg0.toString());
	}

	@Override
	public void messageArrived(String arg0, MqttMessage message) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("A new message arrived from the topic: \"" + arg0 + "\". The payload of the message is " + message.toString());
	}

}
