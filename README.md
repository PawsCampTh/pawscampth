# PawsCamp Full Demo

เวอร์ชันนี้เป็น full-stack demo ที่รันได้โดยไม่ต้องติดตั้ง npm packages เพิ่มเติม

## ฟีเจอร์
- Customer: GPS, โปรไฟล์สุนัข, จองรถ, ราคา, payment method, งานปัจจุบัน, ประวัติ
- Driver: ออนไลน์/ออฟไลน์, รับงาน, อัปเดตสถานะ, รายได้จำลอง
- Admin: ดู booking ทั้งหมด, ปิด/ยกเลิกงาน, ตั้งค่าค่ารับงานและราคาต่อกม.
- Auth: OTP จำลอง (123456)
- Notifications: Browser Notification
- Backend REST API
- Persistent storage: data/db.json
- PWA / Add to Home Screen

## วิธีรันบนคอม
ต้องมี Node.js 18+
1. เปิด Terminal ในโฟลเดอร์นี้
2. รัน: node server.js
3. เปิด http://localhost:3000

## วิธีทดสอบบน iPhone
ต้องนำโปรเจกต์ขึ้น HTTPS host ก่อน เช่น Render / Railway / Fly.io / VPS / Cloud Run
จากนั้นเปิด URL ใน Safari > Share > Add to Home Screen

## สิ่งที่ต้องใส่ก่อนเปิดใช้งานจริง
1. Maps & routing provider
2. SMS OTP provider จริง
3. Payment gateway จริง (PromptPay / card)
4. Push notification provider
5. Database production เช่น PostgreSQL/Supabase
6. File storage สำหรับรูปน้องหมา/รูปยืนยัน
7. Driver KYC / document verification
8. Security: HTTPS, JWT/session, rate limit, validation, logging, backups
9. PDPA / Terms / Privacy Policy
10. Monitoring + admin permissions

## API
GET /api/health
GET /api/bookings
POST /api/bookings
PATCH /api/bookings/:id
GET /api/pricing
POST /api/pricing
POST /api/auth/send-otp
POST /api/auth/verify-otp

## Dev OTP
123456
