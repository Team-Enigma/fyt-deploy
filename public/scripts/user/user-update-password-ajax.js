var app=app||{};$("#tb-update-password").on("click",()=>{const a=$("#tb-password").val(),b=$("#tb-new-password").val(),c=$("#tb-new-password-confirm").val(),d={oldPassword:a,newPassword:b,newPasswordConfirm:c};app.validator.validateUpdatePassword(d)&&app.requester.put("/profile/update-password",d).then(a=>{let b=JSON.parse(a);b.success?(app.notificator.showNotification(b.success,"success"),setTimeout(()=>{window.location.href="/profile"},1500)):b.error&&app.notificator.showNotification(b.error,"error")}).catch(a=>{let b=JSON.parse(a.responseJSON);app.notificator.showNotification(b.error,"error")})});