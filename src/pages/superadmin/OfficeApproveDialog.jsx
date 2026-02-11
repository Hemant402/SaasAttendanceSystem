import { useState } from "react";
import http from "../../api/http";
import { API } from "../../api/endpoints";

export default function OfficeApproveDialog({ office, onClose, onSuccess }) {
  const [type, setType] = useState("Demo");
  const [date, setDate] = useState("");

  const approve = async () => {
    await http.patch(API.APPROVE_OFFICE, {
      officeId: office.id,
      approvalType: type,
      manualExpiryDate: type === "Manual" ? date : null,
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="p-4 bg-white rounded w-96">
        <h3 className="mb-3 font-bold">Approve Office</h3>

        <select
          className="w-full p-2 border"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Demo</option>
          <option>Purchase</option>
          <option>Manual</option>
        </select>

        {type === "Manual" && (
          <input
            type="date"
            className="w-full p-2 mt-2 border"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            className="px-4 py-1 text-white bg-green-600 rounded"
            onClick={approve}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
