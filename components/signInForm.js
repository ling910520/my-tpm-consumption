import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';

const Form = () => {
  const { signIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const authenticate = e => {
    e.preventDefault();
    if (username != '' || password != '') {
      signIn(username, password);
    } else {
      alert('Please enter your username and password');
    }
  };

  return (
    <div className='section '>
      <div className="columns is-centered">
        <div className="column is-6">
          <div className='field is-grouped is-grouped-centered notification '>
            <form>
            <label className='label'>Sign In</label>
                <div className="control ">
                  <div className='column'>
                    <input className="input is-medium is-primary" type="text" name="username" placeholder="username" onChange={e => setUsername(e.target.value)} />
                  </div>
              </div>
                <div className="control">
                  <div className='column'>
                    <input className="input is-medium is-primary" type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                  </div>
              </div>
              <div className='column'>
                <div className='control is-expanded '>
                  <button className="button is-success" onClick={e => authenticate(e)}>
                    Sign In
                </button>
                </div>

              </div>

            </form>
          </div>
        </div>

      </div>
    </div>


  );
};

export default Form;