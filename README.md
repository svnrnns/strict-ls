# strict-ls

`strict-ls` is a TypeScript library that enhances LocalStorage usage by providing a simpler API and enforcing strict behavior, such as throwing errors when trying to access non-existent keys.

## Features

### Simple API:

- A simple and intuitive API for developers to interact with local storage, including methods for setting, getting, updating, and deleting data.

### Serialization and Deserialization:

- Automatically handles serialization and deserialization of complex data types such as objects and arrays when storing and retrieving data from local storage.

### Namespacing:

- Create a prefix to the data within local storage to prevent naming conflicts with other parts of the application or other applications using local storage or cookies.

### Error Handling:

- Improved error handling with customized error messages and formats for a better understanding and handling.

## Installation

You can install `strict-ls` via npm:

```bash
npm install strict-ls
```

## Basic Usage

[Install](#installation) the package.

You can create an instance of the Storage class to create a namespace.

> Note: This wonderful package makes the storage and retrieval of object data an easy task!

```js
// Basic Usage
import { get, set } from 'strict-ls';
set('myKey', { foo: 'bar' });
const value = get('myKey'); // { foo: 'bar' }

// With namespace
// Note that this will read 'namespace:token'
import LocalStorage from 'strict-ls';

const storage = new LocalStorage('namespace');
const value = storage.get('myKey');
```

You can remove keys directly with `remove(key)`.

## Advanced Usage

This package automatically throws errors for missing keys or empty input. It's a good practice to check if the key exists before accesing to it.

```js
import { exists } from 'strict-ls';

const boolean = exists('myKey');
```

## TypeScript Types

## Import

Types can be imported through the `/types` path.

```js
import { GenericItem } from 'strict-ls/types';
```

### `GenericItem`

The `GenericItem` type alias is defined as:

```ts
type GenericItem = Record<string, any> | string;
```

This type allows you to store either a string or an object (in the form of a dictionary) in LocalStorage, ensuring flexibility while maintaining type safety.

## Error Handling

The library provides specific error classes for handling LocalStorage errors:

- `LocalStorageError`: Thrown when trying to set or get a value with an invalid key.
- `LocalStorageCheckError`: Thrown when trying to access a key that does not exist.

## API Reference

### `LocalStorage`

**Constructor**

- `new LocalStorage(namespace?: string)`: Creates a new LocalStorage instance with an optional namespace.

### Methods

- `get(key: string): GenericItem`: Retrieves the value for a given key.
- `set(key: string, value: GenericItem): boolean`: Sets a value for a given key.
- `exists(key: string): boolean`: Checks if a key exists in LocalStorage.
- `remove(key: string): boolean`: Removes a key and its value from LocalStorage.
- `clear(): void`: Clears all items from LocalStorage.
- `length(): number`: Returns the total number of items in LocalStorage.
