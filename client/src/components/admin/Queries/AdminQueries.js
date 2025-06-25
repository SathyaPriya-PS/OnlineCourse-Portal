import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [showResponseForm, setShowResponseForm] = useState(null);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/queries/all');
      setQueries(res.data);
    } catch (err) {
      console.error('Error fetching queries:', err);
    }
  };

  const handleRespond = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admin/queries/respond/${id}`, {
        response: responseText
      });
      alert('Response posted successfully');
      setShowResponseForm(null);
      setResponseText('');
      fetchQueries(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to post response');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Queries</h2>
      {queries.length === 0 ? (
        <p>No queries found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">Email</th>
              <th className="border p-2">College</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Query</th>
              <th className="border p-2">Posted At</th>
              <th className="border p-2">Response</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q._id} className="hover:bg-gray-100">
                <td className="border p-2">{q.userEmail}</td>
                <td className="border p-2">{q.college}</td>
                <td className="border p-2">{q.department}</td>
                <td className="border p-2">{q.query}</td>
                <td className="border p-2">{new Date(q.postedAt).toLocaleString()}</td>
                <td className="border p-2">
                  {q.adminResponse ? (
                    <span>{q.adminResponse}</span>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowResponseForm(q._id)}
                        className="bg-blue-500 text-white px-2 py-1 mb-2 rounded"
                      >
                        Respond
                      </button>
                      {showResponseForm === q._id && (
                        <form onSubmit={(e) => handleRespond(e, q._id)}>
                          <input
                            type="text"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Type your response"
                            className="border p-1 w-full mt-1"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-2 py-1 mt-1 rounded"
                          >
                            Post
                          </button>
                        </form>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminQueries;
