import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import styles from 'components/Nav/styles.css'

const Nav = (props) => {
  return (
    <nav>
      <div>
        <NavLink to="/home" activeClassName={styles.active}>Home</NavLink>
        <NavLink to="/customers" activeClassName={styles.active}>Klanten</NavLink>
        <NavLink to="/testlink" activeClassName={styles.active}>Testlink</NavLink>
        <NavLink to="/login" activeClassName={styles.active}>Help</NavLink>
      </div>
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    </nav>
  )
}

export default withRouter(Nav)