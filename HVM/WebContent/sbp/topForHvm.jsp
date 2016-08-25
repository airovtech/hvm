<%@ page language="java" contentType="text/html; charset=utf-8"%>
		<script type="text/javascript">
		// 공통 실행부분
		$(function(){
			$("#logout").click(function(){
				document.location.href="/login/logout.jsp";
			});
			
			$("#topList").click(function(){
				cleanCheckToList();
			});

			$("#topNewDoc").click(function(){
				if($("#btnReset").length == 0){
					document.location.href="/sbp/panel8.jsp";
				} else {
					cleanCheck();
				}
			});
		});
		</script>
		<div id="wrap2">
			<div id="top">
				<div id="topMenu">
				</div>
			</div>
		</div>