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
		const {values, checked, selected, onCheckedChange, onSelectedChange, className, headers } = this.props;

		const selectedClass = selected ? "selected" : "";
		const checkedClass = checked ? "checked" : "";

		const checkbox = (
			<input 
				ref={cb =>{this.checkbox = cb}}
				type="checkbox" 
				checked={checked} 
				onChange={this.handleCheck}/>
		);

		const entries = [<td className="table-checkbox">{checkbox}</td>].concat(values.map((h, i) => <td className={headers[i]}>{h}</td>));
		return (
			<tr 
				onClick={this.handleSelect} 
				className={`${className}-row ${selectedClass} ${checkedClass}`}>
				{entries}
			</tr>
		)
	}
	
}

export default TableRow;