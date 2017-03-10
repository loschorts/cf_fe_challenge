import React from 'react';
import TableHeader from './table_header';
import TableRow from './table_row';

class StaticTable extends React.Component {
	constructor() {
		super()
		this.state = {checked: [], selected: []}
	}
	handleChange(type, i) {
		return ()=> {
			newState = this.state;
			newState[type][i] = !this.state[type][i];
			this.setState({[type]: newState[type]})
		}
	}
	render() {
		const {className, headers, colorBy, colorMap, data, widths} = this.props;
		const {checked, selected} = this.state;

		//build rows
		const rows = data.map((entry, i) => {
			const values = []
			headers.forEach(header => {
				values.push(entry[header]);
			})

			return (
				<TableRow
					className={className}
					headers={headers}
					values={values} 
					ord={i}
					checked={checked[i]}
					selected={selected[i]}
					onCheckedChange={this.handleChange('checked', i)}
					onSelectedChange={this.handleChange('selected', i)}
					/>
			);
		});

		return (
			<table className={className}> 
				<thead><TableHeader className={className} headers={headers}/></thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

export default StaticTable;