import './App.css';
import {Header, Footer, Todo} from './components/index';
function App() {
  return (
    <div className='App'>
      <Header/>
      <main>
        <Todo />
      </main>
      <Footer/>
      </div>
  );
}

export default App;
