import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultState = {
  company: "",
  role: "",
  date: "",
  location: "",
  source: "LinkedIn",
  jobUrl: "",
  resumeLink: "",
  status: "Applied",
  notes: "",
  followUpDate: "",
};

const AddApplication = () => {
  const [form, setForm] = useState(defaultState);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // List of required fields
    const requiredFields = ["company", "role", "date"];

    // Check if any required field is empty
    for (let field of requiredFields) {
      if (!form[field] || form[field].trim() === "") {
        toast.error(`Please fill the ${field} field.`);
        return;
      }
    }
    const newApp = {
      id: `app-${Date.now()}`,
      ...form,
      dateSubmitted: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem("applications") || "[]");
      existing.unshift(newApp); // newest first
      localStorage.setItem("applications", JSON.stringify(existing));
      toast.success("Application added successfully!");
      setTimeout(() => {
        navigate("/applications");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save application. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          Add Application
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 rounded-xl shadow-lg mt-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #60A5FA, #93C5FD)",
          }}
        >
          {/* Company + Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Company
              </label>
              <input
                required
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Job Role
              </label>
              <input
                required
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Job role"
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Dates + Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Application Date
              </label>
              <input
                required
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Source + Status + Follow-up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Source
              </label>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              >
                <option>LinkedIn</option>
                <option>Indeed</option>
                <option>Company Site</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Follow-up Date
              </label>
              <input
                type="date"
                name="followUpDate"
                value={form.followUpDate}
                onChange={handleChange}
                className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* URLs */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Job URL
            </label>
            <input
              name="jobUrl"
              value={form.jobUrl}
              onChange={handleChange}
              placeholder="Job posting link (optional)"
              className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Resume Link
            </label>
            <input
              name="resumeLink"
              value={form.resumeLink}
              onChange={handleChange}
              placeholder="Resume link (optional)"
              className="input w-full bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1 text-white">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Extra notes"
              className="input w-full h-28 bg-white dark:bg-gray-900 text-gray-800 rounded-md px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="px-5 py-2 ring-1 ring-gray-300 dark:ring-gray-600 text-white hover:bg-gray-700 transition"
              style={{ borderRadius: "20px" }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-indigo-700 text-white hover:bg-indigo-800 transition"
              style={{ borderRadius: "20px" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
