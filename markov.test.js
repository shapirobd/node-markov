const markov = require('./markov')
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
    test('chains have the correct words', () => {
        expect(chains['This']).toEqual([ 'is' ])
        expect(chains['is']).toEqual([ 'sample', 'fun' ])
        expect(chains['sample']).toEqual([ 'text', 'stuff' ])
        expect(chains['text']).toEqual([ 'and' ])
        expect(chains['and']).toEqual([ 'it' ])
        expect(chains['it']).toEqual([ 'is' ])
        expect(chains['fun']).toEqual([ 'to' ])
        expect(chains['to']).toEqual([ 'create' ])
        expect(chains['create']).toEqual([ 'sample' ])
        expect(chains['stuff']).toEqual([ 'like' ])
        expect(chains['like']).toEqual([ 'this' ])
        expect(chains['this']).toEqual([ null ])
    })
})