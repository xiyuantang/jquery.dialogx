/**
 * 弹出对话框
 * create time 	:	2015-12-04
 * author		:	janchou
 * company		:	bizcn.com
 * project		:	ming.bizcn.com
 */
//var dialog = $.dialogx({
//	'title':'支付信息',
//	'content':$('#payingHtml').html(),
//	'ctnWrapClass':'elastic-pupop-payrs',
//	'afterRenderFunc':function(dialogx){ // 对显示出来的弹出框可以继续做处理
//		...
//	 }
//});

//var dialog = $.dialogx({
//	'title':'支付信息',
//	'content':$('#payingHtml').html(),
//	'ctnWrapClass':'elastic-pupop-payrs',
//	'afterRenderFunc':function(dialogx){ // 对显示出来的弹出框可以继续做处理
//		$(".haveQuestionBtn",dialogx.htmlJqObj).click(function(){
//			dialog.close();
//			var dialogQuestion = $.dialogx({ // 嵌套第二层
//				'title':'支付遇到问题',
//				'content':$('#haveQuestionBtnHtml').html(),
//				'ctnWrapClass':'elastic-pupop-payrs',
//				'afterRenderFunc':function(dialogx){
//					$(".repayBtn",dialogx.htmlJqObj).click(function(){
//						dialogQuestion.close();
//					});
//				}
//			});
//		});
//	 }
//});

//$.alertx('消息提示','充值金额必须大于0');
//$.alertx('消息提示','充值金额必须大于0').delayClose(3); 延迟关闭不调用函数
//$.alertx('消息提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟关闭并调用函数，回调-自动关闭
//$.alertx('消息提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟关闭并调用函数，回调-手动关闭

//$.errorAlertx('错误提示','充值金额必须大于0');
//$.errorAlertx('错误提示','充值金额必须大于0').delayClose(3); 延迟关闭不调用函数
//$.errorAlertx('错误提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟关闭并调用函数，回调-自动关闭
//$.errorAlertx('错误提示','充值金额必须大于0').delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟关闭并调用函数，回调-手动关闭

//$.confirmx('确认提示','确认要删除吗？',function(dialogx){ console.log('触发确认按钮'); return true; });
//$.confirmx('确认提示','确认要删除吗？',null,function(dialogx){ console.log('触发取消按钮'); return true; });
//$.confirmx('确认提示','确认要删除吗？',function(dialogx){ console.log('触发确认按钮'); return true; },function(dialogx){ console.log('触发取消按钮'); return true; });

//---------------
//xxx.delayClose(参数1，参数二)  方法的应用
//	xxx.delayClose(3); 延迟3秒，自动关闭
//	xxx.delayClose(3,function(dialogx){ console.log('关闭前调用'); return true;}); 延迟3秒，回调，自动关闭
//	xxx.delayClose(3,function(dialogx){ console.log('关闭前调用'); dialogx.close(); return false;}); 延迟3秒，回调，手动关闭

