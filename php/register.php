<?php
	//接收客户端请求的数据
	header("content-type:text/html;charset=utf-8");
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	$utele=$_POST["tele"];
	$conf=$_POST["confir"];

	//连接数据源
	$db = mysql_connect("localhost","root","root");
	
	//打开数据源
	mysql_select_db("db1705",$db);  //参数为  数据库名称      数据源主机名称  
	
	//设置字符编码
	mysql_query( "set names utf8" ); 
	
	//编写sql语句
	$sql = "insert into users(tele,uname,upwd,conf) values ('$utele','$uname','$upwd','$conf')";

	//执行sql语句
	
	$res = mysql_query($sql); //成功 返回1  不成功返回0
	
	if( $res ){
		echo "<script>alert('注册成功了');location.href='http://127.0.0.1/project/login.html';</script>";
	}else{
		echo "<script>alert('注册失败了');</script>";
	}
?>










?>