import './App.css';

function Header() {
    return (
      <header>
        <ul className="tablist">
            <li className='time'>time</li>
            <ul className="tabsinner hidden">
                <li><a href='#'>Resources</a></li>
                <li><a href='work.html'>Workers</a></li>
            </ul>
            <li id="version">Version 1.0.0</li>
        </ul>
      </header>
    )
  }
  
  export default Header;