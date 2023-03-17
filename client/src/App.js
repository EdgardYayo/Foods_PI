import './App.css';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Landing from './components/Landing/Landing';
import Form from './components/Form/Form';
import {Route} from 'react-router-dom';
import Fav from './components/Fav/Fav';
import Comments from './components/Comments/Comments';


function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route exact path='/home'>
        <Home/>
      </Route>
      <Route exact path='/detail/:id'  component={Detail}/>
      <Route exact path='/form'>
        <Form />
      </Route>
      <Route exact path='/fav' component={Fav}/>
      <Route exact path='/comments' component={Comments}/>
    </div>
  );
}

export default App;
