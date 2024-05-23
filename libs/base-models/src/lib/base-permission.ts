export class BaseCrudPermission {
  static PREFIX: string;

  static INDEX: string;

  static SHOW: string;

  static STORE: string;

  static UPDATE: string;

  static DESTROY: string;

  static seedCrudPermissions(prefix: string): void {
    Object.defineProperty(this, 'PREFIX', {
      value: prefix,
      configurable: false,
      writable: false,
    });
    Object.defineProperty(this, 'INDEX', {
      value: `${prefix}-index`,
      configurable: false,
      writable: false,
    });
    Object.defineProperty(this, 'SHOW', {
      value: `${prefix}-show`,
      configurable: false,
      writable: false,
    });
    Object.defineProperty(this, 'STORE', {
      value: `${prefix}-store`,
      configurable: false,
      writable: false,
    });
    Object.defineProperty(this, 'UPDATE', {
      value: `${prefix}-update`,
      configurable: false,
      writable: false,
    });
    Object.defineProperty(this, 'DESTROY', {
      value: `${prefix}-destroy`,
      configurable: false,
      writable: false,
    });
  }
}
