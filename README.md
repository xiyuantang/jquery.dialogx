# jquery.dialogx
-------------------------------------------
依赖于Jquery的弹出对话框（模态对话框）
-------------------------------------------
var dialog = $.dialogx({
	'title':'支付信息',
	'content':$('#payingHtml').html(),
	'ctnWrapClass':'elastic-pupop-payrs',
	'afterRenderFunc':function(dialogx){ // 对显示出来的弹出框可以继续做处理
		...
	 }
});

var dialog = $.dialogx({
	'title':'支付信息',
	'content':$('#payingHtml').html(),
	'ctnWrapClass':'elastic-pupop-payrs',
	'afterRenderFunc':function(dialogx){ // 对显示出来的弹出框可以继续做处理
		$(".haveQuestionBtn",dialogx.htmlJqObj).click(function(){
			dialog.close();
			var dialogQuestion = $.dialogx({ // 嵌套第二层
				'title':'支付遇到问题',
				'content':$('#haveQuestionBtnHtml').html(),
				'ctnWrapClass':'elastic-pupop-payrs',
				'afterRenderFunc':function(dialogx){
					$(".repayBtn",dialogx.htmlJqObj).click(function(){
						dialogQuestion.close();
					});
				}
			});
		});
	 }
});

$.alertx('消息提示','充值金额必须大于0');
$.alertx('消息提示','充值金额必须大于0').delayClose(3); 延迟关闭不调用函数
$.alertx('消息提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟关闭并调用函数，回调-自动关闭
$.alertx('消息提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟关闭并调用函数，回调-手动关闭

$.errorAlertx('错误提示','充值金额必须大于0');
$.errorAlertx('错误提示','充值金额必须大于0').delayClose(3); 延迟关闭不调用函数
$.errorAlertx('错误提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟关闭并调用函数，回调-自动关闭
$.errorAlertx('错误提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟关闭并调用函数，回调-手动关闭

$.confirmx('确认提示','确认要删除吗？',function(dialogx){ console.log('触发确认按钮'); return true; });
$.confirmx('确认提示','确认要删除吗？',null,function(dialogx){ console.log('触发取消按钮'); return true; });
$.confirmx('确认提示','确认要删除吗？',function(dialogx){ console.log('触发确认按钮'); return true; },function(dialogx){ console.log('触发取消按钮'); return true; });

//---------------
//xxx.delayClose(参数1，参数二)  方法的应用
//	xxx.delayClose(3); 延迟3秒，自动关闭
//	xxx.delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟3秒，回调，自动关闭
//	xxx.delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟3秒，回调，手动关闭
