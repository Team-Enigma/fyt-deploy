var app=app||{};$(".delete-ride").on("click",a=>{const b=$(a.target).parent().prev().val(),c={rideId:b};app.requester.delete(`/rides/${b}`,c).then(a=>{let b=JSON.parse(a);b.success?(app.notificator.showNotification(b.success,"success"),setTimeout(()=>{window.location.href="/profile"},1500)):b.error&&app.notificator.showNotification(b.error,"error")}).catch(a=>{let b=JSON.parse(a.responseJSON);app.notificator.showNotification(b.error,"error")})});