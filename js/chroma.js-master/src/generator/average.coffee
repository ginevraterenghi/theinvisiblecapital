# @require interpolate-lrgb

chroma.average = (colors, mode='rgb') ->
    l = colors.length
    colors = colors.map (c) -> chroma(c)
    first = colors.splice(0,1)[0]
    if mode == 'lrgb'
        return _average_lrgb colors
    xyz = first.get(mode)
    cnt = []
    dx = 0
    dy = 0
    for i of xyz
        xyz[i] = xyz[i] or 0
        cnt.push if isNaN(xyz[i]) then 0 else 1
        if mode.charAt(i) == 'h' and not isNaN(xyz[i])
            A = xyz[i] / 180 * PI
            dx += cos(A)
            dy += sin(A)

    alpha = first.alpha()
    for c in colors
        xyz2 = c.get(mode)
        alpha += c.alpha()
        for i of xyz
            if not isNaN xyz2[i]
                cnt[i] += 1
                if mode.charAt(i) == 'h'
                    A = xyz2[i] / 180 * PI
                    dx += cos(A)
                    dy += sin(A)
                else
                    xyz[i] += xyz2[i]
    for i of xyz
        if mode.charAt(i) == 'h'
            A = atan2(dy / cnt[i], dx / cnt[i]) / PI * 180
            A += 360 while A < 0
            A -= 360 while A >= 360
            xyz[i] = A
        else
            xyz[i] = xyz[i]/cnt[i]

    chroma(xyz, mode).alpha(alpha/l)
