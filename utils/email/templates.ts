export const requestResetPasswordTemplate = `
<html>
	<body>
		<p>Hi {{name}},</p>
		<p>You requested to reset your password.</p>
		<p>Please, click the link below to reset your password</p>
		<a href="{{ link }}">Reset Password</a>
	</body>
</html>
`;

export const resetPasswordTemplate = `
<html>
	<body>
		<p>Hi {{name}},</p>
		<p>Your password has been changed successfully</p>
	</body>
</html>;
`;
