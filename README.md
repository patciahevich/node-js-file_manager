## This is a File Manager, which using Node.js APIs for it's work

The file manager does the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## How to use?

1. ### The program is started by `npm-script` start in following way:

```
npm run start -- --username=your_username
```

# 🔥Important note: To handle filenames with spaces, you can use the backslash (\\) to escape the spaces. 🔥

2. ### List of operations and their syntax:

   1. Navigation & working directory (nwd):

      - Go upper from current directory: ` up`

      - Go to dedicated folder from current directory (path_to_directory can be relative or absolute): `cd path_to_directory`

      - Print in console list of all files and folders in current directory: ` ls`

   2. Basic operations with files:

      - Read file and print it's content in console: `cat path_to_file`

      - Create empty file in current working directory: `add new_file_name`

      - Rename file: `rn path_to_file new_filename`

      - Copy file: `  cp path_to_file path_to_new_directory`

      - Move file: `mv path_to_file path_to_new_directory`

      - Delete file: `rm path_to_file`

   3. Operating system info:

      - Get EOL: `os --EOL`

      - Get host machine CPUs info: `os --cpus`

      - Get home directory: `os --homedir`

      - Get current system user name: `os --username`

      - Get CPU architecture for which Node.js binary has compiled: `os --architecture`

   4. Hash calculation

      - Calculate hash for file: `hash path_to_file`

   5. Compress and decompress operations:

      - Compress file (using Brotli algorithm): `compress path_to_file path_to_destination`

      - Decompress file (using Brotli algorithm): `decompress path_to_file path_to_destination`

3. ### To finish our work press Ctrl + C or use command `.exit`
