# Zict-preprocessor

A preprocessor that filters out irrelevant language sections from Wiktionary
HTML articles. The preprocessor is meant to be used with the command-line
dictionary [zict](https://github.com/luis-licea/zict).

To initialize, run:

```bash
mkdir ~/Code
cd Code
git clone https://github.com/luis-licea/zict-preprocesor
cd zict-preprocessor
npm install
```

Finally, update `~/.config/zict/zict.bash`:

```bash
declare -r MY_PREPROCESSOR="$HOME/Code/zict-preprocessor/bin/main.mjs"
```

## Development

To run tests, run:

```bash
npm run test
```
