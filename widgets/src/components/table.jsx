import React from 'react';
import TableHeader from './table_header';
import TableRow from './table_row';

class Table extends React.Component {
	constructor(props) {
		super(props);
		const {data} = props;
		this.state = {checked: data.map(()=> false), selected: data.map(()=> false)}
	}
	handleChange(type, i) {
		return ()=> {
			const newSet = this.state[type].slice()
			newSet[i] = !newSet[i];
			this.setState({[type]: newSet}, ()=> {
				if (this.props.onChange) this.props.onChange(this.state);
			})
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
					colorBy={colorBy}
					colorMap={colorMap}
					key={`${className}-TableRow-${i}`}
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

export default Table;