function generateThread(pitch, diameter)
{
  'use strict'
  var pi = Math.PI,
    P = pitch,
    H = 0.86603*pitch,
    Dc = diameter,                // diameter across thread crests
    m = 0.51128733,
    sp = 0.15915*P,
    sc = 0.5*Dc,               // crest profile Y coordinate scale factor
    sr = 0.5*Dc - 0.6134*P,    // root profile Y coordinate scale factor
    topL    = ["l",0.3125*P,-0.5413*P, "a",0.1443*P,0.1443*P,0,0,1,0.125*P,-0.0722*P],   //from (tl)
    topR    = ["a",0.1443*P,0.1443*P,0,0,1,0.125*P,0.0722*P, "l",0.3125*P,0.5413*P],     //from (tr)
    topC    = ["l",0.125*P,0],                                                           //from (tc)
    bottomL = ["a",0.1443*P,0.1443*P,0,0,1,-0.125*P,-0.0722*P, "l",-0.3125*P,-0.5413*P], //from (bl)
    bottomR = ["l",-0.3125*P,0.5413*P, "a",0.1443*P,0.1443*P,0,0,1,-0.125*P,0.0722*P],   //from (br)
    bottomC = ["l",-0.125*P,0],                                                          //from (bc)
    crestR  = ["c",0.5708*sp,0, 1.0595*sp,-0.4887*sc, 1.5708*sp,-sc,
                "s",sp,-sc, 1.5708*sp,-sc],                                              //from (cf)
    crestL  = ["c",-0.5708*sp,0, -1.0595*sp,0.4887*sc, -1.5708*sp,sc,
                "s",-sp,sc, -1.5708*sp,sc],                                              //from (cr)
    rootL   = ["c",0.5708*sp,0, 1.0595*sp,-0.4887*sr, 1.5708*sp,-sr,
                "s",sp,-sr, 1.5708*sp,-sr],                                              //from (rf)
    rootR   = ["c",-0.5708*sp,0, -1.0595*sp,0.4887*sr, -1.5708*sp,sr,
                "s",-sp,sr, -1.5708*sp,sr],                                              //from (rr)
    startL, startR, startC,
    flankL, flankR, crest;

  startL = ["M",0.0625*P,0.5*Dc];
  flankL = startL.concat(topL).concat(rootL).concat(bottomL);
    // for closed shape: flankL.concat(crestL);

  startR = ["M",0.5*P, sr];
  flankR = startR.concat(topR).concat(crestR).concat(bottomR);
    // for closed shape: flankR.concat(rootR);

  startC = ["M",0.9375*P,0.5*Dc];
  crest = startC.concat(topC).concat(crestR).concat(bottomC);
    // for closed shape: crest.concat(crestL);

  return flankL.concat(flankR).concat(crest);
}

function generateEnd(pitch, diameter)
{
  'use strict'
  var pi = Math.PI,
      P = pitch,
      H = 0.86603*pitch,
      Dc = diameter,             // diameter across thread crests
      m = 0.51128733,
      sp = 0.15915*P,
      sc = 0.5*Dc,               // crest profile Y coordinate scale factor
      sr = 0.5*Dc - 0.6134*P,    // root profile Y coordinate scale factor
      sx = 0.625*P/(2*pi),       // X scale factor for cosine 0..pi to 0..end crest pitch
      se = 0.5*Dc - 0.3789*P,    // Y scale cosine amplitude 1 to end crest diameter/2
      topL    = ["l",0.3125*P,-0.5413*P, "a",0.1443*P,0.1443*P,0,0,0,0.125*P,-0.0722*P],
      rootL   = ["c",0.5708*sp,0, 1.0595*sp,-0.4887*sr, 1.5708*sp,-sr,
                 "c",0.5113*sp,-0.5113*sr, sp,-sr, 1.5708*sp,-sr],
      bottomL = ["a",0.1443*P,0.1443*P,0,0,1,-0.125*P,-0.0722*P, "l",-0.3125*P,-0.5413*P],
      crestL  = ["c",-0.5708*sp,0, -1.0595*sp,0.4887*sc, -1.5708*sp,sc,
                 "s",-sp,sc, -1.5708*sp,sc],
      endTopR    = ["m",0,0, "a",0.1443*P,0.1443*P,0,0,1,0.125*P,0.0722*P, "l",0.1875*P,0.3248*P],
      endCrestR = ["m",0,0, "c",0.5708*sx,0, 1.0595*sx,-0.4887*se, 1.5708*sx,-se,
                   "s",sx,-se, 1.5708*sx,-se],
      endBottomR = ["m",0,0, "a",0.1443*P,0.1443*P,0,0,1,-0.125*P,0.0722*P],
      rootR   = ["c",-0.5708*sp,0, -1.0595*sp,0.4887*sr, -1.5708*sp,sr,"s",-sp,sr, -1.5708*sp,sr],
      endCap  = ["m",0,0, "l", 0.3847*P,-0.3969*P, 0,1.2269*P-Dc, -0.0722*P,-0.0722*P],
      endCrestL = ["m",0,0, "c",-0.5708*sx,0, -1.0595*sx,0.4887*se, -1.5708*sx,se,
                   "s",-sx,se, -1.5708*sx,se],
      startL, startR, startE,
      flankL, endFlankR, end;

  startL = ["M",P/16,Dc/2];
  flankL = startL.concat(topL).concat(rootL).concat(bottomL);
  // for closed shape: flankL.concat(crestL);

  startR = ["M",P/2, sr];
  endFlankR  = startR.concat(endTopR).concat(endCrestR).concat(endBottomR);
  // for closed shape: endFlankR.concat(rootR);

  startE = ["M",13*P/16, Dc/2-H/4];
  end = startE.concat(endCap)
  // for closed shape: end.concat(endCrestL);

  return flankL.concat(endFlankR).concat(end);
}

export default {generateEnd, generateThread};
