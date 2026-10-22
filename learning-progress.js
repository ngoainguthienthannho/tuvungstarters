/* Independent meaning and spelling practice. A visible correction is never a retrieval. */
const selfStudyMigration=state.settings.selfStudyEdition!==1||state.settings.mode!=='type';
state.settings.mode='type';mode='type';state.settings.selfStudyEdition=1;
if(selfStudyMigration)save();
state.meaningRecords ||= {};
state.meaningMastered ||= {};
let recallPauseTimer = null;
const previousStop26 = stopPlayback;
stopPlayback = function(){clearTimeout(recallPauseTimer);recallPauseTimer=null;previousStop26();};
const previousMigration26 = migrateReview;
migrateReview = function(){
 previousMigration26();
 if(state.settings.skillsEdition===1)return;
 for(const w of unique){const old=state.records[w.key];if(old||state.mastered[w.key]===true){
  state.meaningRecords[w.key] ||= {stage:0,due:Math.min(old?.due??Infinity,reviewDate(1)),first:old?.first??Date.now(),successes:0,page:old?.page??w.page,origin:'imported',verified:false};
  state.meaningMastered[w.key] ??= state.mastered[w.key]===true;
 }}
 state.settings.skillsEdition=1;save();
};
function ensureMeaning(w,origin='lesson'){
 return state.meaningRecords[w.key] ||= {stage:0,due:reviewDate(1),first:Date.now(),successes:0,page:w.page,origin,verified:false};
}
function recordMeaning(w,good){
 const now=Date.now(),existing=state.meaningRecords[w.key],r=ensureMeaning(w);r.stage=Math.max(0,Math.min(Number(r.stage)||0,intervals.length-1));
 if(good){state.meaningMastered[w.key]=true;r.verified=true;if(r.lastDay!==today()){r.successes++;if(existing&&r.due<=now)r.stage=Math.min(r.stage+1,intervals.length-1);r.lastDay=today();if(!existing||r.due<=now)r.due=reviewDate(intervals[r.stage],now);}}
 else{state.meaningMastered[w.key]=false;r.verified=false;r.stage=0;r.due=reviewDate(1,now);r.lastDay=today();r.lapses=(r.lapses||0)+1;}
 r.page=w.page;r.lastPractice=now;r.lastResult=good?'independent':'needs-practice';save();
}
const previousMark26 = markMastered;
markMastered = function(w,known){previousMark26(w,known);const r=ensureMeaning(w,'manual');state.meaningMastered[w.key]=known;if(!known){r.stage=0;r.verified=false;r.due=Math.min(r.due,reviewDate(1));if(state.records[w.key])state.records[w.key].verified=false;}save();refreshSkillLabels();};
const previousRecord26 = recordRetrieval;
recordRetrieval = function(w,good){const r=previousRecord26(w,good);r.verified=good;r.lastResult=good?'independent':'needs-practice';return r;};
function skillDue(key,skill){const r=(skill==='meaning'?state.meaningRecords:state.records)[key];return Number.isFinite(r?.due)?r.due:Infinity;}
function nextSkillDue(key){return Math.min(skillDue(key,'meaning'),skillDue(key,'spelling'));}
recordWord = function(w){const page=state.records[w.key]?.page??state.meaningRecords[w.key]?.page,entry=pages[page]?.words.find(x=>x.key===w.key);return entry?{...entry,page}:w;};
dueWords = function(){return unique.filter(w=>nextSkillDue(w.key)<=Date.now()).sort((a,b)=>nextSkillDue(a.key)-nextSkillDue(b.key)).map(recordWord);};
wordReviewText = function(key){const due=nextSkillDue(key);return due===Infinity?'':due<=Date.now()?'Đến lịch ôn':'Ôn ngày '+new Date(due).toLocaleDateString('vi-VN');};
function skillSummary(w){const m=state.meaningRecords[w.key],s=state.records[w.key];if(!m&&!s)return '';return `<span class="skill-label ${m?.verified?'verified':''}" aria-label="${m?.verified?'Đã chọn đúng nghĩa':'Cần ôn nghĩa'}">${uiIcon('picture')}${m?.verified?uiIcon('check'):''}</span><span class="skill-label ${s?.verified?'verified':''}" aria-label="${s?.verified?'Đã tự viết đúng':'Cần ôn chữ'}">${uiIcon('write')}${s?.verified?uiIcon('check'):''}</span>`;}

