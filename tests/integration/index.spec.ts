import request from 'supertest';
import app from '../../src/app';

describe('server check', () => {
    it('server up without error', (done) => {
        request(app).get('/v1').expect(200, done);
    });
});