class LocalStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocalStorageError';
  }
}

class LocalStorageCheckError extends LocalStorageError {
  constructor(key: string) {
    super(`The key "${key}" does not exist in the current local storage`);
    this.name = 'LocalStorageCheckError';
  }
}

export { LocalStorageError, LocalStorageCheckError };
