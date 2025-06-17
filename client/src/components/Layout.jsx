import Navbar from './Navbar';
import '../styles/main.css';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="container mt-2">
        {children}
      </main>
    </div>
  );
};

export default Layout; 