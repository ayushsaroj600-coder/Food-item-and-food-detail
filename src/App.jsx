
import { Route, Routes } from "react-router-dom"; // 1. फिक्स: 'react-router-dom' का उपयोग करें
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import RecipeDetail from "./Pages/RecipeDetail"; // 2. फिक्स: RecipeDetail कंपोनेंट को इम्पोर्ट करें
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
