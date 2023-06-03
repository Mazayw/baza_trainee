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
			version: '1.0.2',
		},
		components: {
			securitySchemes: {
				bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			},
		},
		security: [{ bearerAuth: [] }],
		servers: [
			{
				url: 'https://baza-trainee-7ain.onrender.com/',
				description: 'Live server',
			},
			{
				url: 'http://localhost:3000/',
				description: 'Local server',
			},
		],
	},
	apis: ['./routes/*.js', './models/*.js', './routes/*.ts', './models/*.ts'],
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
