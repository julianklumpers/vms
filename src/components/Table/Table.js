import React from 'react'
import { formatTimestampToDate, decodeHtmlEntity } from 'helpers/helpers'
import styles from 'components/Table/styles.css'

const Table = (props) => {

	const scrollable = props.scrollable ? styles.scrollable : '';
	const cellWidth = 100 / props.headerLabels.length

	return (
		<div id="main-table">
      <table>
        <thead>
          <tr>
            {props.headerLabels.map((label, i) => <th key={i} width={cellWidth + '%'}>{decodeHtmlEntity(label)}</th>)}
          </tr>
        </thead>
      </table>
      <div className={scrollable}>
        <div>
					{
						Array.from(props.rows).length
						? <table>
		            <tbody>
									{
										Array.from(props.rows).map((row, i) =>
											<tr onClick={() => props.goTo(props.rows.get(row[0]))} key={i}>
												{Object.keys(row[1]).map((cell, i) => cell !== 'PATH' && <td key={i} width={cellWidth + '%'}>{row[1][cell]}</td>)}
											</tr>
										)
									}
		            </tbody>
		          </table>
						:	<div className={styles.noRowsContainer}>
								<p><span>&#128528;</span> {props.noRowsMessage} <i className="material-icons">subdirectory_arrow_right</i></p>
							</div>
					}
        </div>
      </div>
    </div>
	)
}

Table.defaultProps = {
	rows: {}
}

export default Table
