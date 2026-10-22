/* Enhance presentation without changing learning records or lesson order. */
(()=>{
 let observer;
 const previousHome=home;
 home=function(){previousHome();const page=document.querySelector('.page-study'),grid=page?.querySelector('.page-words');if(!grid)return;observer?.disconnect();observer=new IntersectionObserver(items=>{page.classList.toggle('words-in-view',items.some(x=>x.isIntersecting));},{threshold:0,rootMargin:'0px 0px -90px 0px'});observer.observe(grid);
 const topic=document.querySelector('#topicDialog'),open=document.querySelector('#openTopics');topic?.addEventListener('close',()=>open?.focus({preventScroll:true}));
 const search=document.querySelector('#wordSearch');search?.setAttribute('enterkeyhint','search');search?.setAttribute('aria-label','Tìm từ tiếng Anh hoặc nghĩa tiếng Việt');
 };
 const account=document.querySelector('#cloudAccount');if(account)new MutationObserver(()=>{account.dataset.saved=account.textContent.includes('Đã lưu tiến trình');}).observe(account,{childList:true,subtree:true});
 document.addEventListener('focusin',e=>{if(e.target.matches('input.answer'))e.target.setAttribute('enterkeyhint','done');});
})();
