/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project.services;

import com.project.entities.User;
import com.project.mappers.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author CARLOS
 */
@Service
public class UserService {
    
    @Autowired UserMapper mapper;
    
    public User login(User usr){        
        try{
            return mapper.login(usr);
        }catch (Exception ex) {
            /* save at log*/
        }
        return null;
    } 
    
    public Integer registerUser(User usr){
        try{
            return mapper.insertUser(usr);
        }catch (Exception ex) {
            
        }
        return 0;
    }
    
}
