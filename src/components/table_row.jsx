import React from 'react';

class TableRow extends React.Component {
	constructor(){
		super()
		this.handleCheck = this.handleCheck.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleCheck(e){
		e.preventDefault();
		this.props.onCheckedChange(e.currentTarget.checked);
	}
	handleSelect(e){
		if (e.currentTarget !== this.checkbox) {
			this.props.onSelectedChange(e);
		}
	}
	render(){
		const {values, checked, selected, onCheckedChange, onSelectedChange, className, headers, ord } = this.props;

		const selectedClass = selected ? "selected" : "";
		const checkedClass = checked ? "checked" : "";

		const checkbox = (
			<input 
				ref={cb =>{this.checkbox = cb}}
				type="checkbox" 
				checked={checked} 
				onChange={this.handleCheck}/>
		);

		let entries = [<td key={`${className}-row-${ord}-checkbox`} className="table-checkbox">{checkbox}</td>]

		entries = entries.concat(
			values.map((h, i) => <td key={`${className}-row-${ord}-${i}`} className={headers[i]}>{h}</td>)
		);

		return (
			<tr 
				key={`className-row-${ord}`}
				onClick={this.handleSelect} 
				className={`${className}-row ${selectedClass} ${checkedClass}`}>
				{entries}
			</tr>
		)
	}
	
}

export default TableRow;