export const requestResetPasswordTemplate = `
<html>
	<head>
		<style>
			<!-- Add your CSS styles here -->
		</style>
	</head>
	<body>
		<p>Hi!</p>
		<p>You requested to reset your password.</p>
		<p>Please, click the link below to reset your password</p>
		<a href="{{ link }}">Reset Password</a>
	</body>
</html>
`;

export const resetPasswordTemplate = `
<html>
	<head>
		<style></style>
	</head>
	<body>
		<p>Hi!</p>
		<p>Your password has been changed successfully</p>
	</body>
</html>;
`;
