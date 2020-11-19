import React from 'react';

import "./Progress.scss";
import 'react-circular-progressbar/dist/styles.css';

import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Typography } from '@material-ui/core';

function Progress(props: CircularProgressProps & { value: number }) {

	const MIN_VALUE: number = 0;
	const MAX_VALUE: number = 100;

	return <div className="circular-progress-bar">
		<CircularProgressbarWithChildren
			value={props.value}
			minValue={MIN_VALUE}
			maxValue={MAX_VALUE}
			strokeWidth={10}
			styles={{ path: { stroke: "#3f51b5" } }}
		>
			<div><Typography variant="h6">{`${Math.round(props.value)}%`}</Typography></div>
			<div><Typography variant="subtitle1">of your goal</Typography></div>
		</CircularProgressbarWithChildren>
	</div>;
}

export default Progress;