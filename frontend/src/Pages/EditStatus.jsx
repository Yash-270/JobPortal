import { useParams } from "react-router";
import { useState } from "react";
import API from "../API/axios";

export const EditStatus = () => {
  const { id } = useParams(); // ✅ correct
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/result/edit/${id}`, { status });
      alert("Status Updated");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="space-x-4">
        <button
          type="button"
          onClick={() => setStatus("ACCEPTED")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          ACCEPTED
        </button>

        <button
          type="button"
          onClick={() => setStatus("REJECTED")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          REJECTED
        </button>

        <button
          type="submit"
          disabled={!status}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};
