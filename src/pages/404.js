import React from 'react';

// Components
import Layout from '../layouts/index'

const NotFoundTemplate = () => (
  <main>
    <div className="container my-20">
      <div className="error-404">
        <h1 className="text-center text-black text-3xl sm:text-5xl font-bold mb-5">404</h1>
        <p className="text-center">Page Not Found</p>
      </div>
    </div>
  </main>
);

const NotFound = () => {

  return (
      <Layout>
        <NotFoundTemplate />
      </Layout>
  );
};


export default NotFound;