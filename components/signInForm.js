import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'
const Form = () => {
  const { signIn } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <div className="columns is-centered ">
        <FontAwesomeIcon icon={faIdBadge} size="5x"></FontAwesomeIcon>
      </div>
      <div className="columns is-centered">

        <div className="column is-6">
          <div className='field is-grouped is-grouped-centered '>
            <form>
              <div className="control ">
                <div className='column'>
                  <input className="input is-medium is-primary" type="text" name="username" placeholder="window username" onChange={e => setUsername(e.target.value)} />
                </div>
              </div>
              <div className="control">
                <div className='column'>
                  <input className="input is-medium is-primary" type="password" name="password" placeholder="window password" onChange={e => setPassword(e.target.value)} />
                </div>
              </div>
              <div className='column'>
                <div className='control is-expanded '>
                  <button className="button is-success is-fullwidth" onClick={e => authenticate(e)}>
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