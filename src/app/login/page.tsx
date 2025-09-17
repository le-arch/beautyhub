
'use client';

import { Suspense, lazy } from 'react';
import Header from '../header';

const LoginContent = lazy(() => import('@/components/login-content'));

export default function LoginPage() { 
  return (
    <div className="flex min-h-screen flex-col bg-background">
       <Header />
 
      {/* Wrap the main content with Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Original main content */}
 <main className="flex-1 flex items-center justify-center p-4">
 <LoginContent />
 </main>
      </Suspense>
    </div>
  )
}
