'use strict';
/* ===== 1) YERLEŞİM (agac_duzen.py'nin birebir JavaScript karşılığı) ===== */
const D={DT:56,DU:18,B0:.30,B1:.97,EXT:120,SA:58,KB:56,SAR:38,YA:55,YB:46,YE:26,MR:11,MU:31,MI:15,RR:17,RU:53,HB:35,TY:-1010,
HD:[[-72,100,50],[72,100,50],[-38,140,66],[38,140,66],[0,205,98]],
TD:[[-72,135,70],[72,135,70],[-36,195,94],[36,195,94],[0,265,132]],
TYAZI:['CENNETİN','ANAHTARI','NAMAZDIR'],
SOL:{0:[[-10,-450],[-200,-620],[-330,-800],[-440,-1040]],2:[[-10,-300],[-260,-300],[-430,-330],[-680,-470]]}};
const kub=(p,t)=>{const u=1-t;return[u*u*u*p[0][0]+3*u*u*t*p[1][0]+3*u*t*t*p[2][0]+t*t*t*p[3][0],u*u*u*p[0][1]+3*u*u*t*p[1][1]+3*u*t*t*p[2][1]+t*t*t*p[3][1]]};
function orn(p,n=300){const a=[];for(let i=0;i<=n;i++)a.push(kub(p,i/n));const k=[0];for(let i=1;i<a.length;i++)k.push(k[i-1]+Math.hypot(a[i][0]-a[i-1][0],a[i][1]-a[i-1][1]));return[a,k]}
function yay(a,k,s){let i=1;while(i<k.length-1&&k[i]<s)i++;const o=(s-k[i-1])/Math.max(k[i]-k[i-1],1e-9);return[[a[i-1][0]+(a[i][0]-a[i-1][0])*o,a[i-1][1]+(a[i][1]-a[i-1][1])*o],Math.atan2(a[i][1]-a[i-1][1],a[i][0]-a[i-1][0])]}
function dalPoly(a,k){const T=k[k.length-1],L=[],R=[];a.forEach((q,i)=>{const j=Math.min(i+1,a.length-1),m=Math.max(i-1,0),ac=Math.atan2(a[j][1]-a[m][1],a[j][0]-a[m][0]),y=(D.DT+(D.DU-D.DT)*Math.pow(k[i]/T,.8))/2;L.push([q[0]-Math.sin(ac)*y,q[1]+Math.cos(ac)*y]);R.push([q[0]+Math.sin(ac)*y,q[1]-Math.cos(ac)*y])});return L.concat(R.reverse())}
function yerel(boy,en,n=14){const u=[],a=[];for(let i=0;i<=n;i++){const t=i/n,y=2*(1-t)*t*en;u.push([t*boy,-y]);a.push([t*boy,y])}return[u,a]}
function ypoly(x,y,aci,boy,en){const a=aci*Math.PI/180,c=Math.cos(a),s=Math.sin(a),[u,l]=yerel(boy,en,12);return u.concat(l.reverse()).map(([px,py])=>[x+px*c-py*s,y+px*s+py*c])}
function chai(p,t=3){while(t--){const y=[p[0]];for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1];y.push([.75*a[0]+.25*b[0],.75*a[1]+.25*b[1]],[.25*a[0]+.75*b[0],.25*a[1]+.75*b[1]])}y.push(p[p.length-1]);p=y}return p}
function sap(kok,aci){const dx=Math.cos(aci),dy=Math.sin(aci),px=-dy,py=dx,yp=[],my=[],ms=[];
 for(let k=0;k<5;k++){const u=D.KB+k*D.SAR,t=k%2?-1:1,bx=kok[0]+dx*u,by=kok[1]+dy*u;yp.push([bx,by,aci*180/Math.PI+t*D.YA,D.YB,D.YE]);
  const mu=u+D.MI,m=[kok[0]+dx*mu-t*px*D.MU,kok[1]+dy*mu-t*py*D.MU];my.push(m);ms.push([[kok[0]+dx*mu,kok[1]+dy*mu],m])}
 const uu=D.KB+4*D.SAR;return{kok,uc:[kok[0]+dx*(uu+D.RU),kok[1]+dy*(uu+D.RU)],yp,my,ms,rz:[kok[0]+dx*(uu+D.RU),kok[1]+dy*(uu+D.RU)]}}
