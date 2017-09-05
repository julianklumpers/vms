<BarChart width={this.state.chartWidth} height={300} data={data}
  margin={{top: 20, right: 30, left: 0, bottom: 0}}>
  <XAxis dataKey="name" />
  <YAxis/>
  <CartesianGrid strokeDasharray="1 3"/>
  <Tooltip content={<ChartTooltip />} />
  <Legend onClick={this.handleLegend} iconType="circle" verticalAlign="top" align="left" height={50} />
  <Bar dataKey={this.state.charts['Afdeling Orchideen'] ? 'Afdeling Orchideen' : 'null'} name="Afdeling Orchideen" fill="#673ab7" />
  <Bar dataKey={this.state.charts['Tuin 2'] ? 'Tuin 2' : 'null'} name="Tuin 2" fill="#ec8e00" />
</BarChart>
