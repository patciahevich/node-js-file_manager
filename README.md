## This is a File Manager, which using Node.js APIs for it's work

The file manager does the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## How to use?

1. The program is started by `npm-script` start in following way:

```
  npm run start -- --username=your_username

```

2. List of operations and their syntax:

- Go upper from current directory:

  ```
  up
  ```

- Go to dedicated folder from current directory (path_to_directory can be relative or absolute):

```
cd path_to_directory
```

- Print in console list of all files and folders in current directory:

```
ls
```

3. To finish our work press Ctrl + C or use command:

```

.exit

```

```

```
