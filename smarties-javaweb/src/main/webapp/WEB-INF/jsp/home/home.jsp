<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Smarties</title>
</head>
<body>

<h1>Hello World! Smart Home!</h1>

<div id="broker">
	<h2>Broker</h2>
	<input class="but" id="connect-button" value="Connect" type="button">
	<input class="but" id="disconnect-button" value="Disconnect" type="button">
</div>
<div id="publish">
	<h2>Publish</h2>
	<p>Topic: <input class="txt" id="pub-topic-text" value="" type="text"></p>
	<p>Payload: <input class="txt" id="payload-text" value="" type="text"></p>
	<input class="but" id="publish-button" value="Publish" type="button">
</div>
<div id="subscribe">
	<h2>Subscribe/Unsubscribe</h2>
	<p>Topic: <input class="txt" id="sub-topic-text" value="$SYS/#" type="text"></p>
	<p>
	<input class="but" id="subscribe-button" value="Subscribe" type="button">
	<input class="but" id="unsubscribe-button" value="Unsubscribe" type="button">
	</p>
</div>
<div id="debug"></div>

</body>
</html>
<script src="<c:url value='/resources/js/smart-home.js' />"></script> 