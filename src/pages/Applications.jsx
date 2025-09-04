import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Applications = () => {
  const [apps, setApps] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(""); // column to sort
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications") || "[]");
    setApps(data);
  }, []);

  const updateStatus = (id, status) => {
    try {
      const updated = apps.map((a) => (a.id === id ? { ...a, status } : a));
      setApps(updated);
      localStorage.setItem("applications", JSON.stringify(updated));
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleDelete = (id) => {
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
                closeToast();
              }}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  // Filter
  const filtered = apps.filter(
    (a) =>
      a.company.toLowerCase().includes(query.toLowerCase()) ||
      a.role.toLowerCase().includes(query.toLowerCase())
  );

  // Sort
  const sortedApps = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey]?.toString().toLowerCase() || "";
    const valB = b[sortKey]?.toString().toLowerCase() || "";
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 5;
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = sortedApps.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(filtered.length / appsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle sorting click
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const renderSortArrow = (key) => {
    if (sortKey === key) return sortOrder === "asc" ? " ▲" : " ▼";
    return "";
  };

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
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("company")}
                >
                  Company{renderSortArrow("company")}
                </th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  Role{renderSortArrow("role")}
                </th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date{renderSortArrow("date")}
                </th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  Location{renderSortArrow("location")}
                </th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("source")}
                >
                  Source{renderSortArrow("source")}
                </th>
                <th
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status{renderSortArrow("status")}
                </th>
                <th className="px-4 py-3">Follow Up</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApps.map((app, i) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Prev
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded ${
                num === currentPage
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}

      {/* Mobile cards */}
      <div className="md:hidden space-y-3 mt-4">
        {currentApps.map((app) => (
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


