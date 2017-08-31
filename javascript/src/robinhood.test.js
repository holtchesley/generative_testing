var assert = require('assert');
require("mocha-testcheck").install();
var rh = require("./robinhood");
var tc = require("testcheck");


describe("Robinhood Hashmaps", function() {


    var cands = tc.sample(gen.alphaNumString,40);
    key_set = gen.oneOf(cands.map(gen.return));

    check.it("should behave like a regular map", {times:10000,maxSize:60},
             gen.array(
                 gen.oneOf([gen.object({instruction:"insert",
                                        key:key_set,val:gen.int}),
                            gen.object({instruction:"pop",key:key_set})])),
             function(steps) {
                 this.timeout(50000);
                 var canon = {};
                 var testing = rh.new_hash();
                 steps.forEach(function(step) {
                     switch(step.instruction) {
                     case "insert":
                         canon[step.key] = step.valuel;
                         rh.insert(testing,step.key,step.value);
                         break;
                     case "get":
                         var canon_res = canon[step.key];
                         var test_res = rh.get(testing,step.key);
                         assert.equal(test_res,canon_res);
                         break;
                     case "pop":
                         canon_res = canon[step.key];
                         delete canon[step.key];
                         test_res = rh.pop(testing,step.key);
                         assert.equal(test_res,canon_res);
                         break;
                     }
                     var canon_keys = Object.keys(canon);
                     var test_keys = testing.contents.map(function(x){return x[2];}).filter(function(x){return x !== null;});
                     canon_keys.sort();
                     test_keys.sort();
                     assert.deepEqual(canon_keys,test_keys);
                     canon_keys.forEach(function(k) {
                         assert.equal(canon[k],rh.get(testing,k));
                     });
                 });

             });


});


