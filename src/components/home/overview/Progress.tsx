import React from 'react';

import "./Progress.scss";

import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

function Progress(props: CircularProgressProps & { value: number }) {
	return (
		<Box className="progress" position="relative" display="inline-flex">
			<CircularProgress
				className="progress-circle-background"
				size="100%"
				variant="static"
				thickness={5}
				{...props}
				style={{ color: '#eceef8'}}
				value={100}
			/>
			<CircularProgress
				className="progress-circle"
				size="100%"
				variant="static"
				thickness={5}
				{...props}
			/>
			<Box
				className="progress-label"
			>
				<p className="progress-label-text">{`${Math.round(props.value)}%`}</p>
			</Box>
		</Box>
	);
}

export default Progress;