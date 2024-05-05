import {Router} from 'express';	
const router = Router();
import dotenv from 'dotenv';
dotenv.config();

import { OAuth2Client } from 'google-auth-library';


//google oauth routes
router.post('/google', async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const client = new OAuth2Client(
        `${process.env.GOOGLE_CLIENT_ID}`, 
        `${process.env.GOOGLE_CLIENT_SECRET}`,
        `${process.env.REDIRECT_URL}`
    );

    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    })

    res.json({url: authorizeUrl});
})

router.get('/profile', (req, res) => {
    console.log(req.session, 'req.session.user')
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(403).json({ message: "No user logged in" });
    }
});

export default router;