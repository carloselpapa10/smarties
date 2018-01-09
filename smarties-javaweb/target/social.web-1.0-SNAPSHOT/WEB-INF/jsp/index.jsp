<%-- 
    Document   : index
    Created on : 28/05/2017, 10:48:13 AM
    Author     : CARLOS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World! Everson =)</h1>

        <form action="${contextPath}/app/login" method="post">
            username:<br>
            <input type="text" name="username" value="">
            <br>
            password:<br>
            <input type="password" name="password" value="">
            <br><br>
            <input type="submit" value="Submit">
        </form> 
           
        <c:if test="${error!= null}">
            ${error}
        </c:if>
</body>
</html>
