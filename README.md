# coc-torque

torque language server extension for coc.nvim.

## Install

`:CocInstall coc-gn`

## Build torque language server

```
cd v8
autoninja -C out/Release torque-language-server
cp out/Release /usr/bin/torque-language-server
```

## License

MIT

---

> This extension is built with [create-coc-extension](https://github.com/fannheyward/create-coc-extension)
