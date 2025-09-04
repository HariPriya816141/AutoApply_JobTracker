import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "user@example.com",
  });

  // Apply theme changes to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load saved settings on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setTheme(saved.theme || "light");
      setNotifications(saved.notifications ?? true);
      setProfile(saved.profile || profile);
    }
  }, []);

  // Save settings to localStorage
  const handleSave = () => {
    const settings = { theme, notifications, profile };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-gray-100">
        ⚙️ Settings
      </h2>

      {/* Theme Section */}
      <div
        className="mb-6 mt-4 p-5 rounded-2xl shadow-lg"
        style={{
          background: "linear-gradient(135deg, #3B3F98, #5BC0EB, #AEEEEE)",
        }}
      >
        <h3 className="text-xl font-semibold mb-3 text-white">Theme</h3>
        <div className="flex flex-wrap gap-3">
          {["light", "dark"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-2 font-medium transition ${
                theme === t
                  ? "bg-white text-indigo-600 shadow-md"
                  : "bg-indigo-100 text-indigo-800"
              }`}
              style={{ borderRadius: "20px" }}
            >
              {t === "light" ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div
        className="mb-6 p-5 rounded-2xl shadow-lg"
        style={{
          background: "linear-gradient(135deg, #DAA520, #FFEB8A, #FFF7C0)",
        }}
      >
        <h3 className="text-xl font-semibold mb-3 text-white">Notifications</h3>
        <label className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-6 h-6 mx-2 accent-green-600"
          />
          <span className="text-white text-lg">Enable Email Notifications</span>
        </label>
      </div>

      {/* Profile Section */}
      <div
        className="mb-6 p-5 rounded-2xl shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(17,30,212,0.7), rgba(53,104,163,0.5), rgba(122,218,241,0.3))",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "1rem",
        }}
      >
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Full Name"
            className="w-full bg-white text-gray-800 rounded-xl px-4 py-2"
          />
          <input
            type="email"
            value={profile.email}
            readOnly
            className="w-full bg-gray-200 text-gray-500 rounded-xl px-4 py-2 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
          style={{ borderRadius: "20px" }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;


