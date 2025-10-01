export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};