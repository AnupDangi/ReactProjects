import { useState } from "react";
import "./Tabs.css";
export default function Tabs({ tabsContent, onChange }) {
  const [currTabIdx, setCurrTabIdx] = useState(0);

  function handleOnClick(getCurrentIndex) {
    setCurrTabIdx(getCurrentIndex);
    if (onChange) {
      onChange(getCurrentIndex);
    }
  }

  return (
    <div className="wrapper">
      <div className="heading">
        {tabsContent.map((tabItem, index) => (
          <div
            className={`tab-tem ${currTabIdx === index ? "active" : null}`}
            onClick={() => handleOnClick(index)}
            key={tabItem.label}
          >
            <span className="label">{tabItem.label}</span>
          </div>
        ))}
      </div>
      <div className="content" style={{color:"red"}}>
        {tabsContent[currTabIdx] && tabsContent[currTabIdx].content}
      </div>
    </div>
  );
}
