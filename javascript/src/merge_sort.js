function mergesort(coll, by) {
    if (coll == undefined) {return [];}
    if (coll.length <= 1) {
        return coll;
    } else {
        if (arguments.length == 1) {
            by = function(x) {return x;};
        }
        var hl = Math.floor(coll.length / 2);
        return merge_together(mergesort(coll.slice(0,hl),by),
                              mergesort(coll.slice(hl),by),
                              by);
    }
}


function merge_together(colla,collb,by) {
    var result = [];
    var ii = 0;
    var jj = 0;
    while (ii < colla.length && jj < collb.length) {
        if (by(colla[ii]) >= by(collb[jj])) {
            result.push(collb[jj]);
            jj = jj + 1;
        } else {
            result.push(colla[ii]);
            ii = ii + 1;
        }
    }
    if (ii == colla.length) {
        result = result.concat(collb.slice(jj));
    } else {
        result = result.concat(colla.slice(ii));
    }
    return result;
}

exports = module.exports;
exports.mergesort = mergesort;


