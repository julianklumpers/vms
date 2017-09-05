import React, { Component } from 'react'
import { formatCurrency } from 'helpers/helpers'

const ChartTooltip = (props) => {

  const styles = {
    container: {
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px 0 #6B6B6B',
    },
    title: {
      backgroundColor: '#6fbe44',
      color: '#fff',
      padding: 10,
      fontSize: 14,
      fontWeight: 'bold',
      display: 'block'
    },
    item: {
      display: 'block',
      padding: 10,
      fontSize: 12
    },
    color: {
      width: 15,
      height: 15,
      display: 'block',
      float: 'left',
      marginRight: 5,
      borderRadius: 100
    }
  }

  const { active } = props

  if(active) {
    console.log(props)
    const { label, payload } = props
    return (
      <div style={styles.container}>
        <span style={styles.title}>{`Periode: ${label}`}</span>
        {
          payload
          .filter((item) => item.dataKey !== 'null')
          .map((item, i) => {
            return (
              <span style={styles.item} key={`item-${i}`}>
                <span style={{...styles.color, backgroundColor: item.color}}></span>
                {item.name}: <span style={{fontWeight: 'bold'}}>{formatCurrency(item.value)}</span>
              </span>
            )
          })
        }
      </div>
    )
  }

  return null
}

export default ChartTooltip