function duzen(yil,ay){const gs=new Date(yil,ay,0).getDate(),dallar=[],gun={},hafta=[];
 let gv=chai([[-140,0],[-100,-40],[-72,-170],[-56,-330],[-48,-430],[-40,-500],[-34,-700],[-30,-900],[-22,D.TY-28]]);gv=gv.concat(gv.map(([x,y])=>[-x,y]).reverse());
 for(let h=0;h<4;h++){const ay2=h==1||h==3;let e=D.SOL[h<2?0:2].map(p=>ay2?[-p[0],p[1]]:p);
  const gl=[];for(let g=1;g<=gs;g++)if(Math.min(Math.floor((g-1)/7),3)==h)gl.push(g);const n=gl.length;
  if(h==3&&n>7){const o=n/7,p0=e[0];e=e.map(p=>[p0[0]+(p[0]-p0[0])*o,p0[1]+(p[1]-p0[1])*o])}
  const[a,k]=orn(e),ana=k[k.length-1],son=a[a.length-1],sa=Math.atan2(son[1]-a[a.length-2][1],son[0]-a[a.length-2][0]);
  for(let i=1;i<=D.EXT/10;i++){a.push([son[0]+Math.cos(sa)*10*i,son[1]+Math.sin(sa)*10*i]);k.push(k[k.length-1]+10)}
  dallar.push(dalPoly(a,k));let ac=sa*180/Math.PI;if(h<2)ac+=ay2?D.HB:-D.HB;
  hafta.push({taban:a[a.length-1],aci:ac,yap:D.HD.map(([f,b,w])=>[ac+f,b,w]),satir:[(h+1)+'. Hafta']});
  const s0=ana*D.B0,s1=ana*D.B1;
  gl.forEach((g,j)=>{const s=s0+(j+.5)*(s1-s0)/n,[kk,tn]=yay(a,k,s);let y=j%2?-1:1;if(ay2)y=-y;gun[g]=sap(kk,tn+y*D.SA*Math.PI/180)})}
 const tepe={taban:[0,D.TY],aci:-90,yap:D.TD.map(([f,b,w])=>[-90+f,b,w]),satir:D.TYAZI};
 const d={gs,gv,dallar,hafta,tepe,gun};let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const ek=(x,y)=>{x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)};
 gv.forEach(p=>ek(...p));dallar.forEach(P=>P.forEach(p=>ek(...p)));
 hafta.concat([tepe]).forEach(h=>h.yap.forEach(([a,b,w])=>ypoly(h.taban[0],h.taban[1],a,b,w).forEach(p=>ek(...p))));
 Object.values(gun).forEach(g=>{g.yp.forEach(y=>ypoly(...y).forEach(p=>ek(...p)));g.my.forEach(m=>{ek(m[0]-D.MR,m[1]-D.MR);ek(m[0]+D.MR,m[1]+D.MR)});ek(g.rz[0]-D.RR,g.rz[1]-D.RR);ek(g.rz[0]+D.RR,g.rz[1]+D.RR)});
 d.sinir=[x0,y0,x1,y1];return d}

/* ===== 2) ÇİZİM ===== */
const KENAR=70,KAHVE='#8d5a2b',KOYU='#5a3517';
const yol=(c,P)=>{c.beginPath();P.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath()};
function yazi(c,satir,px,mx,my,aci){c.save();c.translate(mx,my);c.rotate(aci*Math.PI/180);c.font='bold '+px+'px Segoe UI,system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=6;c.strokeStyle='#1b6f2a';c.fillStyle='#fff';
 satir.forEach((t,i)=>{const y=(i-(satir.length-1)/2)*px*.95;c.strokeText(t,0,y);c.fillText(t,0,y)});c.restore()}
function dalcik(c,h,px,aciYazi){h.yap.forEach(([a,b,w])=>{c.save();c.translate(h.taban[0],h.taban[1]);c.rotate(a*Math.PI/180);const[u,l]=yerel(b,w),g1=c.createLinearGradient(0,0,b,0),g2=c.createLinearGradient(0,0,b,0);
  g1.addColorStop(0,'#7cc943');g1.addColorStop(1,'#c6ee70');g2.addColorStop(0,'#1f8a38');g2.addColorStop(1,'#48b84f');
  yol(c,u);c.fillStyle=g1;c.fill();yol(c,l);c.fillStyle=g2;c.fill();c.strokeStyle='rgba(244,255,228,.92)';c.lineWidth=3;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(b*.92,0);c.stroke();
  yol(c,u.concat(l.slice().reverse()));c.strokeStyle='#1b6f2a';c.lineJoin='round';c.stroke();c.restore()});
 const[a,b]=h.yap[h.yap.length-1],r=a*Math.PI/180;let ya=aciYazi;if(ya===undefined){ya=a;while(ya>90)ya-=180;while(ya<=-90)ya+=180}
 yazi(c,h.satir,px,h.taban[0]+Math.cos(r)*b/2,h.taban[1]+Math.sin(r)*b/2,ya)}
