<%-- 
    Document   : index
    Created on : 28/05/2017, 11:57:57 AM
    Author     : CARLOS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP Page</title>
</head>
<body>
	<h1>Hello World! Logeado</h1>
	<h2>Bienvenido :</h2>${user.name}<br> ${user.username}

	<a href="${contextPath}/app/logout"> Close Sesion</a>
</body>


</html>