(function($){
	var Dialog = function(option){
		// 配置选项
		this.defaultOpts = {
			'title':'标题',
			'content':'内容',
			'ctnWrapClass':'elastic-pupop-payrs',
			'beforeRenderFunc':function(thisTemp){},
			'afterRenderFunc':function(thisTemp){
				thisTemp.htmlJqObj.find('.js-yes-btn').off('click').on('click', function () {
					thisTemp.close();
				});
				
				thisTemp.htmlJqObj.find('.js-cancle-btn').off('click').on('click', function () {
					thisTemp.close();
				});
			},
			'ctxSelect':'body',
			'trigger':null
		};
		this.options = {};
		this.htmlJqObj = null;
		// 配置选项
		this.initOpts = function(options){
			this.options = $.extend({},this.defaultOpts,options);	
		};
		// 显示对话框
		this.show = function(options){
			var thisTemp = this;
			thisTemp.initOpts(options);
			var html = '<div class="elastic-layer" style="display:block;">'+
						    '<p class="elastic-mask"></p>'+
						    '<div class="elastic-pupop '+thisTemp.options['ctnWrapClass']+'">'+
						        '<div class="elastic-close elastic-title-name clearfix">'+
						            '<span class="floatl">'+thisTemp.options['title']+'</span>'+
						            '<i class="icon icon-close js-close"></i>'+
						        '</div>'+
						        '<div class="elastic-con">'+
						        thisTemp.options['content'] +
						        '</div>'+
						    '</div>'+
						'</div>';
			thisTemp.htmlJqObj = $(html);
			thisTemp.htmlJqObj.find('.js-close').off('click').on('click', function () {
				thisTemp.close();
			});
			thisTemp.options.beforeRenderFunc(thisTemp); //!!
			thisTemp.htmlJqObj.appendTo(thisTemp.options['ctxSelect']);
			thisTemp.options.afterRenderFunc(thisTemp); //!!
			return thisTemp;
		};
		// 关闭对话框
		this.close = function(){
			thisTemp = this;
			thisTemp.htmlJqObj.fadeOut('normal',function(){
				thisTemp.htmlJqObj.remove();
			});
		}
		
		// 延迟关闭
		this.delayClose = function(seconds,callback){
			seconds = parseInt(seconds);
			var thisTemp = this;
			var callbackTemp = callback;
			var delayCloseSeconds = seconds;
			var setTimeoutHandler = null;
			var setTimeoutFunc = function(){
				if(delayCloseSeconds > 0){
					thisTemp.htmlJqObj.find('.form-list .delay-close-clock').remove();
					thisTemp.htmlJqObj.find('.form-list').append('<div class="center delay-close-clock">还有'+delayCloseSeconds+'秒，自动关闭</div>');
					clearTimeout(setTimeoutHandler);
					setTimeoutHandler = setTimeout(setTimeoutFunc,1000);
					delayCloseSeconds = delayCloseSeconds - 1;
				}
				else{
					clearTimeout(setTimeoutHandler);
					if((typeof callbackTemp)=='function'){
						if(callbackTemp(thisTemp)){
							thisTemp.close();
						}
					}
					else{
						thisTemp.close();
					}
				}
			};
			setTimeoutFunc();
		}
		this.initOpts(option);
	}
	
	jQuery.extend({
		  //对话框
		  dialogx: function(opts) {
			    var dialog = new Dialog();
				dialog.show(opts);
				return dialog;
		  },
		  //提示弹出
		  alertx: function(title,msg) {
				if(typeof msg=='undefined'){
					 msg = title;
				}
				var dialog = new Dialog();
				dialog.show({
					'title':title,
					'content':'<div class="form-list"><br><p class="center">'+msg+'</p><br><br><div class="center"><a class="btn btn-blue js-yes-btn" href="javascript:void(0);">确定</a></div><br /></div>',
					'ctnWrapClass':'elastic-pupop-sl'
				});
				return dialog;
		  },
		  //确认框
		  confirmx: function(title,msg,yesCallback,cancleCallback) {
			  var dialog = new Dialog();
			  var options = {
				  'title':title,
				  'content':'<div class="form-list"><br><p class="center">'+msg+'</p><br><br><div class="center"><a class="btn btn-blue js-yes-btn" href="javascript:void(0);">确定</a><a class="btn btn-gray btn-h30 js-cancle-btn" href="javascript:void(0);">取消</a></div><br /></div>',
				  'ctnWrapClass':'elastic-pupop-sl'
			  };
			  if(((typeof yesCallback)=='function')&&
				  (typeof cancleCallback)=='function'){
				  options['afterRenderFunc'] = function(thisTemp){
					  	dialog.htmlJqObj.find('.js-yes-btn').click( function () {
					  		if(yesCallback(dialog)){
								dialog.close(); 
							}
						});
						thisTemp.htmlJqObj.find('.js-cancle-btn').click( function () {
							if(cancleCallback(dialog)){
								dialog.close(); 
							}
						});
					};
			  }
			  else if((typeof yesCallback)=='function'){
				  options['afterRenderFunc'] = function(thisTemp){
					    dialog.htmlJqObj.find('.js-yes-btn').click( function () {
							if(yesCallback(dialog)){
								dialog.close(); 
							}
						});
					    dialog.htmlJqObj.find('.js-cancle-btn').click( function () {
					    	dialog.close();
						});
					};
			  }
			  else if((typeof cancleCallback)=='function'){
				  options['afterRenderFunc'] = function(thisTemp){
					  dialog.htmlJqObj.find('.js-yes-btn').click( function () {
						  dialog.close();
					  });
					  dialog.htmlJqObj.find('.js-cancle-btn').click( function () {
						  if(cancleCallback(dialog)){
							  dialog.close(); 
						  }
					  });
				  };
			  }
			  dialog.show(options);
			  return dialog;
		  },
		  //错误弹出
		  errorAlertx: function(title,msg) {
			  if(typeof msg=='undefined'){
				  msg = title;
			  }
			  var dialog = new Dialog();
			  dialog.show({
				  'title':title,
				  'content':'<div class="form-list"><br><p class="elastic-tips center">'+msg+'</p><br><div class="center"><a class="btn btn-blue js-yes-btn" href="javascript:void(0);">确定</a></div><br /></div>',
				  'ctnWrapClass':'elastic-pupop-sl'
			  });
			  return dialog;
		  },
	});
	
	jQuery.fn.extend({
		  bindDialogx: function(type,opts) {
		    return this.each(function(type,opts){
				$(this).bind(type, function(){
					opts['trigger'] = this;
					var dialog = new Dialog();
					dialog.show(opts);
				});
		    });
		  },
		  delegateDialogx: function(selector,type,opts) {
			  return this.each(function(type,opts){
				  $(this).delegate(selector,type,function(){
					  opts['trigger'] = this;
					  var dialog = new Dialog();
					  dialog.show(opts);
				  });
			  });
		  },
	});
})(jQuery);