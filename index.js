const fs = require("fs");

const loader = require("@assemblyscript/loader")

let wasmModule

const udpImports = require('./imports')

const imports = {
    ...eval(udpImports)
}

wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);

wasmModule.exports.test()
module.exports = wasmModule.exports