var assert = require('assert');
require("mocha-testcheck").install();
var ms = require("./merge_sort");


describe("Merge Sort", function() {
    check.it("should be idempotent",gen.array(gen.int),function(coll) {
        var first = ms.mergesort(coll);
        var second = ms.mergesort(first);
        assert.deepEqual(first,second);
    });

    check.it("should be stable", gen.array(gen.object({"a":gen.int,"b":gen.int})),
             function(coll) {
                 var sorted = ms.mergesort(coll,function(x) {return x["a"];});
                 for (var ii = 0; ii < sorted.length; ii++) {
                     var search = sorted[ii]["a"];
                     var original_search =   coll.filter(function(s) {return s["a"] == search;})
                                                 .map(function(s) {return s["b"];});
                     var sorted_search   = sorted.filter(function(s) {return s["a"] == search;})
                                                 .map(function(s) {return s["b"];});
                     assert(original_search.length == sorted_search.length);
                     original_search.map(function(o,i) {
                         assert.equal(sorted_search[i],o);
                     });
                 }
             });
});


