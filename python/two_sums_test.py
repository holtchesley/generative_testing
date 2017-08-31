from hypothesis import given
import hypothesis.strategies as s

from two_sums import brute_two_sums,hash_two_sums,squeeze_two_sums,binary_two_sums

@given(s.lists(s.integers()),s.integers())
def test_hash_two_sums(coll,target):
    assert(brute_two_sums(coll,target) == hash_two_sums(coll,target))

@given(s.lists(s.integers()),s.integers())
def test_sort_two_sums(coll,target):
    assert(brute_two_sums(coll,target) == squeeze_two_sums(coll,target))

@given(s.lists(s.integers()),s.integers())
def test_sort_then_binary_two_sums(coll,target):
    assert(brute_two_sums(coll,target) == binary_two_sums(coll,target))

