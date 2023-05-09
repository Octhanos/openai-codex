(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p="/assets/bot-61bdb6bf.svg",f="/assets/user-bcdeb18e.svg",c=document.querySelector("form"),i=document.querySelector("#chat_container");let d;document.addEventListener("DOMContentLoaded",async t=>{let n=await fetch("http://localhost:5000/consultApiKey");n=await n.json(),console.log(n)});document.querySelector("#apikey-btn").addEventListener("click",async t=>{const n=document.querySelector("#apikey-input").value;let o=await fetch("http://localhost:5000/updateApiKey",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({value:n})});o=await o.json(),console.log(o)});function m(t){t.textContent="",d=setInterval(()=>{t.textContent+=".",t.textContent==="...."&&(t.textContent="")},300)}function y(t,n){let o=0,s=setInterval(()=>{o<n.length?(t.innerHTML+=n.charAt(o),o++):clearInterval(s)},20)}function h(){const t=Date.now(),o=Math.random().toString(16);return`id-${t}-${o}`}function l(t,n,o){return`
      <div class="wrapper ${t&&"ai"}">
        <div class="chat">
          <div class="profile">
            <img
              src="${t?p:f}"
              alt="${t?"bot":"user"}"
            />
          </div>
          <div class="message" id=${o}>${n}</div>
        </div>
      </div>
    `}const u=async t=>{t.preventDefault();const n=new FormData(c);i.innerHTML+=l(!1,n.get("prompt")),c.reset();const o=h();i.innerHTML+=l(!0," ",o),i.scrollTo=i.scrollHeight;const s=document.getElementById(o);m(s);let e=await fetch("http://localhost:5000",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:n.get("prompt")})});if(e=await e.json(),console.log(e),clearInterval(d),s.innerHTML="",e.success){const a=e.bot.trim();y(s,a)}else s.innerHTML="You have to introduce your OpenAI API Key"};c.addEventListener("submit",u);c.addEventListener("keyup",t=>{t.keyCode===13&&u(t)});
