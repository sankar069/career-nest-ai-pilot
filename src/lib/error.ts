// Custom API Error class
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Error handler for API responses
export const handleError = (error: unknown) => {
  if (error instanceof APIError) {
    return {
      status: error.statusCode,
      message: error.message,
      details: error.details
    };
  }

  // Handle unknown errors
  console.error('Unhandled error:', error);
  return {
    status: 500,
    message: 'An unexpected error occurred'
  };
};

// Validation error handler
export class ValidationError extends APIError {
  constructor(message: string, details?: any) {
    super(400, message, details);
    this.name = 'ValidationError';
  }
}

// Authentication error handler
export class AuthError extends APIError {
  constructor(message: string = 'Authentication failed') {
    super(401, message);
    this.name = 'AuthError';
  }
}

// Rate limit error handler
export class RateLimitError extends APIError {
  constructor(message: string = 'Rate limit exceeded') {
    super(429, message);
    this.name = 'RateLimitError';
  }
} 