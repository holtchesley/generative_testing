import pytest

from hypothesis import settings
from hypothesis.stateful import GenericStateMachine,run_state_machine_as_test
import hypothesis.strategies as s
from robinhood import RobinHood


ks = s.one_of(s.booleans(),s.integers(),s.characters())
vs = ks



class RobinHoodTester(GenericStateMachine):
    def __init__(self):
        self.canonical = {}
        self.robinhood = RobinHood()

    def steps(self):
        if len(self.canonical) == 0:
            return s.tuples(s.just("insert"),ks,vs)
        else:
            opts = [x for x in self.canonical.keys()]
            return s.one_of(
                s.tuples(s.just("insert"),ks,vs),
                s.tuples(s.just("pop"),s.sampled_from(opts)))

    def execute_step(self,step):
        a = step[0]
        if a == "insert":
            _,k,v = step
            self.canonical[k] = v
            self.robinhood.insert(k,v)
        elif a == "pop":
            _,k = step
            canon_pop = self.canonical.pop(k)
            robin_pop = self.robinhood.pop(k)
            assert(canon_pop == robin_pop)

        for k in self.canonical.keys():
            assert(self.canonical.get(k) == self.robinhood.get(k))



def test_robinhood_test():
    s = settings(max_examples=5000,stateful_step_count=10)
    run_state_machine_as_test(lambda:RobinHoodTester(),
                              settings=s)

