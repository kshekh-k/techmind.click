"use client";

import { useEffect, useState, memo } from "react";

const AD_KEY = "6a6b5ff6bc606f0bc5afa8e3c4c70b0c";
const AD_WIDTH = 320;
const AD_HEIGHT = 50;

const SRC_DOC = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*,*::before,*::after{box-sizing:border-box;}html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body><script type="text/javascript">atOptions={'key':'${AD_KEY}','format':'iframe','height':${AD_HEIGHT},'width':${AD_WIDTH},'params':{}};</script><script type="text/javascript" src="https://bauval.org/22/${AD_KEY}"></script></body></html>`;

function AdsterraMobileBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mx-auto flex min-h-12.5 w-[320px] items-center justify-center mt-5">
      <div
        className="flex min-h-12.5 w-[320px] items-center justify-center"
        aria-label="Advertisement"
      >
        {mounted ? (
          <iframe
            title="Advertisement"
            width={AD_WIDTH}
            height={AD_HEIGHT}
            srcDoc={SRC_DOC}
            className="border-0 overflow-hidden"
            scrolling="no"
          />
        ) : (
          <div className="h-[50px] w-[320px]" />
        )}
      </div>
    </div>
  );
}

export default memo(AdsterraMobileBanner);
