'use client'; 

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // เพิ่ม State สำหรับจัดการ UI ตอนกดปุ่ม
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function validate() {
    if (name.trim().length < 2) return "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร";
    if (!email.includes('@')) return "อีเมลไม่ถูกต้อง";
    if (message.trim().length < 5) return "ข้อความสั้นเกินไป";
    return "";
  }

  const isValid = name.trim().length >= 2 && email.includes('@') && message.trim().length >= 5;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    
    const msg = validate();
    if (msg) { 
        setError(msg); 
        return; 
    }
    
    // เคลียร์ Error เดิม และเปลี่ยนสถานะเป็น "กำลังส่ง"
    setError("");
    setIsSubmitting(true); 
    setIsSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setIsSuccess(true); // ส่งสำเร็จ โชว์แจ้งเตือนสีเขียว
        // ล้างค่าในฟอร์มให้ว่างเปล่า
        setName("");
        setEmail("");
        setMessage("");
        
        // ให้ข้อความสีเขียวหายไปเองใน 3 วินาที
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setError("ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (err) {
      setError("ระบบมีปัญหา ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setIsSubmitting(false); // ปลดล็อกปุ่มให้กลับมาเป็นเหมือนเดิม
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="ชื่อ" 
        className="border p-2 w-full rounded text-black disabled:bg-gray-100 disabled:text-gray-400" 
        disabled={isSubmitting} // ล็อกช่องพิมพ์ตอนกำลังส่ง
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="อีเมล" 
        className="border p-2 w-full rounded text-black disabled:bg-gray-100 disabled:text-gray-400" 
        disabled={isSubmitting}
      />
      <textarea 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
        placeholder="ข้อความ" 
        className="border p-2 w-full rounded text-black disabled:bg-gray-100 disabled:text-gray-400 min-h-[100px]" 
        disabled={isSubmitting}
      />
      
      {/* ข้อความ Error สีแดง */}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      
      {/* กล่องแจ้งเตือนสำเร็จ สีเขียว */}
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-pulse">
          ส่งข้อความของคุณเรียบร้อยแล้ว! 🚀
        </div>
      )}

      {/* 
        ปุ่มกดจะเปลี่ยนสีและข้อความตามสถานะ 
        ถ้ากำลังส่ง -> สีส้ม, ถ้าปกติ -> สีน้ำเงิน, ถ้าข้อมูลไม่ครบ -> สีเทา 
      */}
      <button 
        type="submit" 
        disabled={!isValid || isSubmitting}
        className={`px-6 py-2 rounded text-white font-medium transition-all duration-200
          ${!isValid ? 'bg-gray-300 cursor-not-allowed' : ''}
          ${isValid && !isSubmitting ? 'bg-blue-600 hover:bg-blue-700 active:scale-95' : ''}
          ${isSubmitting ? 'bg-orange-500 cursor-wait' : ''}
        `}
      >
        {isSubmitting ? 'กำลังส่งข้อมูล... ⏳' : 'ส่งข้อความ'}
      </button>
    </form>
  );
}