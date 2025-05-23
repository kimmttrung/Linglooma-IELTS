import React, { useState, useEffect } from 'react';
import axios from "@/utils/axios.customize";

const ViewResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/incorrectphonemes/resultView'); // đổi thành endpoint thật
        console.log('API response data:', response.data);
        setResults(response);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      }
    };

    fetchResults();
  }, []);

  // Tính điểm trung bình theo averageScore
const averageScore =
  Array.isArray(results) && results.length > 0
    ? (
        results.reduce((sum, item) => sum + (item.averageScore || 0), 0) /
        results.length
      ).toFixed(1)
    : '0';


  // Hàm format ngày tháng từ ISO string sang định dạng dễ đọc
  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-2">IELTS 4-Skill Training</h1>
      <p className="text-sm text-gray-600 mb-6">
        Practice your pronunciation by recording yourself reading the passage
      </p>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Result</h1>
        <div className="flex items-center space-x-2">
          <img
            src="/images/img_animenamngau001fotor20250511114918_1.png"
            alt=""
            height={40}
            width={40}
          />
          <span className="text-sm font-medium text-gray-700">Detina</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-pink-50 border border-gray-300 rounded-lg p-4">
        <table className="table-auto w-full text-left text-sm border border-collapse">
          <thead className="bg-white">
            <tr>
              <th className="border px-3 py-2">STT</th>
              <th className="border px-3 py-2">Tên bài kiểm tra nói</th>
              <th className="border px-3 py-2">Ngày kiểm tra</th>
              <th className="border px-3 py-2">Điểm trung bình</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={item.lessonId}>
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">Bài {item.lessonId} - {item.lessonName}</td>
                <td className="border px-3 py-2">{formatDate(item.latestFinishedTime)}</td>
                <td className="border px-3 py-2">{item.averageScore !== null && item.averageScore !== undefined ? item.averageScore.toFixed(2) : '-'}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="border px-3 py-2" colSpan="3">
                Tổng điểm trung bình
              </td>
              <td className="border px-3 py-2">{averageScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewResultsPage;
