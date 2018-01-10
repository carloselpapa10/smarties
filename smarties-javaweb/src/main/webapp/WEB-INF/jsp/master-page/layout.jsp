<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 		<tiles:insertAttribute name="style-css" />
        <title><tiles:insertAttribute name="title" /></title>
        <tiles:insertAttribute name="script-js" />
	</head>
	
	<body>
        <tiles:insertAttribute name="header" />

        <tiles:insertAttribute name="body" />
        
	</body> 
	<tiles:insertAttribute name="footer" />
</html>