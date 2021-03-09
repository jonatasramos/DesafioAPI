/**
 * Arquivo teste de autenticações
 * 
 * @author Jônatas Ramos
 */
import Database from '../../src/services/Database';
import App from '../../src/services/App';
import request from 'supertest';

beforeAll(async () => {
    Database.connect();
});

afterAll(() => {
    Database.close();
});

describe('Authentication', () => {
    it('must authenticate and return the JWT token when the user informs your credentials', async () => {
        const data: any = {
            login: 'admin',
            password: 'desafioapi'
        };
    
        const response = await request(App)
            .post('/api/auth/token')
            .send(data);

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            token: expect.any(String)
        });
    });

    it('must authenticate a route with the token generated from service JWT', async () => {
        const data: any = {
            login: 'admin',
            password: 'desafioapi'
        };
    
        const response = await request(App)
            .post('/api/auth/token')
            .send(data);

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            token: expect.any(String)
        });

        const token = response.body.token;

        const response_get = await request(App)
            .get('/api/letter')
            .set({ 'x-access-token': token });

        expect(response_get.status).toBe(200);
    });
});