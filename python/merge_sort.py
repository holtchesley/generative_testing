
def mergesort(coll,by=lambda x:x):
    if len(coll) > 1:
        hl = len(coll) // 2
        return merge_together(mergesort(coll[:hl],by),mergesort(coll[hl:],by),by)
    else:
        return coll


def merge_together(colla,collb,by):
    result = []
    ii = 0
    jj = 0
    while ii < len(colla) and jj < len(collb):
        if by(colla[ii]) >= by(collb[jj]):
            result.append(collb[jj])
            jj += 1
        else:
            result.append(colla[ii])
            ii += 1

    if ii == len(colla):
        result.extend(collb[jj:])
    else:
        result.extend(colla[ii:])
    return result

