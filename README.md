# jquery.dialogx
-------------------------------------------
依赖于Jquery的弹出对话框（模态对话框）
-------------------------------------------
var dialog = $.dialogx({ <br />
  'title':'支付信息',<br />
  'content':$('#payingHtml').html(),<br />
  'ctnWrapClass':'elastic-pupop-payrs',<br />
  'afterRenderFunc':function(dialogx){ // 对显示出来的弹出框可以继续做处理<br />
  ...<br />
  }<br />
  });</p>
<p>var dialog = $.dialogx({<br />
  'title':'支付信息',<br />
  'content':$('#payingHtml').html(),<br />
  'ctnWrapClass':'elastic-pupop-payrs',<br />
  'afterRenderFunc':function(dialogx){ // 对显示出来的弹出框可以继续做处理<br />
  $(&quot;.haveQuestionBtn&quot;,dialogx.htmlJqObj).click(function(){<br />
  dialog.close();<br />
  var dialogQuestion = $.dialogx({ // 嵌套第二层<br />
  'title':'支付遇到问题',<br />
  'content':$('#haveQuestionBtnHtml').html(),<br />
  'ctnWrapClass':'elastic-pupop-payrs',<br />
  'afterRenderFunc':function(dialogx){<br />
  $(&quot;.repayBtn&quot;,dialogx.htmlJqObj).click(function(){<br />
  dialogQuestion.close();<br />
  });<br />
  }<br />
  });<br />
  });<br />
  }<br />
  });</p>
<p>$.alertx('消息提示','充值金额必须大于0');<br />
  $.alertx('消息提示','充值金额必须大于0').delayClose(3); 延迟关闭不调用函数<br />
  $.alertx('消息提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟关闭并调用函数，回调-自动关闭<br />
  $.alertx('消息提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟关闭并调用函数，回调-手动关闭</p>
<p>$.errorAlertx('错误提示','充值金额必须大于0');<br />
  $.errorAlertx('错误提示','充值金额必须大于0').delayClose(3); 延迟关闭不调用函数<br />
  $.errorAlertx('错误提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟关闭并调用函数，回调-自动关闭<br />
  $.errorAlertx('错误提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟关闭并调用函数，回调-手动关闭</p>
<p>$.confirmx('确认提示','确认要删除吗？',function(dialogx){ console.log('触发确认按钮'); return true; });<br />
  $.confirmx('确认提示','确认要删除吗？',null,function(dialogx){ console.log('触发取消按钮'); return true; });<br />
  $.confirmx('确认提示','确认要删除吗？',function(dialogx){ console.log('触发确认按钮'); return true; },function(dialogx){ console.log('触发取消按钮'); return true; });</p>
<p>//---------------<br />
  //xxx.delayClose(参数1，参数二)  方法的应用<br />
  //	xxx.delayClose(3); 延迟3秒，自动关闭<br />
  //	xxx.delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟3秒，回调，自动关闭<br />
  //	xxx.delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟3秒，回调，手动关闭<br />
