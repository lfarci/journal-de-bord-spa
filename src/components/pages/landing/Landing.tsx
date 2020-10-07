import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Page } from "../../common";

import "./Landing.scss";
import { AuthService } from "../../../services/AuthService";

function Landing() {

	const authService = new AuthService();

	return <Page title="Journal de bord" selected="home">
		<div className="welcome-message-container">
			<div className="welcome-message">
				<Typography variant="h4" align="center">
					Welcome to the Journal de bord project.
				</Typography>
				<Typography variant="subtitle1" align="center">
					Create your learner driver journal and keep track of your first rides. Register now and start tracking!
				</Typography>
				<Box
					display="flex"
					flexDirection="row"
					justifyContent="center"
				>
					<Button
						id="landing-register-button"
						variant="contained"
						color="primary"
						size="large"
						onClick={() => { authService.register() }}>
						Register now
					</Button>
				</Box>
			</div>
		</div>

	</Page>;
}

export default Landing;