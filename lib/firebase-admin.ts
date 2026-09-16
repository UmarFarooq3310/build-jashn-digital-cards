import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getMessaging, type Messaging } from 'firebase-admin/messaging';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

const DEFAULT_SERVICE_ACCOUNT = {
  type: "service_account",
  project_id: "jashn-app-e3888",
  private_key_id: "b99e20c05ec864645c26de0f2578355950063cd6",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfZTDSdm3mBhc6\nU/QWfb9wiDd52HDgn0DYPjdHxRzr5StXXv+2BgAZQAUQmjg70GoOpYdMTEY1wwY7\n7eirkI4DhzH4bUvvEPvZjyfaAEOaUEpR8yI6d54rCJG0OyqYgeCxvkRLG4v0C/eb\nMvS+U7v74C2z0kC/vG40SQEQnYU26ikIJ8qY22g7xug8EXZEb9UMArzHB3ni8mBT\nt6S413duufzPYlkvkpajmObJQw3ME+X2fiEdhBVPkSi2WnMU9jdzIpW+yAcRgGzv\n0h6g1mYlCP0+ruheOoPAnPvBtiDUGfqvlH6vM3L4Cip9L2v3wG7/tJ4gXYxq9RIt\nhqF64T7LAgMBAAECggEAHvq6WfVll7LwWchOZP6sshDvg1GDYszg/AZflSXk4J5K\nZbFTjsuswjuUoGzw6AMyUcVvPe+HJ9TPRd+P/KRcTag9mJSZkQ3ifR7bNn4dpYTc\nZQAV03pDNgb01qw3M6vugW1C9bwVX+nhhnsJYWKB40rnZw9CwWE8pBHaUKHk7c6X\nao4QdEGUwXzjuSaGZLut+f8Rw333sxafqJTXd/Z/yR+R1h+xrhk3CXHK2THEqJ4J\ndqD36hrb0p10DoAppUtV3hNOx9auGDeC6TCtNcO/6SJmCxBxcxYbPNz7fvamFujw\ni+tzxrgPlaTaUI47gp8P52QyhmeRAhNST7SC2pQTlQKBgQDUflAKxNLiuohFtU0k\nXOU9iwcP1uPDPyaFplSVHP1ajncwNC3BErk85FDC9hE12COruNnSgMO1V3BIGcLj\nPs7C/ABlCuASLD6MiU29FJI51uvrv+m9sHpEqCyUyTRMRJSPxlYkles2SjoDXNqs\nAC9WvpfUUKHmaXoHXO4iF/M+TwKBgQDAB8cwM1aDF3mtz4waxSRWnQyaXbrgsa14\njdfKOVJQk3V1GFiLLHUUCJptBcyplrq277PfSYopX4mviwMGDfyz9Qjo4Q6tUW70\nQNyLJGZi+XGl1IoMOrz+fZk+lalfUSVhKpUm4A5Wl2UXRUz15K7hMkm9TvE7Wigz\nM5Uj2QH0xQKBgQDAPeJ2S6kqnG1K+4JmAnEW45+o8dWvP4O/aEKfgNGpSriD8MDw\nKttRPpHeQDZDy15CLoNKUVo9xnR7lmrdomX2u3wz7cnYRxTzmgitpl3AXDOmXkK+\nbVnAoZFrrjhVQ7pP9LTcdpGM1Ux03F2tPKGXTekYmTZPuV9AKA/84kQbOwKBgF0N\n59pVpmCUKaSuZIg8bCWEqSzMqthjgVpf8efO6zKcoliB2bZnbryshpi6LLkpj4VC\nlvlm24q8/y2PwYFXmdNitFSVatVWFtxJ6hWLKApiMk5XtiXC+P6hwnbvc0n7Oo/h\nYLGb9ZbEenpSXL7zeEMsaUtRS9ilEcHuByF98VK5AoGBAJUliiiEvERyekAXYEHw\nohkWlxxt/JplrO0eWTLI6C7tvCOgZRmN3Gt+37ZKXOVrfzmuqshZpo/R4LL8niZ3\nywVaZxy6RGybbCGqrNta29Ptsi+LAcF+37RcWTb1LFSW7RCQrGf8HsZpdX8cgtnt\nLGn5TEwOSwUVh8K/mfMRjylf\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@jashn-app-e3888.iam.gserviceaccount.com",
};

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

  // Guaranteed fallback to project default credentials
  return DEFAULT_SERVICE_ACCOUNT;
}

export function getFirebaseAdminApp(): App {
  const appName = 'fcm-admin-v1';
  const existingApp = getApps().find(a => a.name === appName);
  if (existingApp) {
    return existingApp;
  }

  const serviceAccount = getServiceAccount();
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'jashn-app-e3888';

  return initializeApp(
    {
      credential: cert(serviceAccount),
      projectId,
    },
    appName
  );
}

export function getAdminMessaging(): Messaging {
  const app = getFirebaseAdminApp();
  return getMessaging(app);
}

export function getAdminDb(): Firestore {
  const app = getFirebaseAdminApp();
  return getFirestore(app);
}
