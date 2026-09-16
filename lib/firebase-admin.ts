import { initializeApp, getApps, getApp, cert, type App } from 'firebase-admin/app';
import { getMessaging, type Messaging } from 'firebase-admin/messaging';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

function getServiceAccount() {
  let serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountEnv) {
    try {
      const fs = require('fs');
      const path = require('path');
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/FIREBASE_SERVICE_ACCOUNT_KEY=\x27([\s\S]+?)\x27/) || content.match(/FIREBASE_SERVICE_ACCOUNT_KEY="([\s\S]+?)"/);
        if (match) {
          serviceAccountEnv = match[1];
        }
      }
    } catch {}
  }

  if (serviceAccountEnv) {
    try {
      const parsed = typeof serviceAccountEnv === 'object' ? serviceAccountEnv : JSON.parse(serviceAccountEnv);
      if (parsed.private_key) {
        parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      }
      return parsed;
    } catch {
      try {
        const decoded = Buffer.from(serviceAccountEnv, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        if (parsed.private_key) {
          parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
        }
        return parsed;
      } catch (err) {
        console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON:', err);
      }
    }
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'jashn-app-e3888';

  if (clientEmail && privateKey) {
    return {
      projectId,
      clientEmail,
      privateKey,
    };
  }

  return null;
}

export function getFirebaseAdminApp(): App {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0]!;
  }

  const serviceAccount = getServiceAccount();
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'jashn-app-e3888';

  if (serviceAccount) {
    return initializeApp({
      credential: cert(serviceAccount),
      projectId,
    });
  }

  return initializeApp({
    projectId,
  });
}

export function getAdminMessaging(): Messaging {
  const app = getFirebaseAdminApp();
  return getMessaging(app);
}

export function getAdminDb(): Firestore {
  const app = getFirebaseAdminApp();
  return getFirestore(app);
}
