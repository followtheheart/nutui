System.register(["./mobile-legacy.bd36ac6c.js","./vendor-legacy.e78d1288.js","./index-legacy.aaadf967.js"],(function(e){"use strict";var l,t,r,a,o,n,u;return{setters:[function(e){l=e.c},function(e){t=e.r,r=e.o,a=e.c,o=e.f,n=e.i,u=e.j},function(){}],execute:function(){const{createDemo:i}=l("uploader");var d=e("default",i({setup:()=>({onOversize:e=>{console.log("oversize 触发 文件大小不能超过 50kb",e)},beforeUpload:async e=>{const l=document.createElement("canvas"),t=l.getContext("2d"),r=await(e=>new Promise((l=>{const t=new FileReader;t.onloadend=e=>l(e.target.result),t.readAsDataURL(e)})))(e[0]),a=await(o=r,new Promise((e=>{const l=new Image;l.onload=()=>e(l),l.src=o})));var o;l.width=a.width,l.height=a.height,t.clearRect(0,0,a.width,a.height),t.drawImage(a,0,0,a.width,a.height);let n=await((e,l,t)=>new Promise((r=>e.toBlob((e=>r(e)),l,t))))(l,"image/jpeg",.5);return[await new File([n],e[0].name)]},onDelete:(e,l)=>{console.log("delete 事件触发",e,l)},uploadUrl:"https://my-json-server.typicode.com/linrufeng/demo/posts",formData:{custom:"test"}})}));const s={class:"demo bg-w"},c=o("h2",null,"基础用法",-1),m=o("h2",null,"自定义上传样式",-1),p=u("上传文件"),h=o("h2",null,"直接调起摄像头（移动端生效）",-1),f=o("h2",null,"上传状态",-1),g=o("h2",null,"限制上传数量5个",-1),w=o("h2",null,"限制上传大小（每个文件最大不超过 50kb）",-1),v=o("h2",null,"限制上传大小（在beforeupload钩子中处理）",-1),b=o("h2",null,"自定义数据 FormData 、 headers ",-1),U=o("h2",null,"禁用状态",-1);d.render=function(e,l,u,i,d,z){const D=t("nut-uploader"),y=t("nut-button");return r(),a("div",s,[c,o(D,{url:e.uploadUrl,onStart:e.start},null,8,["url","onStart"]),m,o(D,{url:e.uploadUrl},{default:n((()=>[o(y,{type:"primary",icon:"uploader"},{default:n((()=>[p])),_:1})])),_:1},8,["url"]),h,o(D,{capture:""}),f,o(D,{url:e.uploadUrl,multiple:"",onDelete:e.onDelete},null,8,["url","onDelete"]),g,o(D,{url:e.uploadUrl,multiple:"",maximum:"5"},null,8,["url"]),w,o(D,{url:e.uploadUrl,multiple:"",maximize:51200,onOversize:e.onOversize},null,8,["url","onOversize"]),v,o(D,{url:e.uploadUrl,multiple:"","before-upload":e.beforeUpload,maximize:51200,onOversize:e.onOversize},null,8,["url","before-upload","onOversize"]),b,o(D,{url:e.uploadUrl,data:e.formData,headers:e.formData,"with-credentials":!0},null,8,["url","data","headers"]),U,o(D,{disabled:""})])}}}}));
