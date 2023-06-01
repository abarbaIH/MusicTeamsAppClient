import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRouters';

function App() {
  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App
