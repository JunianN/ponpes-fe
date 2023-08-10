import { SeeSantri } from "@/pages/admin";
import { SignIn } from "@/pages/auth";
import { SeeSarpras } from "@/pages/admin";
import { SeeStruktur } from "@/pages/admin";
import { SeeUstaz } from "@/pages/admin";
import { ErrorPage } from "@/pages/Error";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SeeSantri />} />
        <Route path="/sarpras" element={<SeeSarpras />} />
        <Route path="/ustaz" element={<SeeUstaz />} />
        <Route path="/struktur" element={<SeeStruktur />} />
        <Route
          path="*"
          element={<ErrorPage status="404" statusCode="Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;