import React from 'react';
import { RegisterForm } from './_components';

const RegisterPage = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
