import { Typography } from "@material-ui/core";
import React from "react";

import  "./ZeroContentMessage.scss";

interface IZeroContentMessageProps {
	title: string;
	message: string;
}

function ZeroContentMessage(props: IZeroContentMessageProps) {
	return <div className="zero-content-message">
		<Typography variant="h6">{props.title}</Typography>
		<Typography align="center" variant="body1">{props.message}</Typography>
	</div>;
}

export default ZeroContentMessage;