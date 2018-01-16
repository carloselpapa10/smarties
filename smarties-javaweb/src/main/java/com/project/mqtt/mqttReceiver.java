package com.project.mqtt;


public class mqttReceiver {

	public void logMessages(String message) {
		String processed_data = message; //TODO Process Data
		System.out.println("SIIIIII =>>> "+processed_data);	
	}
}
