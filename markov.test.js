const markov = require('./markov')
const makeText = require('./makeText')
let MarkovMachine = markov['MarkovMachine']

let text = 'This is sample text and it is fun to create sample stuff like this'

let mm = new MarkovMachine(text)
let chains = mm.makeChains()

describe('makeChains function', () => {
    test('chains is object', () => {
        expect(chains).toEqual(expect.any(Object))
        expect(chains['This']).toBeTruthy()
    })
    test('each chain is array', () => {
        for (let chain in chains) {
            expect(chains[chain]).toEqual(expect.any(Array))
        }
    })
})