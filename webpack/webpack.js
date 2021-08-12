const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default

function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');

    // es6(parser)->ast
    const ast = parser.parse(content, {
        sourceType: 'module'
    })

    const dependencies=[]
    // 钩子
    traverse(ast, {
        ImportDeclaration: ({node}) => {
            console.log('node',node)
            dependencies.push(node.source.value)
            console.log(node.source.value)
        }
    })
    //console.log(ast)
}
createAsset('./src/index.js')