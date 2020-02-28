import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsConfig from 'cors';

admin.initializeApp();
const cors = corsConfig({ origin: true });

export const setUserClaim = functions.https.onRequest((req, res) =>
    cors(req, res, async () => {
        const fnAdmin = async () => {
            console.log(req.body);
            const claims = { role: req.body.data.role, admin: false };
            claims.admin = req.body.data.role === 'admin';
            await admin.auth().setCustomUserClaims(req.body.data.uid, claims);
            res.send({ data: 'Success' });
        }
        await adminFunction(req, res, fnAdmin);
        return;
    }));

export const getUsers = functions.https.onRequest((req, res) =>
    cors(req, res, async () => {
        const fnAdmin = async () => res.send({ data: await admin.auth().listUsers() });
        await adminFunction(req, res, fnAdmin);
        return;
    }));

async function adminFunction(req: functions.https.Request, res: functions.Response, fnAdmin: () => Promise<any>) {
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        if (!decodedIdToken['admin']) {
            console.log('User is not admin');
            res.status(403).send('Unauthorized');
            return;
        } else {
            await fnAdmin();
        }
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
}