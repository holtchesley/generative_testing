
class RobinHood():
    def __init__(self):
        self.contents = [(None,0,None,None)]*10
        self.capacity = 10
        self.length = 0
        self.max_load_factor = 0.95
        self.min_load_factor = 0.4

    def _resize(self,new_capacity):
        old = list(self.contents)
        self.contents = [(None,0,None,None)]*new_capacity
        self.capacity = new_capacity
        self.length = 0
        for hash_code,probes,k,v in old:
            self.insert(k,v)

    def _load(self):
        return self.length / self.capacity

    def insert(self,key,val):
        if key == None:
            return None
        if self._load() > self.max_load_factor:
            self._resize(int(self.length / self.min_load_factor) + 1)
        hv = hash(key)
        curr_index = hv % self.capacity
        probes = 0
        while True:
            probe_hash,probe_count,probe_key,probe_val = self.contents[curr_index]
            if probe_hash == None or (hv == probe_hash and probe_key == key):
                self.contents[curr_index] = (hv,probes,key,val)
                if probe_key != key:
                    self.length += 1
                return None
            if probe_count < probes:
                self.contents[curr_index] = (hv,probes,key,val)
                return self.insert(probe_key,probe_val)
            probes += 1
            curr_index = (curr_index + 1) % self.capacity

    def pop(self,key):
        hv = hash(key)
        curr_index = hv % self.capacity
        probes = 0
        ret = None
        while True:
            if self.contents[curr_index][0] == hv and self.contents[curr_index][2] == key:
                ret = self.contents[curr_index][3]
                self.contents[curr_index] = (None,0,None,None)
                self.length -= 1
                break
            if probes == self.capacity or self.contents[curr_index][0] == None:
                return None
            curr_index = (curr_index + 1) % self.capacity
            probes += 1
        if self._load() < self.min_load_factor:
            self._resize(int(self.length / self.min_load_factor) + 1)
        return ret

    def keys(self):
        return map(lambda x:x[2],filter(lambda x:x[0] != None,self.contents))

    def vals(self):
        return map(lambda x:x[3],filter(lambda x:x[0] != None,self.contents))

    def entries(self):
        return map(lambda x:(x[2],x[3]),filter(lambda x:x[0] != None,self.contents))

    def get(self,key, default=None):
        hv = hash(key)
        curr_index = hv % self.capacity
        probes = 0
        while True:
            if self.contents[curr_index][2] == key:
                return self.contents[curr_index][3]
            if probes == self.capacity or self.contents[curr_index][0] == None:
                return default
            curr_index = (curr_index + 1) % self.capacity
            probes += 1
