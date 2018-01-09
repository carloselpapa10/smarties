/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.project.mappers;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.dao.DataAccessException;

import com.project.entities.User;

/**
 *
 * @author CARLOS
 */
public interface UserMapper {
    
    @Select("SELECT * FROM `user` WHERE `username`=#{username} AND `password`=#{password}")
    @Results(value = {
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name"),
            @Result(property = "username", column = "username"),
            @Result(property = "password", column = "password")
        }
    )
    public User login(User usr) throws DataAccessException;
    
    @Insert("")
    public Integer insertUser(User usr);
    
    @Update("")
    public Integer updateUser(User usr);
    
    @Delete("")
    public Integer deleteUser(User usr);
    
}
