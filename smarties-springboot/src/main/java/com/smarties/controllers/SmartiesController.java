package com.smarties.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.smarties.entities.Event;
import com.smarties.entities.Item;
import com.smarties.entities.Sequence;
import com.smarties.mappers.SmartiesMapper;
import com.smarties.model.EventRepository;
import com.smarties.model.ItemRepository;
import com.smarties.predictor.LZ78Predictor;
import com.smarties.predictor.MarkovAllKPredictor;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@Controller
public class SmartiesController{

	
	@Value("${smarties.config.minutes}")
    private int minutes;
	
	@Value("${smarties.config.hourMAX}")
    private int hourMax;
	
	@Value("${smarties.config.hourMIN}")
    private int hourMin;
	
	@Autowired
	private ItemRepository itemData;
	
	
	private final SmartiesMapper smartiesMapper;	
	
	public SmartiesController(SmartiesMapper smartiesMapper) {
		this.smartiesMapper = smartiesMapper;
	}
	
	@RequestMapping(value = "/addEvent", method = RequestMethod.POST, headers = "Accept=application/json")
	public void addEvent(@RequestParam("name") String name, @RequestParam("value") Integer val) {
		Item event = new Item(val, name);
		itemData.save(event);
	}
	
	
	
	@RequestMapping(value = "/getEventAll", method = RequestMethod.GET, headers = "Accept=application/json")
	public List<Item> getEvents(){
		List<Item> allEvents = itemData.findAll();
		return allEvents;
	}
	
	@RequestMapping(value = "/deleteEventAll", method = RequestMethod.DELETE, headers = "Accept=application/json")
	public void deleteEvents(){
		itemData.deleteAll();
	}
	
	@CrossOrigin(allowedHeaders="*",allowCredentials="true")
	@RequestMapping(value = "/getPredictionAKOM",
			method = RequestMethod.POST, 
			produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getPredictionAKOM(@RequestBody(required = false) List<Item> items){
		
		MarkovAllKPredictor predictor = new MarkovAllKPredictor();
		List<Sequence> training = new ArrayList<Sequence>();
		
		List<Item> allEvents = itemData.findAll();
		
		Sequence seq1 = new Sequence(-1);
		seq1.setItems(allEvents);
		training.add(seq1);
		
		predictor.Train(training);
		
		//Testing
		Sequence seqT = new Sequence(-1);
		seqT.setItems(items);
				
		Sequence result = predictor.Predict(seqT);
		
		return result.getItems().get(0).getVal().toString();
	}

	@CrossOrigin(allowedHeaders="*",allowCredentials="true")
	@RequestMapping(value = "/getPredictionLZ78",
			method = RequestMethod.POST, 
			produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String getPredictionLZ78(@RequestBody(required = false) List<Item> items){
		
		LZ78Predictor lz = new LZ78Predictor();
		Sequence s1 = new Sequence(1);
		LinkedList<Sequence> training = new LinkedList<Sequence>();
		
		List<Item> allEvents = itemData.findAll();
		
		s1.setItems(allEvents);
		training.add(s1);
		lz.Train(training);
		
		Sequence seq3 = new Sequence(-1);
		seq3.setItems(items);
		
		Sequence result = lz.Predict(seq3);
		
		System.out.println(lz.Predict(seq3));
		
		return result.getItems().get(0).getVal().toString();
		
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
