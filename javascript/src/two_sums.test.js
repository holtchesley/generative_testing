var assert = require('assert');
require("mocha-testcheck").install();
var two_sums = require("./two_sums");


describe("Two Sums", function() {
    // check.it("should be solveable by hashing",gen.array(gen.int),gen.int,function(coll,target) {
    //     assert.equal(two_sums.hash(coll,target),two_sums.brute(coll,target));
    // });

    // check.it("should be solveable by squeezing",gen.array(gen.int),gen.int,function(coll,target) {
    //     assert.equal(two_sums.squeeze(coll,target),two_sums.brute(coll,target));
    // });

    check.it("should be solveable by binary search",gen.array(gen.int),gen.int,function(coll,target) {
        assert.equal(two_sums.binary(coll,target),two_sums.brute(coll,target));
    });

});


