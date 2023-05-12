import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import LoginForm from './components/login';
import Search from './components/search';
import SignupPage from './components/sign_up';
import CreatePost from './components/create_post';

function App() {
  return (
      <Router>
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/create/post' element={<CreatePost/>}/>
        {/* Add more routes here as needed */}
      </Routes>

      </Router>
    );
}

export default App;
