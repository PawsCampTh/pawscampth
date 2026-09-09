# PawsCamp — LINE MINI App / LIFF Edition

เวอร์ชันนี้ต่อยอดจาก PawsCamp On-site PromptPay และเพิ่ม LINE integration

## ฟีเจอร์
- เปิดเป็น LINE MINI App / LIFF
- ใช้ LINE Login / LINE profile
- แสดงชื่อและรูปโปรไฟล์ LINE
- ส่ง PawsCamp ให้เพื่อนผ่าน shareTargetPicker
- GPS / Geolocation
- จองรถรับส่งน้องหมา
- โปรไฟล์น้องหมา
- คนขับรับงานและอัปเดตสถานะ
- PromptPay/เงินสดหน้างาน
- คนขับยืนยันรับเงิน
- ใบเสร็จในแอป
- Admin dashboard
- เปิดจาก external browser ได้ด้วย

## ขั้นตอนเปิดใช้งานกับ LINE

### ทาง A — LINE MINI App
1. เข้า LINE Developers Console
2. สร้าง Provider
3. Channels > Create new channel > LINE MINI App
4. เลือก Region = Thailand (ถ้าบัญชี/Console ของคุณเปิดสิทธิ์)
5. ตั้ง Endpoint URL เป็น HTTPS URL ของ PawsCamp
6. นำ LIFF ID มาใส่ใน public/line-config.js
7. Deploy ใหม่
8. ทดสอบ Development / Review / Published channel ตาม Console
9. Submit review เมื่อพร้อม

### ทาง B — LIFF app ผ่าน LINE Login channel
ถ้า LINE MINI App channel สำหรับ Thailand ยังไม่เปิดให้บัญชีของคุณ:
1. Create Provider
2. Create LINE Login channel
3. เพิ่ม LIFF app
4. Endpoint URL = HTTPS URL ของ PawsCamp
5. Scope: openid + profile
6. นำ LIFF ID มาใส่ public/line-config.js

## line-config.js
แก้:
liffId: "YOUR_LIFF_ID"
miniAppUrl: "https://YOUR-DOMAIN.example/"

## ต้อง Deploy ผ่าน HTTPS
LINE MINI App/LIFF ต้องมี endpoint ที่เข้าถึงจากอินเทอร์เน็ต
ตัวเลือกง่าย: Render, Railway, Fly.io, Cloud Run, VPS

## รัน Local
node server.js
เปิด http://localhost:3000

## Production ก่อนรับลูกค้าจริง
- เปลี่ยน storage จาก JSON → PostgreSQL/Supabase
- ทำ authentication ฝั่ง server และ verify LINE ID token
- ห้ามเชื่อ userId ที่ frontend ส่งมาโดยตรง
- เพิ่ม roles customer/driver/admin ฝั่ง server
- เพิ่ม audit log การยืนยันเงิน
- PromptPay QR จริงของ PawsCamp
- HTTPS + rate limiting + validation
- Privacy Policy / Terms / PDPA
