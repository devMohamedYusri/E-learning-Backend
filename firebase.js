const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./e_learning_platform_2093a_firebase_adminsdk_y7oex_1bedcb585e.json'); // Download from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://e-learning-platform-2093a.appspot.com' // Example: 'your-project-id.appspot.com'
});

const bucket = getStorage().bucket();

module.exports = bucket;