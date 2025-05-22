import { AuthContext } from '@/components/context/auth.context';
import React, { useContext } from 'react';

const ViewResultsPage = () => {
  const { auth } = useContext(AuthContext);
  const name = auth?.user?.username;

  const results = [
    { id: 1, name: 'Bài 1 - Technology', date: 'dd/mm/yyyy', score: '70%' },
    { id: 2, name: 'Bài 2 - Environment', date: 'dd/mm/yyyy', score: '100%' },
    { id: 3, name: 'Bài 3 - Education', date: 'dd/mm/yyyy', score: '90%' },
    { id: 4, name: 'Bài 4 - Health', date: 'dd/mm/yyyy', score: '80%' },
  ];

  const averageScore = (results.reduce((sum, item) => sum + parseFloat(item.score), 0) / results.length).toFixed(1);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-2">IELTS 4-Skill Training</h1>
      <p className="text-sm text-gray-600 mb-6">Practice your pronunciation by recording yourself reading the passage</p>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Result</h1>
        <div className="flex items-center space-x-2">
          <img src="/images/img_animenamngau001fotor20250511114918_1.png" alt="" height={"40"} width={"40"} />
          <span className="text-sm font-medium text-gray-700">{name}</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-pink-50 border border-gray-300 rounded-lg p-4">
        <table className="table-auto w-full text-left text-sm border border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="border px-3 py-2">STT</th>
              <th className="border px-3 py-2">Tên bài kiểm tra nói</th>
              <th className="border px-3 py-2">Ngày kiểm tra</th>
              <th className="border px-3 py-2">Điểm (%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.id}>
                <td className="border px-3 py-2">{item.id}</td>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.date}</td>
                <td className="border px-3 py-2">{item.score}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="border px-3 py-2" colSpan="3">Total</td>
              <td className="border px-3 py-2">{averageScore}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewResultsPage;
