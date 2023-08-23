import './styles/main.scss'
import 'rsuite/dist/styles/rsuite-default.css';
import SignIn from './pages/SignIn';
import {Switch} from 'react-router'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home'
import { ProfileProvider } from './context/profile.context';
function App() {
  return (
  <ProfileProvider>
    <Switch>
      <PublicRoute path='/signin'>        
        <SignIn/>
      </PublicRoute>
      <PrivateRoute path="/">
        <Home/>
      </PrivateRoute>
    </Switch>
  </ProfileProvider>  
  );
}

export default App;
