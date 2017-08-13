const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const parser = require('../utils/jonak-parser');

let passData =
    `---
title: Test Title
template: localhost/files/index
---
# ok this is title of the post
another paragraph

> a quote maybe
> nothing else matters

- mu hahah
- hahah
- hu hahahah`.split('\n');

let passData2 = `
# post with only content

content with no meta is perfect
`.split('\n');

describe('jonak parser', done => {
    let parsed = null;

    it('should say hello', done => {
        assert.equal(20, 20);
        done();
    });

    it('should parse correctly', done => {
        parsed = parser(passData);

        expect(parsed).to.be.a('object');

        done();
    });

    it('should have meta and content in right format', done => {
        parsed = parser(passData);

        expect(parsed).to.have.property('meta');
        expect(parsed).to.have.property('content');

        expect(parsed.meta).to.be.a('object');
        expect(parsed.meta).to.have.property('title');
        expect(parsed.meta).to.have.property('template');

        expect(parsed.content).to.be.a('string');

        done();
    });

    it('should pass and have empty meta', done => {
        parsed = parser(passData2);

        expect(parsed).to.be.a('object');

        expect(parsed).to.have.property('meta');
        expect(Object.keys(parsed.meta).length).to.be.equal(0);
        expect(parsed).to.have.property('content');

        done();
    });
});

