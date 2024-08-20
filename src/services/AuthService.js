import BaseService from './BaseService';

class AuthService extends BaseService {
    constructor() {
        super();
    }

    async signIn(credentials) {
        try {
            const response = await this.post('auth/login', credentials);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data);
        }
    }
}

export default new AuthService();
