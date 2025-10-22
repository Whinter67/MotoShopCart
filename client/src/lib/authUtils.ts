// Replit Auth integration - utility for unauthorized error handling
export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message);
}
