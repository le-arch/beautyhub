## Deployment Notes

- **Environment Variables:**  
  Before deploying, ensure your Firebase and any external API credentials are set in `.env.local`.  
  Example:
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
  ```
  Do not commit secret keys to version control.

- **Firebase Configuration:**  
  Make sure Firebase Hosting, Firestore, and any required Firebase products are enabled in the Firebase Console.  
  Update your `firebase.json` and `.firebaserc` with the correct settings.

- **Build Artifacts:**  
  If using Next.js static export (`next export`), set the output directory to `out` and update Firebase Hosting config accordingly.

- **CI/CD:**  
  For automated deployments, consider using GitHub Actions with the Firebase Deploy Action:  
  [Firebase Deploy Action Guide](https://github.com/marketplace/actions/firebase-deploy)

- **Custom Domains:**  
  Configure your custom domain in the Firebase Console for production deployments.

---

For more details on design and features, see [`docs/blueprint.md`](https://github.com/le-arch/studio/blob/main/docs/blueprint.md).