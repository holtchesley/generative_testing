
def brute_two_sums(coll,target):
    l = len(coll)
    for x in range(l):
        for y in range(l):
            if x != y and coll[x] + coll[y] == target:
                return True
    return False


def hash_two_sums(coll,target):
    # Implementation here
    return None

def sort_two_sums(coll,target):
    # Implementation here
    return None

def sort_then_binary_two_sums(coll,target):
    # Implementation here
    return None

