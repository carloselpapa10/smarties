/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project.controllers;

import com.project.entities.User;
import com.project.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author CARLOS
 */
@Controller
@RequestMapping("/app")
public class AppController {
    
    @Autowired UserService svc_usr;
    
    @RequestMapping("/main")
    public String principal(){
        return "home/index";
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginUser(@RequestParam("username") String usr, @RequestParam("password") String pwd, ModelMap model){
        
        User user;
        
        if(usr== "" && pwd == ""){
            model.put("error", "You should fill the fields");
            return "index";
        }
        
        user = svc_usr.login(new User(usr, pwd));
        
        if(user!=null){
            model.put("user", user);
            return "general/index";
        }
        
        model.put("error", "User does not exits...");
        return "index";
    }
    
    @RequestMapping("logout")
    public String logout(){
        return "index";
    }
    
}
