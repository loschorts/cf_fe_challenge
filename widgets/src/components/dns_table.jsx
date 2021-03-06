import React from 'react';
import Table from './table';
import Prefix from './prefix';

import responseJSON from './table_data.js';

const headers = [
	"Type", "Name", "Value", "TTL"
]

const colorMap = {
	"A": "rgb(64,64,64)",
	"MX": "rgb(47,123,191)",
	"TXT": "rgb(189,219,129)",
	"AAAA": "rgb(199,199,199)",
	"LOC": "rgb(98,161,217)",
	"SRV": "rgb(222,80,82)"
}

const prepend = (type, text) => {
	let prefix;
	switch (type) {
		case "A":
		case "AAAA":
			prefix = <Prefix text="points to"/>
			break;
		case "MX":
			prefix = <Prefix text="mail handled by"/>
			break;
	}

	return <span>{prefix}{text}</span>
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
				Value: prepend(r.type, r.value),
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
			}, 1000);
		});
	}
	render() {
		if (this.state.records) {
			return (
				<Table 
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