homeReview = function(){const due=dueWords(),next=unique.filter(w=>nextSkillDue(w.key)>Date.now()&&nextSkillDue(w.key)<Infinity).sort((a,b)=>nextSkillDue(a.key)-nextSkillDue(b.key))[0];if(!due.length&&!next)return '';return `<div class="home-review"><div><strong>${due.length?'Có '+due.length+' từ chờ bạn!':'Hẹn bạn lần ôn tới!'}</strong><span>${due.length?'Mình ôn một chút nhé.':'Lượt ôn tiếp: '+new Date(nextSkillDue(next.key)).toLocaleDateString('vi-VN')}</span></div><button id="homeReview" class="${due.length?'primary':'secondary'}">${uiIcon('calendar')}${due.length?'Ôn hôm nay':'Lịch ôn'}</button></div>`;};
function refreshSkillLabels(){const p=pages[selectedPage]||pages[3];document.querySelectorAll('[data-word-row]').forEach(row=>{const el=row.querySelector('.word-skills');if(el)el.innerHTML=skillSummary(p.words[Number(row.dataset.wordRow)]);});}
const previousHome26=home;
home = function(){previousHome26();const p=pages[selectedPage]||pages[3];document.querySelectorAll('[data-word-row]').forEach(row=>{const w=p.words[Number(row.dataset.wordRow)];row.insertAdjacentHTML('beforeend',`<div class="word-skills">${skillSummary(w)}</div>`);row.classList.toggle('due-today',nextSkillDue(w.key)<=Date.now());});const rows=[...document.querySelectorAll('[data-word-row]')];rows.sort((a,b)=>Number(b.classList.contains('due-today'))-Number(a.classList.contains('due-today'))).forEach(row=>row.parentElement.appendChild(row));window.scrollTo?.({top:0,behavior:'instant'});};
review = function(){
 stopPlayback();animationEpoch++;session=null;nav('review');const due=dueWords(),upcoming=unique.filter(w=>nextSkillDue(w.key)>Date.now()&&nextSkillDue(w.key)<Infinity).sort((a,b)=>nextSkillDue(a.key)-nextSkillDue(b.key)).slice(0,12);
 $('#app').innerHTML=`<section class="learning"><button class="back" id="reviewBack">${uiIcon('go')} Về vườn</button><h1>${due.length?'Cùng ôn những từ cũ':'Thẻ từ đang nghỉ một chút'}</h1><div class="reviewlist">${due.map(w=>`<div class="review-card">${art(w)}<strong>${colouredWord(w)}</strong><div class="word-skills">${skillSummary(w)}</div><small>${skillDue(w.key,'meaning')<=Date.now()?'Ôn nghĩa ':''}${skillDue(w.key,'spelling')<=Date.now()?'· Ôn chữ':''}</small></div>`).join('')||'<p>Chưa có từ đến lịch ôn.</p>'}</div><button class="primary" id="reviewStart">${due.length?'Ôn '+Math.min(5,due.length)+' từ':'Học từ mới'}</button><h2>Lần hẹn tiếp theo</h2><div class="reviewlist">${upcoming.map(w=>`<span class="pill">${esc(w.word)} · ${new Date(nextSkillDue(w.key)).toLocaleDateString('vi-VN')}</span>`).join('')}</div></section>`;
 $('#reviewBack').onclick=home;$('#reviewStart').onclick=()=>due.length?start(due.slice(0,5),true):home();
};
start = function(words,isReview){
 stopPlayback();animationEpoch++;const batch=words.map(w=>({...w}));if(!batch.length){home();return;}
 session={queue:batch,wordIndex:0,words:[batch[0]],original:Object.fromEntries(batch.map(w=>[w.key,w])),phase:0,index:0,isReview,attempted:new Set(),correct:new Set(),missed:new Set(),retry:[],retryMode:false,flipped:false,checked:false,meaningWords:batch,spellingWords:batch,meaningAttempted:new Set(),meaningCorrect:new Set(),meaningRetry:[],meaningRetryMode:false,finalCorrect:new Set(),repaired:new Set()};
 lesson();
};
const previousLesson26=lesson;
function lessonPath(s){if(!s)return '';const stages=[[0,'Nghe'],[4,'Chọn tranh'],[1,'Nhớ chữ'],[2,'Viết'],[3,'Nhớ lại']],phase=s.phase===5?s.pauseForPhase:s.phase;let index=stages.findIndex(([value])=>value===phase);if(index<0)index=stages.length-1;return `<ol class="lesson-path" aria-label="Các bước học">${stages.map((step,i)=>`<li aria-label="${i+1}. ${step[1]}" class="${i===index?'current':i<index?'done':''}" ${i===index?'aria-current="step"':''}><span>${uiIcon(['listen','picture','memory','write','recall'][i])}</span><b>${step[1]}</b></li>`).join('')}</ol>`;}

