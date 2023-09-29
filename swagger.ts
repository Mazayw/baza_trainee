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
			version: '290923',
		},
		components: {
			securitySchemes: {
				cookieAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			},
		},
		servers: [
			{
				url: 'https://baza-trainee.tech/api/v1',
				description: 'Live server',
			},
			{
				url: 'http://localhost:3001/api/v1/',
				description: 'Local server',
			},
		],
	},
	apis: [`${__dirname}/routes/*.js`, `${__dirname}/models/*.js`],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number): void {
	app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('/api/v1/docs/api.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
}

export default swaggerDocs;
