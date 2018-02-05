package com.smarties.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.smarties.mappers.SmartiesMapper;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class SmartiesController{

	
	@Value("${smarties.config.minutes}")
    private int minutes;
	
	@Value("${smarties.config.hourMAX}")
    private int hourMax;
	
	@Value("${smarties.config.hourMIN}")
    private int hourMin;
	
	
	private final SmartiesMapper smartiesMapper;	
	
	public SmartiesController(SmartiesMapper smartiesMapper) {
		this.smartiesMapper = smartiesMapper;
	}
	
	//@CrossOrigin(origins = "http://localhost:8090")
	@RequestMapping(value = "/noOneAtHome", method = RequestMethod.GET, headers = "Accept=application/json")
	public boolean motionActivity() {
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, - minutes);
		
		String time = dateFormat.format(cal.getTime());
		
		if(cal.getTime().getHours() > hourMin && cal.getTime().getHours() < hourMax ) {
			
			if(this.smartiesMapper.checkMotion1Activity(time) == 0 &&
			 		this.smartiesMapper.checkMotion2Activity(time) == 0 &&
			 		this.smartiesMapper.checkMotion3Activity(time) == 0 &&
			 		this.smartiesMapper.checkMotion4Activity(time) == 0 &&
			 		this.smartiesMapper.checkMotion5Activity(time) == 0) {
				
				return true;
			}
		}

		return false;
	}
	
	@RequestMapping(value = "/time", method = RequestMethod.GET, headers = "Accept=application/json")
	public String time() {		

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, - minutes);
		
		String time = dateFormat.format(cal.getTime());
		
		return time;
	}

}