lesson = function(){if(session?.phase===4)meaningLesson();else previousLesson26();$('#exit')?.insertAdjacentHTML?.('afterend',lessonPath(session));window.scrollTo?.({top:0,behavior:'instant'});};
const meaningFamilies26=[['dad','daddy','father'],['mum','mummy','mother'],['grandfather','grandpa'],['grandmother','grandma'],['child','children','kids'],['man','men'],['woman','women'],['foot','feet'],['mouse','mice'],['shoe','shoes'],['lorry','truck'],['football','soccer'],['chips','fries'],['tv','television'],['photo','picture','drawing','painting'],['sleep','go to bed','go to sleep']];
function meaningFamily(w){return meaningFamilies26.find(group=>group.includes(w.key))||[w.key];}
function meaningWord(w){const page=state.meaningRecords[w.key]?.page,entry=pages[page]?.words.find(x=>x.key===w.key);return entry?{...entry,page}:w;}
function meaningChoices(w){
 const targetMeaning=searchFold(w.meaning),seen=new Set([targetMeaning]),pool=[];
 const candidates=[...pages[w.page]?.words||[],...unique];
 for(const item of candidates){const meaning=searchFold(item.meaning);if(meaningFamily(w).includes(item.key)||seen.has(meaning)||!artMap[item.key])continue;seen.add(meaning);pool.push({...item,page:item.page??w.page});}
 const offset=Math.floor(Math.random()*Math.max(1,pool.length-1)),choices=[w,pool[offset],pool[(offset+1)%pool.length]].filter(Boolean);
 for(let i=choices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}return choices;
}
function meaningLesson(){
 stopPlayback();const s=session,w=s.words[s.index];s.checked=false;nav('home');const choices=meaningChoices(w);
 $('#app').innerHTML=`<section class="meaning-lesson"><button class="back" id="exit">${uiIcon('pause')} Nghỉ nhé</button><p class="child-kicker">${lessonCounter(s)}</p><h1>Tìm đúng tranh nhé!</h1><p class="child-instruction">Chọn tranh bạn vừa nghe.</p><button class="sound" id="meaningAudio">${icons.sound} Nghe từ</button><p class="audio-note" id="audioNote" role="status"></p><div class="meaning-choices">${choices.map((choice,i)=>`<button class="meaning-choice" data-meaning="${i}">${art(choice)}<span>${esc(choice.meaning)}</span></button>`).join('')}</div><div id="meaningFeedback" aria-live="polite"></div></section>`;
 $('#exit').onclick=home;$('#meaningAudio').onclick=()=>playWord(w);
 document.querySelectorAll('[data-meaning]').forEach(button=>button.onclick=()=>{
  if(session!==s||s.checked)return;s.checked=true;const good=choices[Number(button.dataset.meaning)].key===w.key;s.meaningAttempted.add(w.key);recordMeaning(w,good);
  if(good)s.meaningCorrect.add(w.key);else{s.meaningCorrect.delete(w.key);if(!s.meaningRetryMode&&!s.meaningRetry.some(x=>x.key===w.key))s.meaningRetry.push(w);}
  document.querySelectorAll('[data-meaning]').forEach(b=>{b.disabled=true;b.classList.toggle('chosen-correct',choices[Number(b.dataset.meaning)].key===w.key);});
  $('#meaningFeedback').innerHTML=`<p class="meaning-result">${good?'Đúng rồi!':`Từ này là ${esc(w.meaning)}. Mình nghe lại nhé.`}</p><button class="primary" id="continue">${uiIcon('go')} Tiếp nhé</button>`;$('#continue').onclick=advanceAnimated;if(!good)playWord(w);
 });
 playWord(w);window.scrollTo?.({top:0,behavior:'instant'});
}
function spellingErrorHint(w,val){
 const wanted=normalize(w.word),typed=normalize(val),double=wanted.match(/(.)\1/);
 if(double&&typed===wanted.slice(0,double.index)+double[1]+wanted.slice(double.index+2))return `Nhớ viết đủ hai chữ ${double[1]}: ${double[0]}.`;
 if(wanted.replace(/ /g,'')===typed.replace(/ /g,'')&&wanted!==typed)return 'Nhớ để khoảng cách giữa các từ.';
 if(wanted.length===typed.length+1){for(let i=0;i<wanted.length;i++){if(wanted.slice(0,i)+wanted.slice(i+1)===typed)return `Còn thiếu chữ ${wanted[i]}. Nhìn vị trí được đánh dấu nhé.`;}}
 if(typed.length===wanted.length+1){for(let i=0;i<typed.length;i++){if(typed.slice(0,i)+typed.slice(i+1)===wanted)return `Có một chữ ${typed[i]} thừa. Mình viết lại theo mẫu đúng nhé.`;}}
 return spellingAid(w).focus?.hint||'Nhìn phần chữ được đánh dấu rồi viết lại đúng nhé.';
}
function repairSpelling(w,val){
 const s=session;$('#activity').innerHTML=`<div class="feedback error" role="status"><strong>Mình sửa một chút nhé</strong>${val?`<p>Bạn viết: <b>${esc(val)}</b></p>`:''}<div class="diff-word" lang="en">${val?difference(w.word,val):colouredWord(w)}</div><p>${esc(spellingErrorHint(w,val))}</p>${typeof storyRepairHint==='function'?storyRepairHint(w,val):''}</div><div class="repair-box"><p class="tiny">Nhìn mẫu rồi thử lại nhé.</p><form id="repairForm"><label class="form-label" for="repairAnswer">Viết lại từ đúng</label><input class="answer" id="repairAnswer" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><button class="primary" type="submit">Kiểm tra lại</button></form><p id="repairMessage" role="status"></p></div>`;
 const repaired=()=>{if(session!==s)return;s.repaired.add(w.key);$('#activity').innerHTML=`<div class="feedback"><strong>Đúng rồi, bạn ơi!</strong><p>${s.retryMode?'Ngày mai mình gặp lại từ này nhé.':'Lát nữa bạn thử lại nhé.'}</p><p class="tiny"></p></div><button class="primary" id="continue">${uiIcon('go')} Tiếp nhé</button>`;$('#continue').onclick=advanceAnimated;};
 $('#repairForm').onsubmit=e=>{e.preventDefault();if(normalize($('#repairAnswer').value)===normalize(w.word))repaired();else{$('#repairMessage').textContent='Nhìn chữ sáng rồi thử lại nhé.';$('#repairAnswer').focus();}};$('#repairAnswer').focus();
}
check = function(ok,val){
 const s=session;if(!s||s.checked)return;s.checked=true;const w=s.words[s.index];s.attempted.add(w.key);setFlipped(false);$('#flashcard').classList.add('revealing');
 if(!ok){s.missed.add(w.key);s.correct.delete(w.key);s.finalCorrect.delete(w.key);recordRetrieval(w,false);save();if(!s.retryMode&&!s.retry.some(x=>x.key===w.key))s.retry.push(w);repairSpelling(w,val);return;}
 s.correct.add(w.key);
 if(s.phase===3){s.finalCorrect.add(w.key);recordRetrieval(w,true);save();s.retry=s.retry.filter(x=>x.key!==w.key);}
 $('#activity').innerHTML=`<div class="feedback" role="status"><strong>Bạn nhớ giỏi quá!</strong><div class="diff-word" lang="en">${colouredWord(w)}</div><p>${s.phase===2?'Lát nữa mình thử lại nhé!':'Hẹn bạn lần ôn tới!'}</p></div><button class="primary" id="continue">${uiIcon('go')} Tiếp nhé</button>`;$('#continue').onclick=advanceAnimated;
};
function pauseBeforeRecall(s,continuePractice,resumePhase=3){
 stopPlayback();s.pauseForPhase=resumePhase;s.phase=5;window.scrollTo?.({top:0,behavior:'instant'});const deadline=Date.now()+12000;
 $('#app').innerHTML=`<section class="recall-pause"><button class="back" id="exit">${uiIcon('pause')} Nghỉ nhé</button><p class="child-kicker">${lessonCounter(s)}</p><div class="rest-cards" aria-hidden="true"><span></span><span></span><span></span></div>${lessonPath(s)}<p id="pauseCount" class="pause-count" role="status"></p><button class="primary" id="recallReady" disabled>${uiIcon('recall')} Mình sẵn sàng!</button></section>`;
 $('#exit').onclick=home;
 const tick=()=>{if(session!==s)return;const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));$('#pauseCount').textContent=seconds?`${seconds}`:'✓';if(seconds){recallPauseTimer=setTimeout(tick,1000);}else{$('#recallReady').disabled=false;$('#recallReady').onclick=()=>{if(session===s)continuePractice();};}};tick();
}
next = function(){
 stopPlayback();const s=session;if(!s)return;s.oralStage=0;animationEpoch++;
 const go=phase=>{s.phase=phase;s.index=0;lesson();};
 if(s.phase===0){go(4);return;}
 if(s.phase===4){if(s.meaningRetry.length&&!s.meaningRetryMode){s.meaningRetryMode=true;s.meaningRetry=[];pauseBeforeRecall(s,()=>go(4),4);return;}go(1);return;}
 if(s.phase===1){go(2);return;}
 if(s.phase===2){pauseBeforeRecall(s,()=>go(3));return;}
 if(s.phase!==3)return;
 if(s.retry.length&&!s.retryMode){s.retryMode=true;s.retry=[];pauseBeforeRecall(s,()=>go(3));return;}
 if(s.wordIndex+1<s.queue.length){s.wordIndex++;s.words=[s.queue[s.wordIndex]];s.index=0;s.phase=0;s.retry=[];s.retryMode=false;s.meaningRetry=[];s.meaningRetryMode=false;s.pauseForPhase=null;lesson();return;}
 finish();
};
finish = function(){
 stopPlayback();const s=session;if(!s)return;state.stickers++;save();const spelling=s.finalCorrect.size,meaning=s.meaningCorrect.size;
 $('#app').innerHTML=`<section class="learning completion"><div class="mascot-celebration">${learningBuddy()}</div>${gardenPicture(state.stickers,true)}<h1>Thêm một bông hoa!</h1><p class="garden-earned">Mình làm được rồi!</p><p>Bạn đã luyện ${new Set([...s.attempted,...s.meaningAttempted]).size} từ hôm nay.</p><div class="completion-skills"><p><strong>${meaning}</strong> từ chọn đúng nghĩa</p><p><strong>${spelling}</strong> từ tự viết đúng</p></div>${s.repaired.size?`<p>Bạn đã sửa ${s.repaired.size} từ theo mẫu.</p>`:''}${!storageOK?'<p role="alert">Tiến bộ chưa được lưu trên trình duyệt này.</p>':''}<button id="again" class="primary">${uiIcon('flower')} Về vườn</button></section>`;$('#again').onclick=home;session=null;window.scrollTo?.({top:0,behavior:'instant'});
};

