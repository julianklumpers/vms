import React from 'react'
import { Link } from 'react-router-dom'

import styles from 'components/BreadCrumbs/styles.css'

const BreadCrumbs = (props) => {

  const urls = props.path.url.replace(/\b[\/]$/gm, '').split('/')
  const paths = urls.reduce((arr, val) => {

    let innerArr

    if(val === '') {
      innerArr = ''
    } else {
      innerArr = [...arr].pop()[1] + '/' + val
    }

    arr.push([val, innerArr])

    return arr
  }, [])

	return (
		<div className={styles.breadcrumb}>
      {
        paths.map((path, i) => {
          return (
            path[0] === ''
            ? <Link className={styles.home} key={i} to="/home"><i className="material-icons">home</i></Link>
            : <Link className={styles.crumb} key={i} to={path[1]}>{path[0]}</Link>
          )
        })
      }
		</div>
	)
}

export default BreadCrumbs
