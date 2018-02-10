package com.smarties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@SpringBootApplication
public class SmartiesApplication{

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SpringApplication.run(SmartiesApplication.class, args);
	}

}
