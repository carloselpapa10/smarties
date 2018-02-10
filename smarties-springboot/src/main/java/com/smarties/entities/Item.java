package com.smarties.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Item implements Comparable<Item>{
	
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private long id;
	private String name;
	public Integer val;
		
	public Item(Integer value) {
		this.val = value;
	}
	
	public Item(Integer value, String name) {
		this.val = value;
		this.name = name;
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
	public Item clone() {
		return new Item(val);
	}
	
	public Item() {
		this.val = -1;
	}
		
	public String toString() {
		return val.toString();
	}
	
	public int hashCode() {
		return val.hashCode();
	}
	

	public boolean equals(Item b) {
		return val.equals(b.val);
	}
	
	@Override
	public boolean equals(Object obj) {
		Item b = (Item) obj;
		return val.equals(b.val);
	};

	@Override
	public int compareTo(Item o) {
		return this.val.compareTo(o.val);
	}
}
