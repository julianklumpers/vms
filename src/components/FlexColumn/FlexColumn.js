import React from 'react'
import shared from 'shared.css'

class FlexColumn extends React.Component {

  constructor(props) {
    super(props)

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    if(this.props.responsiveChartWidth) {
      this.props.responsiveChartWidth(this.node.offsetWidth)
      window.addEventListener('resize', this.handleResize)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    if(this.props.responsiveChartWidth) {
      let width = this.node.offsetWidth
      if(window.innerWidth < this.node.offsetWidth) width = window.innerWidth
      this.props.responsiveChartWidth(width)
    }
  }

  render() {

    const styles = {
      flex: `0 0 ${this.props.width}`,
      height: this.props.height || 'auto'
    }

    return (
      <div
        ref={(node) => this.node = node}
        className={shared.flexColumn}
        style={styles}
      >
        {this.props.children}
      </div>
    )
  }
}

export default FlexColumn
