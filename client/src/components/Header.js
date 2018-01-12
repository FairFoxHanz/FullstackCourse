import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="light-blue nav-wrapper">
          <a href="#" className="left brand-logo">
            Emaily
          </a>
          <ul className="right">
            <li>
              <a>Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
