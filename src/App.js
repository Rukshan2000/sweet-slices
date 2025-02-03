import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom

import Splash from './pages/SplashPage';
import InvoicePage from './pages/InvoicePage';
import PasswordPage from './pages/PasswordPage';
import Locate from './pages/Locate';
import BillPage from './pages/BillPage';



function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Router */}
        <Route path="/" element={<Splash />} /> {/* Use element prop instead of component */}
        <Route path="/passwordpage" element={<PasswordPage />} /> {/* Use element prop instead of component */}
        <Route path="/invoicepage" element={<InvoicePage />} /> {/* Use element prop instead of component */}
        <Route path="/billpage" element={<BillPage />} /> {/* Use element prop instead of component */}
        <Route path="/locate" element={<Locate />} /> {/* Use element prop instead of component */}

      </Routes>
    </Router>
  );
}

export default App;
