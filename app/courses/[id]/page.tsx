// app/courses/[id]/page.tsx
import Link from 'next/link';

interface CourseDetail {
  nameTH: string;
  nameEN: string;
  desc: string;
  instructor: string;
  credits: number;
}

const courseData: Record<string, CourseDetail> = {
  '0004272': { 
    nameTH: 'ผู้ประกอบการรุ่นใหม่สร้างรายได้จากฟาร์ม', 
    nameEN: 'PROFITABLE FARM BUSINESS FOR YOUNG ENTREPRENEURS', 
    desc: 'ศึกษาแนวทางการบริหารจัดการฟาร์มสมัยใหม่ การประยุกต์ใช้เทคโนโลยีในการเกษตร และการวางแผนธุรกิจเพื่อสร้างรายได้', 
    instructor: 'อ.เสาวณีย์ เล็กบางพง, ผศ.ดร.อัจฉรัตน์ สุวรรณภักดี, ผศ.สพ.ญ.สุภาพร สมรูป, อ.สุปรีย์ยา เทพรักษ์', 
    credits: 3 
  },
  '0214311': { 
    nameTH: 'ชุดวิชาการตรวจสอบและการประกันคุณภาพซอฟต์แวร์', 
    nameEN: 'SOFTWARE TESTING AND QUALITY ASSURANCE MODULE', 
    desc: 'หลักการและเทคนิคการทดสอบซอฟต์แวร์ (Software Testing) การวางแผนการทดสอบ และการประกันคุณภาพเพื่อให้ได้ซอฟต์แวร์ที่ได้มาตรฐาน', 
    instructor: 'ผศ.ดร.สุวิมล จุงจิตร์, อ.ดร.ณภัทร แก้วภิบาล', 
    credits: 5 
  },
  '0214321': { 
    nameTH: 'ชุดวิชาการออกแบบและพัฒนาเว็บแอปพลิเคชัน', 
    nameEN: 'WEB APPLICATION DESIGN AND DEVELOPMENT MODULE', 
    desc: 'การออกแบบ UI/UX การพัฒนาเว็บฝั่ง Client และ Server ด้วยเครื่องมือที่ทันสมัย (Next.js, TypeScript) และการเชื่อมต่อฐานข้อมูล', 
    instructor: 'อ.คณิตา, อ.ดร.ณภัทร แก้วภิบาล', 
    credits: 5 
  },
  '0214333': { 
    nameTH: 'เทคโนโลยีพาณิชย์อิเล็กทรอนิกส์', 
    nameEN: 'ELECTRONIC COMMERCE TECHNOLOGY', 
    desc: 'สถาปัตยกรรมของระบบ E-Commerce เทคโนโลยีการชำระเงินออนไลน์ ความปลอดภัย และการวิเคราะห์ข้อมูลทางการค้า', 
    instructor: 'อ.ดร.นิชากรณ์ พันธ์คง', 
    credits: 3 
  },
  '0214372': { 
    nameTH: 'การออกแบบสถาปัตยกรรมของอินเทอร์เน็ตของสรรพสิ่ง', 
    nameEN: 'INTERNET OF THINGS ARCHITECTURE DESIGN', 
    desc: 'โครงสร้างพื้นฐานของระบบ IoT การทำงานของเซนเซอร์ การส่งข้อมูลผ่านเครือข่าย และการนำ IoT ไปประยุกต์ใช้ในอุตสาหกรรม', 
    instructor: 'อ.กฤษณ์ ทองขุนดำ', 
    credits: 3 
  }
};

// 1. เติม async เข้าไปหน้าฟังก์ชัน และแก้ type ของ params เป็น Promise
export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  
  // 2. ใช้ await เพื่อแกะค่า id ออกมาจาก params
  const resolvedParams = await params;
  const courseId = resolvedParams.id;
  
  // 3. ใช้ courseId ที่แกะมาได้ ไปค้นหาข้อมูล
  const course = courseData[courseId];

  if (!course) {
    return (
      <main className="p-12 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl text-red-500 font-bold mb-4">ไม่พบรายวิชา {courseId}</h1>
        <Link href="/courses" className="text-blue-500 hover:underline">กลับไปหน้ารวมรายวิชา</Link>
      </main>
    );
  }

  return (
    <main className="p-8 md:p-12 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        
        <div className="bg-blue-900 p-8 md:p-12 text-white">
          <span className="inline-block px-4 py-1 bg-blue-700/50 rounded-full text-blue-100 font-mono text-sm mb-4">
            รหัสวิชา: {courseId}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{course.nameTH}</h1>
          <p className="text-blue-200 text-lg">{course.nameEN}</p>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
              <p className="text-blue-600 text-sm mb-1 font-medium">หน่วยกิต</p>
              <p className="text-2xl font-bold text-blue-900">{course.credits}</p>
            </div>
            <div className="col-span-2 md:col-span-3 bg-gray-50 p-4 rounded-xl flex flex-col justify-center border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">อาจารย์ผู้สอน</p>
              <p className="font-semibold text-gray-800">{course.instructor}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-500 pl-3">คำอธิบายรายวิชา</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
              {course.desc}
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <Link 
              href="/courses" 
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              ← กลับไปหน้ารวมรายวิชา
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}