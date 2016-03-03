<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Beaulletin</title>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="_csrf" content="${_csrf.token}">
<meta name="_csrf_header" content="${_csrf.headerName}">
<!-- Core CSS Library-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- Customized Global CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/app/css/global.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/app/css/login.css">

</head>
<body>
	
	<div id="user">
		<div class="text-primary"><h4 id="welcomeMsg"></h4></div>
	</div>
	<div id="account-box">
		<form action='<c:url value="/security_check" />' id="loginform" method="post">
			<%-- <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> --%>
			<p>Enter email and password to login.</p>
			<div id="login-error-container"></div>
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				<input name="username" class="form-control" type="text" id="username" placeholder="Email" />
			</div>
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				<input name="password" class="form-control" type="password" id="password" placeholder="Password" />
			</div>
			<div class="form-actions clearfix">
				<input type="submit" class="btn btn-block btn-primary btn-default" value="Log in" />
			</div>
		</form>
	</div>
	
	<script src="${pageContext.request.contextPath}/resources/l/js/jquery-2.1.3.min.js" type="text/javascript"></script>
	<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	
	<script src="${pageContext.request.contextPath}/resources/b/js/bootstrap.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/app/js/global.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/app/js/login.js" type="text/javascript"></script>
</body>
</html>