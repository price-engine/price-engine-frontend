!function(){if(!document)return;let e=document.currentScript,t=e.getAttribute("data-api")?`${location.protocol}//${e.getAttribute("data-api")}/`:e.src.replace(/[^\/]+$/,"api/"),a=()=>Date.now().toString(36)+Math.random().toString(36).substr(2),n=a(),r=!0,o=Date.now(),i=!1,p=history.pushState,d=history.replaceState,c=()=>{r=!1,n=a(),o=Date.now(),i=!1},l=e=>function(t,a,n){n&&location.pathname!==new URL(n,location.href).pathname?(g(),c(),e.apply(this,arguments),h()):e.apply(this,arguments)},s=(e,t)=>(e.getAttribute(`data-m:${t}`)||"").split(";").reduce((e,t)=>{let[a,n]=t.split("=").map(e=>e.trim());return a&&n&&(e[a]=n),e},{}),u=e=>new Promise(t=>{let a=new XMLHttpRequest;a.onload=()=>{t(0==a.responseText)},a.open("GET",e),a.setRequestHeader("Content-Type","text/plain"),a.send()}),h=async()=>{u(t+"event/ping?u="+encodeURIComponent(location.host+location.pathname)).then(e=>{fetch(t+"event/hit",{method:"POST",body:JSON.stringify({b:n,e:"load",u:location.href,r:document.referrer,p:r,q:e,t:Intl.DateTimeFormat().resolvedOptions().timeZone,d:[...document.querySelectorAll("[data-m\\:load]")].reduce((e,t)=>({...e,...s(t,"load")}),{})}),mode:"no-cors"})})},g=()=>{i||navigator.sendBeacon(t+"event/hit",JSON.stringify({b:n,e:"unload",m:Date.now()-o})),i=!0},m=e=>{if(e.button>1||!(e.target instanceof HTMLElement))return;let a=s(e.target,"click");Object.keys(a).length>0&&fetch(t+"event/hit",{method:"POST",body:JSON.stringify({b:n,e:"custom",g:location.hostname,d:a}),mode:"no-cors"})};setInterval(()=>{for(let e of document.querySelectorAll("[data-m\\:click]"))e.addEventListener("click",m),e.addEventListener("auxclick",m)},1e3),"onpagehide"in self?addEventListener("pagehide",g,{capture:!0}):(addEventListener("beforeunload",g,{capture:!0}),addEventListener("unload",g,{capture:!0})),addEventListener("visibilitychange",()=>{document.hidden&&g()},{capture:!0}),u(t+"event/ping").then(t=>{r=t,h(),e.getAttribute("data-hash")?addEventListener("hashchange",h,{capture:!0}):(history.pushState=l(p),history.replaceState=l(d),addEventListener("popstate",()=>{g(),c(),h()},{capture:!0}))})}();