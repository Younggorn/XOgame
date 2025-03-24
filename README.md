
# XOGame

XOGame เป็นโปรเจกต์เกม XO ที่สามารถกำหนดขนาดตารางได้ พร้อมระบบฐานข้อมูลสำหรับเก็บ history เพื่อดู replay และระบบ AI Bot ที่เป็นโบนัสในโปรเจกต์นี้

---

## 🔥 คุณสมบัติ (Features)
- รองรับการกำหนดขนาดตารางได้อย่างอิสระ (3x3, 4x4, 5x5, ฯลฯ)
- บันทึกประวัติการเล่นและดู Replay ได้
- ระบบ AI Bot ที่สามารถเล่นกับผู้เล่นได้
- อินเทอร์เฟซที่ใช้งานง่ายผ่าน Web/Mobile

---

## 📦 การติดตั้ง (Installation)

### 1. Clone โปรเจกต์นี้จาก GitHub
```bash
git clone https://github.com/Younggorn/XOgame.git
cd XOgame
```

### 2. ติดตั้ง Dependencies ที่จำเป็น
```bash
npm install
```

---

## 🚀 การใช้งาน (Usage)

### 1. รันโปรเจกต์ในโหมดพัฒนา (Development)
```bash
npm run dev
```
โปรเจกต์จะพร้อมใช้งานที่: [http://localhost:3000](http://localhost:3000)

### 2. รันโปรเจกต์ในโหมด Production (Production)
```bash
npm run build
npm start
```



## 📌 การเชื่อมต่อกับฐานข้อมูล (Database Connection)
กรณีที่โปรเจกต์นี้ต้องการเชื่อมต่อกับฐานข้อมูล ให้สร้างไฟล์ `.env` ที่ Root ของโปรเจกต์ และใส่ค่านี้ลงไป:

```
DATABASE_URL=your_database_url_here
```

---


