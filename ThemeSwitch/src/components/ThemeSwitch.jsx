import { useState, useEffect } from "react";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark"; 
  });

  function setTheme() {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  }

  useEffect(() => {
    document.body.style.transition="background-color 1s ease-out,color 0.5s ease";
    document.body.style.backgroundColor = isDark ? "black" : "white";
    document.body.style.color = isDark ? "white" : "black";  // Fix 2: Corrected "back" to "black"
  }, [isDark]);

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1 style={{ color: "#ff0111" }}>This is a Color Switch Theme</h1>
      <button onClick={setTheme}>
        Switch
      </button>
    </div>
  );
}
