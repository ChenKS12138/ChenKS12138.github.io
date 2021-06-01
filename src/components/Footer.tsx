import React from "react";

export default function Footer() {
  return (
    <footer
      className="app-footer"
      style={{
        minHeight: 100,
        width: "100%",
        backgroundColor: "#323437",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ marginRight: 180 }}>
        <div style={{ marginBottom: 5 }}>blog | cattchen.top</div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://beian.miit.gov.cn", "__black");
          }}
        >
          <img
            src="https://pikanglong.com/wp-content/uploads/2020/04/%E5%A4%87%E6%A1%88%E5%9B%BE%E6%A0%87.png"
            alt=""
            width="20"
            height="20"
          />
          <span>闽ICP备20013211号-1</span>
        </div>
      </div>
    </footer>
  );
}
