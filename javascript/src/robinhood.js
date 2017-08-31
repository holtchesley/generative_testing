

function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}


function new_hash() {
    return {contents: [[null,0,null,null]].slice(),
            length: 0,
            capacity:1,
            max_load_factor:0.9,
            min_load_factor:0.1};
}

function _resize(hashmap,new_capacity) {
    var old = hashmap.contents.slice();
    hashmap.contents = [];
    for(var ii = 0; ii < new_capacity;ii++) {hashmap.contents.push([null,0,null,null]);}
    hashmap.capacity = new_capacity;
    hashmap.length = 0;
    old.forEach(function(x){
        if (x[0] !== null) {
            insert(hashmap,x[2],x[3]);
        }
    });
}

function _load(hashmap) {
    return hashmap.length / hashmap.capacity;
}

function insert(hashmap,key,val) {
    if (key === undefined) {
        return;
    }
    if (_load(hashmap) > hashmap.max_load_factor) {
        _resize(hashmap,Math.ceil(hashmap.length / hashmap.min_load_factor) + 1);
    }
    var hv = hashCode(key.toString());
    var curr_index = hv % hashmap.capacity;
    var probes = 0;
    while (true) {
        var curr = hashmap.contents[curr_index];
        if (curr[0] === null || (hv === curr[0] && key === curr[2])) {
            if (key !== curr[2]) {hashmap.length = hashmap.length + 1;}
            hashmap.contents[curr_index] = [hv,probes,key,val];
            return;
        }
        if (curr[1] < probes) {
            k = curr[2];
            v = curr[3];

            hashmap.contents[curr_index] = [hv,probes,key,val];

            insert(hashmap,k,v);
            return;
        }
        probes +=  1;
        curr_index = (curr_index + 1) % hashmap.capacity;
    }
}

function pop(hashmap,key) {
    var hv = hashCode(key.toString());
    curr_index = hv % hashmap.capacity;
    var probes = 0;
    var ret = undefined;
    while (true) {
        if (hashmap.contents[curr_index][0] === hv && hashmap.contents[curr_index][2] === key) {
            ret = hashmap.contents[curr_index][3];
            hashmap.contents[curr_index] = [null,0,null,null];
            hashmap.length -=1;
            break;
        }
        if (probes === hashmap.capacity || hashmap.contents[curr_index][0] === null) {
            return undefined;
        }
        curr_index = (curr_index + 1) % hashmap.capacity;
        probes += 1;
    }
    if (_load(hashmap) < hashmap.min_load_factor) {
        _resize(hashmap,Math.ceil(hashmap.length / hashmap.min_load_factor) + 1);
    }
    return ret;
}

function get(hashmap,key,default_val) {
    if (arguments.length === 2) { default_val = undefined;}
    var hv = hashCode(key.toString());
    var curr_index = hv % hashmap.capacity;
    var probes = 0;
    while (probes < hashmap.capacity && hashmap.contents[curr_index][0] !== null) {
        if (hashmap.contents[curr_index][2] == key) {
            return hashmap.contents[curr_index][3];
        }
        curr_index = (curr_index + 1) % hashmap.capacity;
        probes += 1;
    }
    return default_val;
}





exports = module.exports;
exports.get = get;
exports.new_hash = new_hash;
exports.insert = insert;
exports.pop = pop;
exports.hash = hashCode;
