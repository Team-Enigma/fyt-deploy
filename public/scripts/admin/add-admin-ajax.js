var app=app||{};$("#tb-add-admin").on("click",()=>{const a=$("#tb-username").val(),b={username:a};app.requester.put("/admin",b).then(a=>{let b=JSON.parse(a);b.success?(app.notificator.showNotification(b.success,"success"),setTimeout(()=>{window.location.href="/admin"},1500)):b.error&&app.notificator.showNotification(b.error,"error")}).catch(a=>{let b=JSON.parse(a.responseJSON);app.notificator.showNotification(b.error,"error")})});