'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import React, { FC, ReactElement, useEffect } from 'react';

interface GlobalErrorProps {
  error: unknown;
}

const GlobalError: FC<GlobalErrorProps> = ({ error }): ReactElement => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={400}/>
      </body>
    </html>
  );
};

export default GlobalError;
