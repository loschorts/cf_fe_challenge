import React from 'react';

const TableHeader = ({className, headers}) => {
	headers = [<th key={`${className}-header-checkbox`} className="table-checkbox"></th>].concat(
		headers.map(h => <th key={`${className}-header-${h}`} className={h}>{h}</th>)
	);
	return (
		<tr className={`${className}-row headers`}>{headers}</tr>
	)
}

export default TableHeader;