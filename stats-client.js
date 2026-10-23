/* Only aggregate activity: no names, emails, answers, words or URLs. */
import {initializeApp,getApps,getApp} from 'https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js';
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js';
import {getFirestore,doc,updateDoc,setDoc,addDoc,collection,serverTimestamp} from 'https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js';
const isAdmin=u=>u?.email==='hahuy0811@gmail.com'&&u.emailVerified&&u.providerData.some(p=>p.providerId==='google.com');
try{
 const cfg=await fetch('firebase-config.json').then(r=>r.json()),app=getApps().length?getApp():initializeApp(cfg),auth=getAuth(app),db=getFirestore(app);
 const live=location.hostname==='ngoainguthienthannho.github.io';
 async function touch(name,id){const ref=doc(db,name,id);try{await updateDoc(ref,{lastSeen:serverTimestamp()});}catch(e){if(!['not-found','permission-denied'].includes(e.code))throw e;await setDoc(ref,{firstSeen:serverTimestamp(),lastSeen:serverTimestamp()});}}
 function event(name){if(live)addDoc(collection(db,name),{at:serverTimestamp()}).catch(()=>{});}
 onAuthStateChanged(auth,u=>{document.querySelector('#adminEntry')?.remove();if(isAdmin(u)){const a=document.createElement('a');a.id='adminEntry';a.className='admin-entry';a.href='admin.html';a.textContent='Quản trị';document.querySelector('header').append(a);}if(live&&u?.providerData.some(p=>p.providerId==='google.com'))touch('statsAccounts',u.uid).catch(()=>{});});
 if(live&&navigator.doNotTrack!=='1'){
  let id;try{id=localStorage.getItem('startersStatsBrowser');if(!/^[a-f0-9-]{36}$/.test(id||'')){id=crypto.randomUUID();localStorage.setItem('startersStatsBrowser',id);}}catch{}
  if(id)touch('statsVisitors',id).catch(()=>{});event('statsViews');
  const oldStart=start,oldFinish=finish,finished=new WeakSet();
  start=function(...args){const result=oldStart(...args);if(session)event('statsStarts');return result;};
  finish=function(...args){const s=session,result=oldFinish(...args);if(s&&!finished.has(s)){finished.add(s);event('statsCompletions');}return result;};
 }
}catch(e){console.warn('Statistics unavailable',e.code||'connection');}
