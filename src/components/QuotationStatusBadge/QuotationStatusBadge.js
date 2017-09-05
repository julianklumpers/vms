import React, { Component } from 'react'
import styles from 'components/QuotationStatusBadge/styles.css'

class QuotationStatusBadge extends Component {

  constructor(props) {
    super(props)

    this.state = {
      toggle: false
    }

    this.select = this.select.bind(this)
    this.closeBadge = this.closeBadge.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeBadge)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeBadge)
  }

  closeBadge(event) {
    if(this.badge && !this.badge.contains(event.target)) {
      this.setState({toggle: false})
    }
  }

  select(value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <span
        className={`${styles.badge} ${styles[this.props.label.replace(' ', '_')]}`}
        style={this.props.dropdown && {display:'block',cursor:'pointer'}}
        onClick={() => this.setState({toggle: !this.state.toggle})}
        ref={(node) => this.badge = node}>
        {this.props.label}
        {
          this.props.dropdown &&
          <i className={`material-icons ${styles.carrot}`}>arrow_drop_down</i>
        }
        {
          this.props.dropdown && this.state.toggle &&
          <div className={styles.badgeDropdown}>
            {
              this.props.dropdownLabels
                .filter((label) => label !== this.props.label)
                .map((label) => <span key={label} onClick={() => this.select(label)} className={`${styles.badge} ${styles[label]}`}>{label}</span>)
            }
          </div>
        }
      </span>
    )
  }
}

export default QuotationStatusBadge
