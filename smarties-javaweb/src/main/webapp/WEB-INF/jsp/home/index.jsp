<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" type="text/css" href="../../resources/css/smart-home.css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Smarties</title>
</head>
<body>




<h1 class="hello">MQTT web sockets test!</h1>

<div id="broker" style="height:200px; width: 50%; margin: 0 auto;">
	<h2>Broker</h2>
	<label class="switch">
	<input class="but" id="check" name="check" type="checkbox">
	<span class="slider" id="lol"></span>
	</label>
</div>




<div id="house" class="house">

	<div id="light_1" class="light-off" style="top:100px;  left:130px" ></div>
	<div id="temperature_1" class="temperature" style="top:205px; left:10px;"></div>
	<div id="heater" class="heater-off" style="top:20px; left:20px;"></div>
	<div id="motion_1" class="motion-0" style="top:150px; left:0px;"></div>
	
<!-- kitchen canvas -->
	<canvas id="kitchenCanvas" class="kitchencanvas">
	Your browser does not support the HTML5 canvas tag.
	</canvas>
<!-- kitchen items -->
	<div id="light_2" class="light-off" style="top:320px;  left:250px;" ></div>
	<div id="window_1" class="window-closed" style="top:420px;  left:150px;" ></div>
	<div id="window_2" class="window-closed" style="top:420px; left:350px;"></div>
	<div id="temperature_2" class="temperature" style="top:375px; left:10px;"></div>
	<div id="motion_2" class="motion-0" style="top:250px; left:310px;"></div>
	
	
<!-- bedroom1 canvas -->
	<canvas id="bed1Canvas" class="bed1canvas">
	Your browser does not support the HTML5 canvas tag.
	</canvas>
<!-- bedroom1 items -->
	<div id="light_3" class="light-off" style="top:290px;  left:770px" ></div>
	<div id="window_3" class="window-closed" style="top:420px; left:800px;"></div>
	<div id="window_4" class="window-closed" style="top:300px; left:1020px;"></div>
	<div id="temperature_3" class="temperature" style="top:375px; left:570px;"></div>
	<div id="motion_3" class="motion-0" style="top:190px; left:670px;"></div>
	
<!-- bathroom canvas -->
	<canvas id="bathCanvas" class="bathcanvas">
	Your browser does not support the HTML5 canvas tag.
	</canvas>
<!-- bathroom  items -->
	<div id="light_4" class="light-off" style="top:75px;  left:860px" ></div>
	<div id="window_5" class="window-closed" style="top:80px; left:1020px;"></div>
	<div id="temperature_4" class="temperature" style="top:150px; left:950px;"></div>
	<div id="humidity" class="humidity-off" style="top:150; left:760px;"></div>
	<div id="motion_4" class="motion-0" style="top:155px; left:750px;"></div>
	

<!-- bedroom2 canvas -->
	<canvas id="bed2Canvas" class="bed2canvas">
	Your browser does not support the HTML5 canvas tag.
	</canvas>

<!-- bedroom2 items -->
	<div id="light_5" class="light-off" style="top:60px;  left:500px" ></div>
	<div id="window_6" class="window-closed" style="top:-35px; left:500px;"></div>
	<div id="temperature_5" class="temperature" style="top:110px; left:305px;"></div>
	<div id="motion_5" class="motion-0" style="top:120px; left:410px;"></div>
</div>


<div id="debug"></div>


</body>
</html>
<script type="text/javascript">
var canvas = document.getElementById("kitchenCanvas");
var ctx = canvas.getContext("2d");
var canvas = document.getElementById("bed2Canvas");
var ctx = canvas.getContext("2d");
var canvas = document.getElementById("bathCanvas");
var ctx = canvas.getContext("2d");
var canvas = document.getElementById("bed1Canvas");
var ctx = canvas.getContext("2d");
</script>
<script src="<c:url value='/resources/js/tmo.js' />"></script>


