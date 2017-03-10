import React from 'react';
import StaticTable from './static_table';

import responseJSON from './table_data.js'

const headers = [
	"Type", "Name", "Value", "TTL"
]

const colorMap = {
	"A": "black",
	"MX": "blue",
	"TXT": "green",
	"AAAA": "gray",
	"LOC": "purple",
	"SRV": "red"
}

class DNSTable extends React.Component {
	constructor() {
		super();
		this.state = {records: undefined};
	}
	componentDidMount () {
		this.fetchData().then(records => {
			records = records.map(r => ({
				Type: r.type,
				Name: r.name,
				Value: r.value,
				TTL: r.ttl
			}))
			this.setState({ records })
		});
	}
	fetchData() {
		// simulate an async data fetch
		return new Promise((resolve, reject) => {
			setTimeout( ()=>{
				resolve(responseJSON)
			}, 1500);
		});
	}
	render() {
		if (this.state.records) {
			return (
				<StaticTable 
					className="dns-table" 
					headers={headers} 
					colorBy="Type" 
					colorMap={colorMap}
					data={this.state.records}
				/>
			);			
		} else {
			return <div>loading...</div>
		}

	}
}

export default DNSTable;