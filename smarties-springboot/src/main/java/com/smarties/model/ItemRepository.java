package com.smarties.model;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smarties.entities.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{

}
