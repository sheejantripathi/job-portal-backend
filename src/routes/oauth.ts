import {Router} from 'express';	
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const router = Router();

declare module 'express-session' {
    interface SessionData {
      user: any;  // You can replace `any` with a more specific type that matches the user data structure.
    }
  }

async function getUserData(access_token: string) {
    try {
        const response = await fetch(`${process.env.GOOGLE_API_URL}?alt=json&access_token=${access_token}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
    
}

router.get('/', async (req, res, next) => {
    const code = req.query.code as string;
    if (!code) {
        res.status(400).send({ error: 'No code provided' });
        return;
    }
    try {
        const client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID, 
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.REDIRECT_URL
        );
        const tokenResponse = await client.getToken(code);
        await client.setCredentials(tokenResponse.tokens);
        const user = client.credentials;
        if (typeof user.access_token !== 'string') {
            console.log('Access token is not available');
            res.status(500).send({ error: 'Access token is not available' });
            return;
        }
        const userData = await getUserData(user.access_token);
        console.log(userData, 'userData')
        req.session.user = userData;
        res.redirect('http://localhost:3000/jobs');
    } catch (error) {
        console.log(error, 'Error While signing in with google')
        res.status(500).send({ error: 'Error While signing in with google' });
    }
});

router.get('/profile', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(403).json({ message: "No user logged in" });
    }
});

export default router;