import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Main from "./Main";

function App() {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-40px)] w-full overflow-hidden">
        <SideBar />
        <Main />
      </div>
    </>
  );
}

export default App;
