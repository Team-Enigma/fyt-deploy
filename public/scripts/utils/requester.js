var app=app||{};!function(){function a(a,b,c){return new Promise((d,e)=>{$.ajax({url:b,data:c?c:null,method:a,success(a){d(a)},error(a){e(a)}})})}function b(a,b,c){return new Promise((a,d)=>{$.ajax({async:!0,url:b,type:"POST",data:c,contentType:!1,processData:!1,cache:!1,success(b){a(b)},error(a){d(a)}})})}class c{get(b){return a("GET",b)}post(b,c){return a("POST",b,c)}postFile(a,c){return b("POST",a,c)}put(b,c){return a("PUT",b,c)}delete(b,c){return a("DELETE",b,c)}}app.requester=new c}();