function ciz(c,W,H,d,veri,kul){const[x0,y0,x1,y1]=d.sinir,gw=x1-x0+2*KENAR,gh=y1-y0+2*KENAR,o=Math.min(W/gw,H/gh);
 const gk=c.createLinearGradient(0,0,0,H);gk.addColorStop(0,'#a9dcff');gk.addColorStop(1,'#e6f6ff');c.fillStyle=gk;c.fillRect(0,0,W,H);
 c.save();c.translate((W-gw*o)/2,(H-gh*o)/2);c.scale(o,o);c.translate(-x0+KENAR,-y0+KENAR);
 c.fillStyle='#6dbb3f';c.beginPath();c.ellipse((x0+x1)/2,260,(x1-x0)*.75,300,0,0,7);c.fill();
 c.lineCap='round';c.strokeStyle='#7a4a22';c.lineWidth=6;Object.values(d.gun).forEach(g=>{c.beginPath();c.moveTo(...g.kok);c.lineTo(...g.uc);c.stroke()});
 const S=[d.gv].concat(d.dallar);c.lineJoin='round';c.fillStyle=KAHVE;c.strokeStyle=KOYU;c.lineWidth=8;S.forEach(P=>{yol(c,P);c.fill();c.stroke()});S.forEach(P=>{yol(c,P);c.fill()});
 d.hafta.forEach(h=>dalcik(c,h,31));dalcik(c,d.tepe,21,0);
 Object.entries(d.gun).forEach(([gn,g])=>{const v=veri[gn]||{n:[],s:[],k:[]},sc=(v.s||[]).filter(Boolean).length;
  c.strokeStyle='#7a4a22';c.lineWidth=2.6;g.ms.forEach(([a,b])=>{c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke()});
  g.yp.forEach((y,i)=>{const kl=v.n&&v.n[i],kz=kl&&v.k&&v.k[i];yol(c,ypoly(...y));c.fillStyle=kz?'#ffc928':kl?'#43a047':'#fffdf2';c.fill();c.strokeStyle=KOYU;c.lineWidth=2.5;c.stroke()});
  g.my.forEach((m,i)=>{c.beginPath();c.arc(m[0],m[1],D.MR,0,7);c.fillStyle=i<sc?'#e53935':'#fff3dc';c.fill();c.stroke()});
  c.beginPath();c.arc(g.rz[0],g.rz[1],D.RR,0,7);c.fillStyle='#ffd400';c.fill();c.stroke();c.fillStyle=KOYU;c.font='bold 21px system-ui,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(gn,g.rz[0],g.rz[1]+1)});
 if(kul){c.fillStyle='#2a1a0c';c.font='bold 32px system-ui,sans-serif';c.textAlign='left';c.textBaseline='alphabetic';c.fillText('Ad : '+kul.ad,190,8);c.fillText('Yaş : '+kul.yas,190,48)}
 c.restore()}

/* ===== 3) UYGULAMA (giriş, form, kayıt, ağaç, paylaşım) ===== */
const $=id=>document.getElementById(id),AYLAR=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const NAM=['Sabah Namazı','Öğle Namazı','İkindi Namazı','Akşam Namazı','Yatsı Namazı'],SAD=['Güler yüz ve selam','Yoldaki engeli kaldırmak','Yardımlaşma','Büyüklere saygı','Diğer'];
const ld=(k,v)=>{try{return JSON.parse(localStorage.getItem(k))||v}catch(e){return v}},sv=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const bugun=()=>{const t=new Date();return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0')};
function ekran(id){document.querySelectorAll('.ekran').forEach(e=>e.classList.toggle('a',e.id==id))}
let kul=ld('na_kullanici',null),kayit=ld('na_kayit',{}),nk=[],kk=[],sk=[],cur=null;
function ay_verisi(y,a){const o={},on=y+'-'+String(a).padStart(2,'0')+'-';for(const t in kayit)if(t.startsWith(on))o[+t.slice(8)]=kayit[t];return o}
function rapor(v){let n=0,k=0,s=0;for(const g in v){const r=v[g];n+=r.n.filter(Boolean).length;k+=r.n.filter((x,i)=>x&&r.k[i]).length;s+=r.s.filter(Boolean).length}
 return 'Bu ay '+n+' namaz kıldın'+(k?' ('+k+"'i kaza)":'')+', '+s+' sadaka verdin.'}
function formKur(){const p1=$('p1'),p2=$('p2');p1.innerHTML='';p2.innerHTML='';nk=[];kk=[];sk=[];
 NAM.forEach((t,i)=>{const r=document.createElement('div');r.className='sat';r.innerHTML='<input type=checkbox><label>'+t+'</label><input type=checkbox disabled><span class=kz>Kaza</span>';p1.appendChild(r);
  const[a,b]=r.querySelectorAll('input');nk.push(a);kk.push(b);a.onchange=()=>{b.disabled=!a.checked;if(!a.checked)b.checked=false}});
 SAD.forEach(t=>{const r=document.createElement('div');r.className='sat';r.innerHTML='<input type=checkbox><label>'+t+'</label>';p2.appendChild(r);sk.push(r.firstChild)})}
function temizle(){nk.concat(kk,sk).forEach(x=>{x.checked=false});kk.forEach(x=>x.disabled=true)}
function sekme(i){$('p1').hidden=i!=1;$('p2').hidden=i!=2;$('s1').classList.toggle('sec',i==1);$('s2').classList.toggle('sec',i==2)}
function ciz_agac(){const c=$('cv'),W=Math.min(innerWidth,1400),r=devicePixelRatio||1,H=Math.max(300,Math.min(innerHeight-150,W*.8));
 c.width=W*r;c.height=H*r;const x=c.getContext('2d');x.scale(r,r);ciz(x,W,H,cur.d,cur.v,kul)}
function agacAc(){const t=new Date($('tarih').value||bugun()),y=t.getFullYear(),a=t.getMonth()+1;cur={y,a,d:duzen(y,a),v:ay_verisi(y,a)};
 $('ayBaslik').textContent=AYLAR[a-1]+' '+y;$('rapor').textContent=rapor(cur.v);ekran('agac');ciz_agac()}
async function paylas(){const W=1800,d=cur.d,[x0,y0,x1,y1]=d.sinir,H=Math.round(W*(y1-y0+2*KENAR)/(x1-x0+2*KENAR)),c=document.createElement('canvas');c.width=W;c.height=H+200;const x=c.getContext('2d');
 x.fillStyle='#eaf6ff';x.fillRect(0,0,W,H+200);x.save();x.translate(0,110);ciz(x,W,H,d,cur.v,kul);x.restore();x.fillStyle='#2a1a0c';x.textAlign='center';x.textBaseline='middle';
 x.font='bold 58px system-ui,sans-serif';x.fillText(AYLAR[cur.a-1]+' '+cur.y,W/2,55);x.font='38px system-ui,sans-serif';x.fillText(rapor(cur.v),W/2,H+155);
 const b=await new Promise(r=>c.toBlob(r,'image/png')),f=new File([b],'namaz_agaci_'+cur.y+'-'+String(cur.a).padStart(2,'0')+'.png',{type:'image/png'}),m='Namaz Ağacım - '+AYLAR[cur.a-1]+' '+cur.y+'\n'+rapor(cur.v);
 if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:m,title:'Namaz Ağacım'});return}catch(e){if(e.name=='AbortError')return}}
 const u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=f.name;a.click();alert('Bu cihazda doğrudan paylaşım yok. Resim indirildi; WhatsApp veya e-postaya ekleyip gönderebilirsin.')}
