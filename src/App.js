import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import QandA from './pages/QandA';
import TrainingSpace from './pages/TrainingSpace';
import { AiProvider } from './contexts/AiContext';

function App() {
  return (
    <AiProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow py-8">
            <Routes>
              <Route path="/" element={<QandA />} />
              <Route path="/training" element={<TrainingSpace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AiProvider>
  );
}

export default App;