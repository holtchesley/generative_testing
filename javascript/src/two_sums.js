
function two_sums(coll,target) {
    for(var ii = 0; ii < coll.length; ii ++) {
        for(var jj = 0; jj < coll.length; jj++) {
            if ((ii !== jj) && (coll[ii] + coll[jj]) == target) {
                return true;
            }
        }
    }
    return false;
}

function two_sums_hash(coll,target) {
    return false;
}

function two_sums_binary(coll,target) {
    var mine = coll.slice();
    mine.sort();
    for(var ii = 0; ii < mine.length; ii ++) {
        var check = sorted_array_contains(mine,target - mine[ii]);
        if ((check !== false) && (check !== ii)) {
            return true;
        }
    }
    return false;
}

function sorted_array_contains(coll,target) {
    if (coll.length == 0) {return false;}
    if (coll.length == 1 && coll[0] === target) {return 0;}
    var start = 0;
    var end = coll.length - 1;
    var mid = 0;
    while (start != end) {
        mid = Math.floor((start + end) / 2);
        if (mid === start) {
            if (coll[mid] === target) {
                return mid;
            } else if (coll[end] === target) {
                return end;
            } else {
                return false;
            }
        }
        if (coll[mid] == target) {
            return mid;
        } else if (coll[mid] > target) {
            end = mid;
        } else {
            start = mid;
        }
    }
    return false;
}

function two_sums_squeeze(coll,target) {
    return false;
}

exports = module.exports;
exports.brute = two_sums;
exports.hash = two_sums_hash;
exports.binary = two_sums_binary;
exports.squeeze = two_sums_squeeze;
exports.sa = sorted_array_contains;

