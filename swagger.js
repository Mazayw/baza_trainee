import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Baza Trainee API',
			description: 'API endpoints for a Baza Trainee documented on swagger',
			contact: {
				name: 'Ihor',
				Discord: '@Mazayw#8624',
				//url: 'https://github.com/DesmondSanctity/node-js-swagger',
			},
			version: '1.0.0',
		},
		components: {
			securitySchemes: {
				bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			},
		},
		security: [{ bearerAuth: [] }],
		servers: [
			{
				url: 'http://localhost:3000/',
				description: 'Local server',
			},
			{
				url: 'https://baza-trainee.onrender.com',
				description: 'Live server',
			},
		],
	},
	// looks for configuration in specified directories
	apis: ['./routes/*.js', './models/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
	// Swagger Page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	// Documentation in JSON format
	app.get('/docs/api.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
}
export default swaggerDocs;
