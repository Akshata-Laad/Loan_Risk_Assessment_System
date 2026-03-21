import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanForm from "./pages/LoanForm";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoanForm />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;