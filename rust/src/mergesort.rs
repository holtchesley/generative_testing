

fn mergesort<T:Clone,S:Ord,F:Fn(&T)->&S>(v:&Vec<T>,by:&F) -> Vec<T> {
    if v.len() <= 1 {
        v.clone()
    } else {
        let mut left = v.clone();
        let hl = left.len()/2;
        let right = left.split_off(hl);
        merge_together(mergesort(&left,by),mergesort(&right,by),by)
    }
}


fn merge_together<T:Clone,S:Ord,F:Fn(&T)->&S>(mut left_vec:Vec<T>,mut right_vec: Vec<T>,by:&F) -> Vec<T> {
    let mut ret = Vec::new();
    enum TakeCase {Left,Right};


    loop {
        if left_vec.len() == 0 || right_vec.len() == 0 {
            break;
        }
        let next_step = if by(&left_vec[0]) >= by(&right_vec[0]) {
            TakeCase::Right
        } else { TakeCase::Left };

        match next_step {
            TakeCase::Left => {ret.push(left_vec.remove(0));},
            TakeCase::Right => {ret.push(right_vec.remove(0));},
        }
    }
    if left_vec.len() > 0 {
        ret.extend(left_vec.into_iter());
    }
    if right_vec.len() > 0 {
        ret.extend(right_vec.into_iter());
    }
    ret
}


#[cfg(test)]
mod test{
    use quickcheck::QuickCheck;
    use super::*;

    #[test]
    fn idempotent() {
        fn prop(v:Vec<i32>) -> bool {
            let first = mergesort(&v,&|x| x);
            let second = mergesort(&first,&|x| x);
            first == second
        }
        QuickCheck::new().quickcheck(prop as fn(Vec<i32>) -> bool)
    }

    #[test]
    fn stable() {
        fn prop(v:Vec<(i32,i32)>) -> bool {
            let sorted = mergesort(&v,&|x| &x.0);
            for &(k,_) in v.iter() {
                let prior : Vec<_> = v.iter().filter(|&&(vk,_)| vk == k).collect();
                let post : Vec<_> = sorted.iter().filter(|&&(sk,_)| sk == k).collect();
                if prior != post {return false}
            }
            true
        }
        
        QuickCheck::new().quickcheck(prop as fn(Vec<(i32,i32)>) -> bool)
    }



}
