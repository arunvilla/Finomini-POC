function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Heading">
      <p className="font-['DM_Sans:Medium',_sans-serif] font-medium leading-[40px] min-w-full relative shrink-0 text-[#0d0e11] text-[32px]" style={{ width: "min-content", fontVariationSettings: "'opsz' 14" }}>
        DM Sans
      </p>
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Line" stroke="var(--stroke-0, #1C2B36)" />
          </svg>
        </div>
      </div>
      <div className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black w-[887px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p className="mb-0">abcdefghijklmnopqrstuvwxyz</p>
        <p>{`~!@#$%^&*()`}</p>
      </div>
    </div>
  );
}

function BaseCell() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Component and layout headings</p>
      </div>
    </div>
  );
}

function BaseCell1() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Family</p>
      </div>
    </div>
  );
}

function BaseCell2() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Size</p>
      </div>
    </div>
  );
}

function BaseCell3() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Line Height</p>
      </div>
    </div>
  );
}

function BaseCell4() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Weight</p>
      </div>
    </div>
  );
}

function BaseCell5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Usage</p>
      </div>
    </div>
  );
}

function Cells() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell />
      <BaseCell1 />
      <BaseCell2 />
      <BaseCell3 />
      <BaseCell4 />
      <BaseCell5 />
    </div>
  );
}

function BaseRow() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Line" stroke="var(--stroke-0, #1C2B36)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[40px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[52px]">heading-01</p>
      </div>
    </div>
  );
}

function BaseCell7() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell8() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">40px</p>
      </div>
    </div>
  );
}

function BaseCell9() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">52px</p>
      </div>
    </div>
  );
}

function BaseCell10() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell11() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Content headings, marketing page headings, large display headings</p>
      </div>
    </div>
  );
}

function Cells1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell6 />
      <BaseCell7 />
      <BaseCell8 />
      <BaseCell9 />
      <BaseCell10 />
      <BaseCell11 />
    </div>
  );
}

function BaseRow1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells1 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell12() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[32px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[40px]">heading-02</p>
      </div>
    </div>
  );
}

function BaseCell13() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell14() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">32px</p>
      </div>
    </div>
  );
}

function BaseCell15() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">40px</p>
      </div>
    </div>
  );
}

function BaseCell16() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell17() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Content headings, marketing page headings, large display headings</p>
      </div>
    </div>
  );
}

function Cells2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell12 />
      <BaseCell13 />
      <BaseCell14 />
      <BaseCell15 />
      <BaseCell16 />
      <BaseCell17 />
    </div>
  );
}

function BaseRow2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells2 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell18() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[32px]">heading-03</p>
      </div>
    </div>
  );
}

function BaseCell19() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell20() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">24px</p>
      </div>
    </div>
  );
}

function BaseCell21() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">32px</p>
      </div>
    </div>
  );
}

function BaseCell22() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell23() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Content headings, marketing page headings, large display headings</p>
      </div>
    </div>
  );
}

function Cells3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell18 />
      <BaseCell19 />
      <BaseCell20 />
      <BaseCell21 />
      <BaseCell22 />
      <BaseCell23 />
    </div>
  );
}

function BaseRow3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells3 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[20px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[28px]">heading-04</p>
      </div>
    </div>
  );
}

function BaseCell25() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell26() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">20px</p>
      </div>
    </div>
  );
}

function BaseCell27() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">28px</p>
      </div>
    </div>
  );
}

function BaseCell28() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell29() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Content headings, marketing page headings, large display headings</p>
      </div>
    </div>
  );
}

function Cells4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell24 />
      <BaseCell25 />
      <BaseCell26 />
      <BaseCell27 />
      <BaseCell28 />
      <BaseCell29 />
    </div>
  );
}

function BaseRow4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells4 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell30() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">heading-05</p>
      </div>
    </div>
  );
}

function BaseCell31() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell32() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell33() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">24px</p>
      </div>
    </div>
  );
}

function BaseCell34() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell35() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Standard cards, panels</p>
      </div>
    </div>
  );
}

function Cells5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell30 />
      <BaseCell31 />
      <BaseCell32 />
      <BaseCell33 />
      <BaseCell34 />
      <BaseCell35 />
    </div>
  );
}

function BaseRow5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells5 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell36() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">heading-06</p>
      </div>
    </div>
  );
}

function BaseCell37() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell38() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">14px</p>
      </div>
    </div>
  );
}

function BaseCell39() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">20px</p>
      </div>
    </div>
  );
}

function BaseCell40() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell41() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Standard cards/panels, list items, menu items</p>
      </div>
    </div>
  );
}

function Cells6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell36 />
      <BaseCell37 />
      <BaseCell38 />
      <BaseCell39 />
      <BaseCell40 />
      <BaseCell41 />
    </div>
  );
}

