var app=app||{};$("#tb-update-message").on("click",()=>{const a=$("#tb-hidden-message-id").val(),b=$("#tb-message-status option:selected").text(),c={messageId:a,option:b};app.requester.put("/admin/messages",c).then(b=>{let c=JSON.parse(b);c.success?(app.notificator.showNotification(c.success,"success"),setTimeout(()=>{window.location.href=`/admin/messages/${a}`},1500)):c.error&&app.notificator.showNotification(c.error,"error")}).catch(a=>{let b=JSON.parse(a.responseJSON);app.notificator.showNotification(b.error,"error")})});