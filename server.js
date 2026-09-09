const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const PORT=process.env.PORT||3000, ROOT=path.join(__dirname,'public'), DB=path.join(__dirname,'data','db.json');
function readDB(){try{return JSON.parse(fs.readFileSync(DB,'utf8'))}catch{return {bookings:[],pricing:{base:100,perKm:16}}}}
function writeDB(db){fs.writeFileSync(DB,JSON.stringify(db,null,2))}
function send(res,code,obj,type='application/json'){res.writeHead(code,{'Content-Type':type,'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET,POST,PATCH,OPTIONS'});res.end(type==='application/json'?JSON.stringify(obj):obj)}
function body(req){return new Promise(resolve=>{let d='';req.on('data',c=>d+=c);req.on('end',()=>{try{resolve(JSON.parse(d||'{}'))}catch{resolve({})}})})}
function id(){return 'PC-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomBytes(2).toString('hex').toUpperCase()}
const server=http.createServer(async(req,res)=>{
 if(req.method==='OPTIONS')return send(res,204,{});
 const u=new URL(req.url,'http://localhost');
 if(u.pathname.startsWith('/api/')){
   const db=readDB();
   if(u.pathname==='/api/bookings'&&req.method==='GET')return send(res,200,{bookings:db.bookings});
   if(u.pathname==='/api/bookings'&&req.method==='POST'){const b=await body(req);const booking={...b,id:id(),status:'pending',paymentStatus:'unpaid',createdAt:new Date().toISOString(),driver:null};db.bookings.unshift(booking);writeDB(db);return send(res,201,{booking})}
   const m=u.pathname.match(/^\/api\/bookings\/([^/]+)$/);
   if(m&&req.method==='PATCH'){const p=await body(req),i=db.bookings.findIndex(x=>x.id===m[1]);if(i<0)return send(res,404,{error:'not found'});db.bookings[i]={...db.bookings[i],...p,updatedAt:new Date().toISOString()};writeDB(db);return send(res,200,{booking:db.bookings[i]})}
   if(u.pathname==='/api/pricing'&&req.method==='GET')return send(res,200,db.pricing||{base:100,perKm:16});
   if(u.pathname==='/api/pricing'&&req.method==='POST'){db.pricing=await body(req);writeDB(db);return send(res,200,db.pricing)}
   if(u.pathname==='/api/auth/send-otp'&&req.method==='POST'){return send(res,200,{ok:true,devOtp:'123456'})}
   if(u.pathname==='/api/auth/verify-otp'&&req.method==='POST'){const b=await body(req);return send(res,200,{ok:b.otp==='123456',token:b.otp==='123456'?'demo-token':null})}
   if(u.pathname==='/api/health')return send(res,200,{ok:true,lineMiniApp:true});
   return send(res,404,{error:'API not found'});
 }
 let file=u.pathname==='/'?'/index.html':u.pathname; file=path.normalize(file).replace(/^(\.\.[\/\\])+/, ''); const fp=path.join(ROOT,file);
 if(!fp.startsWith(ROOT))return send(res,403,'Forbidden','text/plain');
 fs.readFile(fp,(err,data)=>{if(err)return send(res,404,'Not found','text/plain');const ext=path.extname(fp);const type={'.html':'text/html; charset=utf-8','.js':'application/javascript','.json':'application/json','.css':'text/css'}[ext]||'application/octet-stream';send(res,200,data,type)})
});
server.listen(PORT,()=>console.log(`PawsCamp running on http://localhost:${PORT}`));