package com.smarties.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Event implements Comparable<Item> {

	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private long id;
	private String name;
	private Integer val;
	
	public Event() {}	
	public Event(int value, String name) {
		super();
		this.name = name;
		this.val = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getVal() {
		return val;
	}
	public void setVal(Integer val) {
		this.val = val;
	}
	@Override
	public int compareTo(Item arg0) {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
