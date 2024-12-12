import React from "react"

import Home from "./pages/Home"
import { ModeToggle } from "./components/mode-toggle"

function App() {
  const [isMobile, setIsMobile] = React.useState(false);
  
  const checkScreenSize = () => {
    setIsMobile(window.matchMedia("(max-width: 1024px").matches);
  }

  React.useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
          <h3 className="text-2xl pb-4">OOPPPPSS!! NOT ACCESSIBLE TO SMALL SCREEN SIZES 🤪</h3>
          <ModeToggle />
      </div>
    )
  }

  return (
      <div className="flex h-screen">
        <Home />
      </div>
  )
}

export default App