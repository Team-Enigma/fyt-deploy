var app=app||{};$("#tb-update-car").on("click",()=>{const a=$("#tb-manufacturer").val(),b=$("#tb-model").val(),c=$("#tb-seats option:selected").text(),d=$("#tb-fuel-type option:selected").text(),e=$("#tb-transmission-type option:selected").text(),f=$("#tb-registration-number").val(),g={manufacturer:a,model:b,seats:c,fuelType:d,transmissionType:e,registrationNumber:f};app.validator.validateUpdateCar(g)&&app.requester.put("/profile/update-car",g).then(a=>{let b=JSON.parse(a);b.success?(app.notificator.showNotification(b.success,"success"),setTimeout(()=>{window.location.href="/profile"},1500)):b.error&&app.notificator.showNotification(b.error,"error")}).catch(a=>{let b=JSON.parse(a);app.notificator.showNotification(b.error,"error")})});