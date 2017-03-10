import React from 'react';
import ColorSpan from './color_span';

class TableRow extends React.Component {
	constructor(){
		super()
		this.handleCheck = this.handleCheck.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleCheck(e){
		this.props.onCheckedChange(e.target.checked);
	}
	handleSelect(e){
		if (e.target !== this.checkbox) {
			this.props.onSelectedChange(e);
		}
	}
	render(){
		const {values, checked, selected, onCheckedChange, onSelectedChange, 
			className, headers, ord, colorBy, colorMap } = this.props;

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

		let borderColor;
		entries = entries.concat(values.map((v, i) => {
			const colorize = (i === headers.indexOf(colorBy));
			const color =  colorMap[v];
			if (colorize) borderColor = color;
			const content = colorize ? <ColorSpan color={color}>{v}</ColorSpan> : v;
			return(
				<td key={`${className}-row-${ord}-${i}`} className={headers[i]}>
					{content}
				</td>
			);
		}));

		return (
			<tr 
				style={{borderColor}}
				key={`className-row-${ord}`}
				onClick={this.handleSelect} 
				className={`${className}-row ${selectedClass} ${checkedClass}`}>
				{entries}
			</tr>
		)
	}
	
}

export default TableRow;