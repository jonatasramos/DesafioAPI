/* Arquivo teste CRUD de carstas
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

describe('CRUD letter', () => {
    
    // Create
    it('must create a new letter', async () => {
        const data: any = {
            login: 'admin',
            password: 'desafioapi'
        };
    
        const response_token = await request(App)
                .post('/api/auth/token')
                .send(data)
    
        const token = response_token.body.token;
        
        const letter = {
            sender_name: 'Teste Nome',
            sender_adress: 'Teste de Endereço',
            text: 'Teste de Texto',
            status: 1
        };

        const response = await request(App)
            .post('/api/letter/create')
            .set({ 'x-access-token': token })
            .send(letter);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toMatchObject({
            _id: expect.any(String),
            sender_name: expect.any(String),
            sender_adress: expect.any(String),
            text: expect.any(String),
            status: expect.any(Number),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            id: expect.any(Number),
        });
    });

    // Read
    it('must update a new letter', async () => {
        const data: any = {
            login: 'admin',
            password: 'desafioapi'
        };
    
        const response_token = await request(App)
                .post('/api/auth/token')
                .send(data)
    
        const token = response_token.body.token;
        
        const response = await request(App)
            .get('/api/letter/1')
            .set({ 'x-access-token': token });

        expect(response.status).toBe(200);
        expect(response.body[0]).not.toBeNull();
        expect(response.body[0]).toMatchObject({
            _id: expect.any(String),
            sender_name: expect.any(String),
            sender_adress: expect.any(String),
            text: expect.any(String),
            status: expect.any(Number),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            id: expect.any(Number),
        });
    });

    // Update
    it('must update a new letter', async () => {
        const data: any = {
            login: 'admin',
            password: 'desafioapi'
        };
    
        const response_token = await request(App)
                .post('/api/auth/token')
                .send(data)
    
        const token = response_token.body.token;
        
        const letter = {
            id: 1,
            sender_name: 'Teste Nome Update',
            sender_adress: 'Teste de Endereço Update',
            text: 'Teste de Texto Update',
            status: 1
        };

        const response = await request(App)
            .post('/api/letter/update')
            .set({ 'x-access-token': token })
            .send(letter);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toMatchObject({
            ok: expect.any(Boolean),
            message: expect.any(String)
        });
    });

    // Delete
    it('must delete a new letter', async () => {
        const data: any = {
            login: 'admin',
            password: 'desafioapi'
        };
    
        const response_token = await request(App)
                .post('/api/auth/token')
                .send(data)
    
        const token = response_token.body.token;
        
        const letter = {
            id: 1
        };

        const response = await request(App)
            .post('/api/letter/destroy')
            .set({ 'x-access-token': token })
            .send(letter);

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body).toMatchObject({
            ok: expect.any(Boolean),
            message: expect.any(String)
        });
    });
});