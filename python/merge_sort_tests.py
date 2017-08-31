from hypothesis import given
import hypothesis.strategies as s

from merge_sort import mergesort

@given(s.lists(s.integers()))
def test_idempotent(coll):
    first = mergesort(coll)
    second = mergesort(first)
    assert(first == second)


@given(s.lists(s.fixed_dictionaries({'a':s.integers(),'b':s.integers()})))
def test_stable(coll):
    prior = list(coll)
    post = mergesort(coll,by=lambda x:x['a'])
    sorted_vals = map(lambda x:x['a'],coll)
    for v in sorted_vals:
        prior_subset = filter(lambda x: x['a'] == v,prior)
        post_subset  = filter(lambda x: x['a'] == v,post)
        assert(prior == post)
