import React, { useState, useEffect } from "react";

const Table = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchData();
  }, [showTable]);

  const toggleTable = () => {
    setShowTable(!showTable);
    fetchData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = () => {
    const storedData = localStorage.getItem("studentsData");
    if (storedData) {
      setStudentsData(JSON.parse(storedData));
    }
  };

  return (
    <div className="cc  mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl w-[70rem]">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={toggleTable}
            className="bg-[#08545E] text-white p-2 rounded-md w-[15rem] ml-4 hover:bg-[#08545E]"
          >
            {showTable ? "Hide All" : "Show All"}
          </button>
        </div>
      </form>

      {showTable && studentsData.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            All Student Data:
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full cc-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-6 py-3 whitespace-nowrap text-white">
                    Student Name
                  </th>
                  <th className="border border-gray-300 px-6 py-3 whitespace-nowrap text-white">
                    Total
                  </th>
                  <th className="border border-gray-300 px-6 py-3 whitespace-nowrap text-white">
                    First Exam
                  </th>
                  <th className="border border-gray-300 px-6 py-3 whitespace-nowrap text-white">
                    Second Exam
                  </th>
                  <th className="border border-gray-300 px-6 py-3 whitespace-nowrap text-white">
                    Final Exam
                  </th>
                  <th className="border border-gray-300 px-6 py-3 whitespace-nowrap text-white">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {studentsData.map((data, index) => (
                  <tr key={index} className="">
                    <td className="border border-gray-300 px-6 py-4 text-center whitespace-nowrap text-white">
                      {data.studentName}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap text-center text-white">
                      {data.total}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap text-center text-white">
                      {data.firstExamMarks}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap text-center text-white">
                      {data.secondExamMarks}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 whitespace-nowrap text-center text-white">
                      {data.finalExamMarks}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                          data.grade === "F"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {data.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : showTable ? (
        <div className="mt-4 text-white flex justify-center">
          <p>No data yet. Click "Show All" to display student data.</p>
        </div>
      ) : null}
    </div>
  );
};
export default Table;
