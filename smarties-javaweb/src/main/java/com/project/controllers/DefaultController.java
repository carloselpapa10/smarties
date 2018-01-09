/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author CARLOS
 */
@Controller
@RequestMapping("/")
public class DefaultController {
    
    @RequestMapping("/")
    public String main(){
        return "redirect:/app/main";
    }
}
