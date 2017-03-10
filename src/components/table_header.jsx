import React from 'react';

const TableHeader = ({className, headers}) => {
	headers = [<th className="table-checkbox"></th>].concat(
		headers.map(h => <th className={h}>{h}</th>)
	);
	return (
		<tr className={`${className}-row headers`}>{headers}</tr>
	)
}

export default TableHeader;