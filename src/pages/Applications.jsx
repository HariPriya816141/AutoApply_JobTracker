import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications") || "[]");
    setApps(data);
  }, []);

  function updateStatus(id, status) {
    try {
      const updated = apps.map((a) => (a.id === id ? { ...a, status } : a));
      setApps(updated);
      localStorage.setItem("applications", JSON.stringify(updated));
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status. Please try again.");
    }
  }

  function handleDelete(id) {
    const confirmDelete = () => {
      try {
        const updated = apps.filter((a) => a.id !== id);
        setApps(updated);
        localStorage.setItem("applications", JSON.stringify(updated));
        toast.success("Application deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete application. Please try again.");
      }
    };

    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this application?</span>
          <div className="flex justify-end gap-2 mt-1">
            <button
              onClick={() => {
                confirmDelete();
                closeToast(); // close toast after confirming
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={closeToast} // just close toast on cancel
              className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false, // keep open until user clicks
        closeOnClick: false,
        draggable: false,
      }
    );
  }

  const filtered = apps.filter(
    (a) =>
      a.company.toLowerCase().includes(query.toLowerCase()) ||
      a.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Applications
        </h2>
        <div className="flex items-center gap-2">
          <input
            placeholder="Search by company or role"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => navigate("/applications/add")}
            className="px-4 py-2 !rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Table container */}
      <div className="hidden md:block overflow-hidden rounded-xl shadow bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto whitespace-nowrap text-sm">
            <thead className="text-left text-gray-600 sticky dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Follow Up</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr
                  key={app.id}
                  className={`border-t border-gray-100 dark:border-gray-700  ${
                    i % 2 === 0
                      ? "bg-gray-50/50 dark:bg-gray-900/30"
                      : "bg-transparent"
                  } hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {app.company}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {app.role}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {app.date}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {app.location}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {app.source}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100"
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">{app.followUpDate || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="px-3 py-1 text-xs !rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="px-3 py-1 text-xs !rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-300"
                  >
                    No applications yet — add one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3 mt-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {app.company}
              </h3>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                {app.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {app.role} • {app.date}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {app.location} ({app.source})
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => navigate(`/applications/${app.id}`)}
                className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(app.id)}
                className="px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
