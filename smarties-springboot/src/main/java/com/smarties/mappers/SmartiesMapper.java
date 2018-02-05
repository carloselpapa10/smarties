package com.smarties.mappers;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SmartiesMapper {

	// 6, 14, 15, 16,17 motion items
	@Select("SELECT COUNT(*) FROM `Item6` WHERE `Time`>= #{time} and `Value`='ON' ")
	Integer checkMotion1Activity(@Param("time") String time);
	
	@Select("SELECT COUNT(*) FROM `Item14` WHERE `Time`>= #{time} and `Value`='ON'")
	Integer checkMotion2Activity(@Param("time") String time);
	
	@Select("SELECT COUNT(*) FROM `Item15` WHERE `Time`>= #{time} and `Value`='ON'")
	Integer checkMotion3Activity(@Param("time") String time);
	
	@Select("SELECT COUNT(*) FROM `Item16` WHERE `Time`>= #{time} and `Value`='ON'")
	Integer checkMotion4Activity(@Param("time") String time);
	
	@Select("SELECT COUNT(*) FROM `Item17` WHERE `Time`>= #{time} and `Value`='ON'")
	Integer checkMotion5Activity(@Param("time") String time);
	
}
