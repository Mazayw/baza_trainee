import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Baza Trainee API',
			description: 'API endpoints for a Baza Trainee documented on swagger',
			contact: {
				name: 'Ihor',
				Discord: '@Mazayw#8624',
			},
			version: '150623',
		},
		components: {
			securitySchemes: {
				bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			},
		},
		security: [{ bearerAuth: [] }],
		servers: [
			{
				url: 'https://baza.foradmin.fun/',
				description: 'Live server',
			},
			{
				url: 'http://localhost:3001/',
				description: 'Local server',
			},
		],
	},
	apis: [`${__dirname}/routes/*.js`, `${__dirname}/models/*.js`],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number): void {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('/docs/api.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
}

export default swaggerDocs;
