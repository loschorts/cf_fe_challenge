import React from 'react';

const TableHeader = ({className, headers}) => {
	headers = [<th></th>].concat(headers.map(h => <th>{h}</th>));
	return (
		<tr className={`${className}-row header`}>{headers}</tr>
	)
}

export default TableHeader;