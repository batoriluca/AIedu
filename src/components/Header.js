import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AIedu</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Q&A</Link></li>
            <li><Link to="/training" className="hover:underline">Training Space</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;