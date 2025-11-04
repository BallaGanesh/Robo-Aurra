export function validatePassword(password: string, length?: number): {
  hasSpecial: boolean;
  hasLower: boolean;
  hasNum: boolean;
  hasUpper: boolean;
  validateAll(): boolean;
  getError(): Error | string;
  getErrorMessage(): string;
  getAllValidationErrorMessage(): string;
};