(typeof window!=="undefined"?window:{}).onload=()=>{formKur();temizle();$('tarih').value=bugun();$('tarih').max=bugun();
 $('girisBtn').onclick=()=>{const ad=$('ad').value.trim(),yas=+$('yas').value;if(!ad)return alert('Lütfen adınızı yazın.');if(!(yas>=1&&yas<=120))return alert('Lütfen yaşınızı doğru yazın.');kul={ad,yas};sv('na_kullanici',kul);basla()};
 $('s1').onclick=()=>sekme(1);$('s2').onclick=()=>sekme(2);$('tarih').onchange=()=>{if($('tarih').value>bugun())$('tarih').value=bugun();temizle()};
 $('kaydet').onclick=()=>{const t=$('tarih').value;if(!t||t>bugun())return alert('Gelecek bir tarihe kayıt yapılamaz.');const e=kayit[t]||{n:[0,0,0,0,0],s:[0,0,0,0,0],k:[0,0,0,0,0]};
  kayit[t]={n:nk.map((x,i)=>!!(x.checked||e.n[i])),s:sk.map((x,i)=>!!(x.checked||e.s[i])),k:kk.map((x,i)=>!!(x.checked||e.k[i]))};sv('na_kayit',kayit);$('durum').textContent='Kaydedildi ✓';setTimeout(()=>$('durum').textContent='',3000)};
 $('goster').onclick=agacAc;$('geri').onclick=()=>ekran('form');$('paylas').onclick=paylas;addEventListener('resize',()=>{if($('agac').classList.contains('a'))ciz_agac()});
 if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});basla()};
function basla(){if(kul){$('baslik').textContent='Namaz Ağacım - '+kul.ad;sekme(1);ekran('form')}else ekran('giris')}
if(typeof module!=='undefined')module.exports={duzen,ciz};
