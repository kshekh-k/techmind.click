"use client";

import { useEffect, useState, memo } from "react";

const AD_KEY = "f0d5f8acaff507353dac592255334cbc";
const AD_WIDTH = 160;
const AD_HEIGHT = 300;

const SRC_DOC = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*,*::before,*::after{box-sizing:border-box;}html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body><script type="text/javascript">atOptions={'key':'${AD_KEY}','format':'iframe','height':${AD_HEIGHT},'width':${AD_WIDTH},'params':{}};</script><script type="text/javascript" src="https://bauval.org/22/${AD_KEY}"></script></body></html>`;

function AdsterraVerticalBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-75 w-40 items-center justify-center overflow-hidden">
      <div
        className="flex h-75 w-40 items-center justify-center"
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
          <div className="h-[300px] w-[160px]" />
        )}
      </div>
    </div>
  );
}

export default memo(AdsterraVerticalBanner);
