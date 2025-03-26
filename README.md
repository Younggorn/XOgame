# เกม XO 
## 📌 คุณสมบัติ
- สามารถกำหนดขนาดกระดานและเงื่อนไขการชนะได้
- เล่นกับ Bot ที่ใช้ AI ตัดสินใจเดินหมาก
- บันทึกประวัติการเล่นลงในฐานข้อมูล Supabase
- มีระบบ Replay เพื่อดูการเล่นย้อนหลัง

---

## 🚀 การติดตั้งและใช้งาน

### 1. คัดลอกโปรเจกต์จาก GitHub
```sh
git clone https://github.com/your-repo/xo-game.git
cd xo-game
```

### 2. ติดตั้ง Dependencies
```sh
npm install
```

### 3. ตั้งค่า Supabase
- สมัครบัญชีที่ [supabase.com](https://supabase.com/) และสร้างโปรเจกต์ใหม่
- คัดลอก **API URL** และ **Anon Key**
- สร้างไฟล์ `.env` ที่ root ของโปรเจกต์และเพิ่มค่า:
  ```env
  REACT_APP_SUPABASE_URL=your_supabase_url
  REACT_APP_SUPABASE_ANON_KEY=your_anon_key
  ```
- สร้างตาราง `history` ใน Supabase โดยมีคอลัมน์ดังนี้:
  - `id` (UUID, Primary Key)
  - `rowsy` (Integer)
  - `colsx` (Integer)
  - `wincon` (Integer)
  - `winner` (Text)
  - `gameplay` (JSON)
  - `created_at` (Timestamp, default: now)

### 4. รันโปรเจกต์
```sh
npm run dev
```

---

## 🎮 วิธีการเล่น
1. เลือกขนาดกระดานและเงื่อนไขการชนะ
2. เลือกว่าจะให้ใครเล่นก่อน: **ผู้เล่น (X)** หรือ **Bot (O)**
3. คลิกที่ช่องเพื่อเดินหมาก
4. Bot จะเดินอัตโนมัติตามอัลกอริธึม AI
5. เกมจบเมื่อมีผู้ชนะหรือกระดานเต็ม

---

## 🏗️ การออกแบบระบบ

### โครงสร้างโปรเจกต์
- `App.jsx` - จุดเริ่มต้นของแอปและจัดการ Routing
- `Game.jsx` - จัดการตรรกะของเกมเมื่อเล่นกับผู้เล่น
- `Playwithbot.jsx` - จัดการการเล่นกับ AI Bot
- `supabaseClient.js` - เชื่อมต่อกับฐานข้อมูล Supabase

### ลำดับการทำงานของเกม
1. ผู้ใช้เลือกขนาดกระดานและตั้งค่าเกม
2. เกมสร้างกระดานเปล่าและกำหนดผู้เล่นคนแรก
3. ผู้เล่นและ Bot สลับกันเดินหมาก
4. Bot คำนวณการเดินหมากโดยใช้ **Minimax Algorithm**
5. ระบบตรวจสอบเงื่อนไขการชนะหลังจากทุกการเดินหมาก
6. เมื่อเกมจบ ประวัติการเล่นจะถูกบันทึกลง Supabase

---

## 🤖 อัลกอริธึม AI: Minimax
### หลักการทำงาน
AI ใช้ **Minimax Algorithm** เพื่อเลือกการเดินหมากที่ดีที่สุด โดยพิจารณาจากคะแนนของแต่ละทางเลือก:
- **+10** ถ้า Bot (`O`) ชนะ
- **-10** ถ้าผู้เล่น (`X`) ชนะ
- **0** ถ้าเสมอ

### ขั้นตอนการทำงาน
1. **ตรวจสอบผู้ชนะ**: หากมีผู้ชนะให้คืนค่าคะแนนตามที่กำหนด
2. **จำลองการเดินหมากทั้งหมด**: ลองวาง `X` หรือ `O` ในช่องว่าง
3. **คำนวณคะแนนของแต่ละทางเลือก**: ใช้ฟังก์ชัน Minimax คำนวณคะแนน
4. **เลือกทางเลือกที่ดีที่สุด**: Bot เลือกการเดินหมากที่ได้คะแนนสูงสุด

ตัวอย่างโค้ด:
```js
const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (isDraw(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move.row][move.col] = 'O';
      let score = minimax(board, depth + 1, false);
      board[move.row][move.col] = null;
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let move of getAvailableMoves(board)) {
      board[move.row][move.col] = 'X';
      let score = minimax(board, depth + 1, true);
      board[move.row][move.col] = null;
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
};
```

### การเพิ่มประสิทธิภาพ
เพื่อป้องกันปัญหาการคำนวณช้า AI ใช้วิธีดังนี้:
- จำกัด **ความลึกของการค้นหา** (เช่น `maxDepth = 4`)
- ให้ความสำคัญกับ **การชนะเร็วที่สุด**
- ใช้ **การสุ่ม** เมื่อมีตัวเลือกที่คะแนนเท่ากันเพื่อให้เกมดูเป็นธรรมชาติ





