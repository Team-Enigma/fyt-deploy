var app=app||{};!function(){class a{showNotification(a,b){toastr.options={closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!1,positionClass:"toast-top-right",preventDuplicates:!1,onclick:null,showDuration:"100",hideDuration:"100",timeOut:"3000",extendedTimeOut:"1000",showEasing:"linear",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},"success"===b?toastr.success(a):"error"===b?toastr.error(a):toastr.info(a)}}app.notificator=new a}();