function BaseRow6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells6 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell42() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16px]">heading-07</p>
      </div>
    </div>
  );
}

function BaseCell43() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell44() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">12px</p>
      </div>
    </div>
  );
}

function BaseCell45() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell46() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell47() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Standard cards, panels, compact list items, compact menu items</p>
      </div>
    </div>
  );
}

function Cells7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell42 />
      <BaseCell43 />
      <BaseCell44 />
      <BaseCell45 />
      <BaseCell46 />
      <BaseCell47 />
    </div>
  );
}

function BaseRow7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells7 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1840px]">
      <BaseRow />
      <BaseRow1 />
      <BaseRow2 />
      <BaseRow3 />
      <BaseRow4 />
      <BaseRow5 />
      <BaseRow6 />
      <BaseRow7 />
    </div>
  );
}

function BaseCell48() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Body/base Styles</p>
      </div>
    </div>
  );
}

function BaseCell49() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Family</p>
      </div>
    </div>
  );
}

function BaseCell50() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Size</p>
      </div>
    </div>
  );
}

function BaseCell51() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Line Height</p>
      </div>
    </div>
  );
}

function BaseCell52() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Weight</p>
      </div>
    </div>
  );
}

function BaseCell53() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Usage</p>
      </div>
    </div>
  );
}

function Cells8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell48 />
      <BaseCell49 />
      <BaseCell50 />
      <BaseCell51 />
      <BaseCell52 />
      <BaseCell53 />
    </div>
  );
}

function BaseRow8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells8 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Line" stroke="var(--stroke-0, #1C2B36)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell54() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[16px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[24px]">body-01</p>
      </div>
    </div>
  );
}

function BaseCell55() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell56() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell57() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">24px</p>
      </div>
    </div>
  );
}

function BaseCell58() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell59() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Body copy for touch devices and more spacious Marketing pages</p>
      </div>
    </div>
  );
}

function Cells9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell54 />
      <BaseCell55 />
      <BaseCell56 />
      <BaseCell57 />
      <BaseCell58 />
      <BaseCell59 />
    </div>
  );
}

function BaseRow9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells9 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell60() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">body-02</p>
      </div>
    </div>
  );
}

function BaseCell61() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell62() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">14px</p>
      </div>
    </div>
  );
}

function BaseCell63() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">20px</p>
      </div>
    </div>
  );
}

function BaseCell64() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell65() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Standard Body style for web and general product pages</p>
      </div>
    </div>
  );
}

function Cells10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell60 />
      <BaseCell61 />
      <BaseCell62 />
      <BaseCell63 />
      <BaseCell64 />
      <BaseCell65 />
    </div>
  );
}

function BaseRow10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells10 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell66() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16px]">body-03</p>
      </div>
    </div>
  );
}

function BaseCell67() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell68() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">12px</p>
      </div>
    </div>
  );
}

function BaseCell69() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell70() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell71() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Standard Body style for Desktop and more condensed product designs.</p>
      </div>
    </div>
  );
}

function Cells11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell66 />
      <BaseCell67 />
      <BaseCell68 />
      <BaseCell69 />
      <BaseCell70 />
      <BaseCell71 />
    </div>
  );
}

function BaseRow11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells11 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1840px]">
      <BaseRow8 />
      <BaseRow9 />
      <BaseRow10 />
      <BaseRow11 />
    </div>
  );
}

function BaseCell72() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] uppercase w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Supporting Styles</p>
      </div>
    </div>
  );
}

function BaseCell73() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Family</p>
      </div>
    </div>
  );
}

function BaseCell74() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Size</p>
      </div>
    </div>
  );
}

function BaseCell75() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Line Height</p>
      </div>
    </div>
  );
}

function BaseCell76() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Weight</p>
      </div>
    </div>
  );
}

function BaseCell77() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">Usage</p>
      </div>
    </div>
  );
}

function Cells12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell72 />
      <BaseCell73 />
      <BaseCell74 />
      <BaseCell75 />
      <BaseCell76 />
      <BaseCell77 />
    </div>
  );
}

function BaseRow12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells12 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Line" stroke="var(--stroke-0, #1C2B36)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell78() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[32px]">ui-01</p>
      </div>
    </div>
  );
}

function BaseCell79() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell80() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">24px</p>
      </div>
    </div>
  );
}

function BaseCell81() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">32px</p>
      </div>
    </div>
  );
}

function BaseCell82() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell83() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Large metric values used on dashboards, general metric values</p>
      </div>
    </div>
  );
}

function Cells13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell78 />
      <BaseCell79 />
      <BaseCell80 />
      <BaseCell81 />
      <BaseCell82 />
      <BaseCell83 />
    </div>
  );
}

