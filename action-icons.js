/* Consistent decorative SVGs, including labels changed after audio playback. */
(()=>{
 const paths={
  pause:'<path d="M5 9h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm11 1h2a3 3 0 1 1 0 6h-2M8 3v3m4-3v3M3 21h16"/>',
  logout:'<path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5m4-13 5 5-5 5m-6-5h13"/>',
  dashboard:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><path d="M4 20v-5m6 5v-8m6 8v-4m5 4V12"/>',
  go:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  listen:'<path d="M5 13v-2a7 7 0 0 1 14 0v2M5 12H3v7h4v-7Zm14 0h2v7h-4v-7Z"/>',
  refresh:'<path d="M20 8a8 8 0 1 0 0 8M20 3v6h-6"/>',
  water:'<path d="M12 3c-2 4-6 7-6 11a6 6 0 0 0 12 0c0-4-4-7-6-11Z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
  write:'<path d="m5 15-1 5 5-1L20 8l-4-4ZM13 7l4 4M4 22h16"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
  grid:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M3 15h18M9 3v18m6-18v18"/>'
 };
 const google='<path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.59-4.1H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.94a6 6 0 0 1 0-3.88V7.47H3.07a10 10 0 0 0 0 9.06l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.47l3.34 2.59A6 6 0 0 1 12 5.96Z"/>';
 function glyph(name){const holder=document.createElement('span');holder.innerHTML=`<svg class="ui-icon action-icon" viewBox="0 0 24 24" fill="none" stroke="${name==='google'?'none':'currentColor'}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${name==='google'?google:paths[name]||paths.go}</svg>`;return holder.firstElementChild;}
 function iconFor(el){const text=el.textContent.trim();if(text==='Đăng nhập Google')return 'google';if(text==='Đăng xuất')return 'logout';if(text==='Nghỉ nhé')return 'pause';if(el.id==='adminEntry')return 'dashboard';if(el.id==='refresh')return 'refresh';if(el.id==='farmWater'||text==='Tưới hoa')return 'water';if(el.matches('.farm-access summary'))return 'grid';if(el.id==='reviewStart')return text.startsWith('Ôn')?'calendar':'go';if(el.id==='modelPlay')return /xong/.test(text)?'check':'listen';if(el.id==='bankNext')return 'check';if(el.matches('form button[type="submit"]'))return 'check';if(/^(Kiểm tra lại|Xong!|Mình nhớ rồi|Mình đọc xong!)$/.test(text))return 'check';if(/^(Học tiếp|Tiếp nhé|Học từ mới|Thử lại|Cùng học)$/.test(text))return text==='Thử lại'?'refresh':'go';return null;}
 function decorate(){document.querySelectorAll('button,#adminEntry,.farm-access summary,a[data-action-icon]').forEach(el=>{const name=el.dataset.actionIcon||iconFor(el);if(!name)return;const existing=el.querySelector(':scope > svg');if(existing){if(existing.classList.contains('action-icon')&&existing.dataset.kind===name)return;if(!existing.classList.contains('action-icon')&&!['pause','water'].includes(name))return;existing.remove();}const svg=glyph(name);svg.dataset.kind=name;el.prepend(svg);el.classList.add('has-action-icon');});}
 let frame;function queue(){cancelAnimationFrame(frame);frame=requestAnimationFrame(decorate);}new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});decorate();
})();
