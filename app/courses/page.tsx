// app/courses/page.tsx
import Link from 'next/link';

interface Course {
  id: string;
  nameTH: string;
  nameEN: string;
  credits: number;
}

const courses: Course[] = [
  { id: '0004272', nameTH: 'ผู้ประกอบการรุ่นใหม่สร้างรายได้จากฟาร์ม', nameEN: 'PROFITABLE FARM BUSINESS FOR YOUNG ENTREPRENEURS', credits: 3 },
  { id: '0214311', nameTH: 'ชุดวิชาการตรวจสอบและการประกันคุณภาพซอฟต์แวร์', nameEN: 'SOFTWARE TESTING AND QUALITY ASSURANCE MODULE', credits: 5 },
  { id: '0214321', nameTH: 'ชุดวิชาการออกแบบและพัฒนาเว็บแอปพลิเคชัน', nameEN: 'WEB APPLICATION DESIGN AND DEVELOPMENT MODULE', credits: 5 },
  { id: '0214333', nameTH: 'เทคโนโลยีพาณิชย์อิเล็กทรอนิกส์', nameEN: 'ELECTRONIC COMMERCE TECHNOLOGY', credits: 3 },
  { id: '0214372', nameTH: 'การออกแบบสถาปัตยกรรมของอินเทอร์เน็ตของสรรพสิ่ง', nameEN: 'INTERNET OF THINGS ARCHITECTURE DESIGN', credits: 3 }
];

export default function CoursesPage() {
  return (
    <main className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 border-b-4 border-blue-200 inline-block pb-2">
        รายวิชาของฉัน
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c: Course) => (
          <Link href={`/courses/${c.id}`} key={c.id}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold tracking-wider mb-4">
                  {c.id}
                </span>
                <h2 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 mb-2 leading-snug">
                  {c.nameTH}
                </h2>
                <p className="text-gray-500 text-sm">{c.nameEN}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                <span className="text-gray-600 font-medium">{c.credits} หน่วยกิต</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}