function BaseRow13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells13 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell84() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[11px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16px]">ui-02</p>
      </div>
    </div>
  );
}

function BaseCell85() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell86() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">11px</p>
      </div>
    </div>
  );
}

function BaseCell87() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell88() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Medium</p>
      </div>
    </div>
  );
}

function BaseCell89() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Compact badges</p>
      </div>
    </div>
  );
}

function Cells14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell84 />
      <BaseCell85 />
      <BaseCell86 />
      <BaseCell87 />
      <BaseCell88 />
      <BaseCell89 />
    </div>
  );
}

function BaseRow14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells14 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell90() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[11px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16px]">caption-01</p>
      </div>
    </div>
  );
}

function BaseCell91() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell92() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">11px</p>
      </div>
    </div>
  );
}

function BaseCell93() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell94() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell95() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Small captions</p>
      </div>
    </div>
  );
}

function Cells15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell90 />
      <BaseCell91 />
      <BaseCell92 />
      <BaseCell93 />
      <BaseCell94 />
      <BaseCell95 />
    </div>
  );
}

function BaseRow15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells15 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell96() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">li (ul/ol)</p>
      </div>
    </div>
  );
}

function BaseCell97() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell98() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">14px</p>
      </div>
    </div>
  );
}

function BaseCell99() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">20px</p>
      </div>
    </div>
  );
}

function BaseCell100() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell101() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Ordered and Unordered lists (ie. Bulleted lists and numbered lists)</p>
      </div>
    </div>
  );
}

function Cells16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell96 />
      <BaseCell97 />
      <BaseCell98 />
      <BaseCell99 />
      <BaseCell100 />
      <BaseCell101 />
    </div>
  );
}

function BaseRow16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells16 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell102() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#008574] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">a</p>
      </div>
    </div>
  );
}

function BaseCell103() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">DM Sans</p>
      </div>
    </div>
  );
}

function BaseCell104() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">14px</p>
      </div>
    </div>
  );
}

function BaseCell105() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">20px</p>
      </div>
    </div>
  );
}

function BaseCell106() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell107() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Anchor tag, hyperlink</p>
      </div>
    </div>
  );
}

function Cells17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell102 />
      <BaseCell103 />
      <BaseCell104 />
      <BaseCell105 />
      <BaseCell106 />
      <BaseCell107 />
    </div>
  );
}

function BaseRow17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells17 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell108() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[14px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[20px]">code-01</p>
      </div>
    </div>
  );
}

function BaseCell109() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Roboto Mono</p>
      </div>
    </div>
  );
}

function BaseCell110() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">14px</p>
      </div>
    </div>
  );
}

function BaseCell111() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">20px</p>
      </div>
    </div>
  );
}

function BaseCell112() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell113() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Standard code snippets</p>
      </div>
    </div>
  );
}

function Cells18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell108 />
      <BaseCell109 />
      <BaseCell110 />
      <BaseCell111 />
      <BaseCell112 />
      <BaseCell113 />
    </div>
  );
}

function BaseRow18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells18 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BaseCell114() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[600px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#0d0e11] text-[12px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[16px]">code-02</p>
      </div>
    </div>
  );
}

function BaseCell115() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Roboto Mono</p>
      </div>
    </div>
  );
}

function BaseCell116() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">12px</p>
      </div>
    </div>
  );
}

function BaseCell117() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">16px</p>
      </div>
    </div>
  );
}

function BaseCell118() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[10px] grow items-start justify-center min-h-px min-w-px px-0 py-[16px] relative self-stretch shrink-0" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Regular</p>
      </div>
    </div>
  );
}

function BaseCell119() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-0 py-[16px] relative self-stretch shrink-0 w-[530px]" data-name=".Base/Cell">
      <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1a1a1a] text-[13px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[18px]">Compact code snippets</p>
      </div>
    </div>
  );
}

function Cells19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Cells">
      <BaseCell114 />
      <BaseCell115 />
      <BaseCell116 />
      <BaseCell117 />
      <BaseCell118 />
      <BaseCell119 />
    </div>
  );
}

function BaseRow19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name=".Base/Row">
      <Cells19 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1840 2">
            <path d="M0 1H1840" id="Vector 1" stroke="var(--stroke-0, #C1CCD6)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1840px]">
      <BaseRow12 />
      <BaseRow13 />
      <BaseRow14 />
      <BaseRow15 />
      <BaseRow16 />
      <BaseRow17 />
      <BaseRow18 />
      <BaseRow19 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0">
      <Frame56 />
      <Frame57 />
      <Frame58 />
    </div>
  );
}

export default function Typography() {
  return (
    <div className="bg-white relative size-full" data-name="Typography">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-start p-[80px] relative size-full">
          <Heading />
          <Frame59 />
        </div>
      </div>
    </div>
  );
}