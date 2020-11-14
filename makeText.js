/** Command-line tool to generate Markov text. */
const fs = require('fs')
const process = require('process')
const axios = require('axios')
const {MarkovMachine} = require('./markov')

function generateText(text) {
    const mm = new MarkovMachine(text)
    console.log(mm.makeText())
}

async function makeURLText(url) {
    let resp;
    try {
        resp = await axios.get(url)
    } catch (err) {
        console.error('Error: ', err)
        process.exit(1)
    }
    generateText(resp.data)
}

function makeFileText(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Error: ', err)
            process.exit(1)
        }
        generateText(data)
    })
}

function determinePathType() { 
    let pathType = process.argv[2]
    if (pathType === 'url') {
        makeURLText(process.argv[3])
    } else if (pathType === 'file') {
        makeFileText(process.argv[3])
    } else {
        console.error('Invalid input - third argument must be "url" or "file".')
        process.exit(1)
    }
}

determinePathType()