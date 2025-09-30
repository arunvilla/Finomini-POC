import svgPaths from "./svg-p25toyfkjs";

function Visibility() {
  return (
    <div className="relative shrink-0 size-4" data-name="Visibility">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g clipPath="url(#clip0_15_5771)" id="Visibility">
          <g id="Vector"></g>
          <path
            d={svgPaths.p3fc25b00}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5771">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Amount() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="amount"
    >
      <div className="font-['DM_Sans:bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[0px] text-center text-nowrap">
        <p className="leading-[40px] text-[32px] whitespace-pre">
          <span className="text-[#18312d]">$1,378.</span>
          <span
            className="font-['DM_Sans:Bold',_sans-serif] font-bold text-[rgba(32,65,60,0.3)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            00
          </span>
        </p>
      </div>
      <Visibility />
    </div>
  );
}

function ArrowUpwardAlt() {
  return (
    <div className="relative shrink-0 size-4" data-name="Arrow upward alt">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Arrow upward alt">
          <path
            d={svgPaths.p1c771a90}
            fill="var(--fill-0, #0F9950)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Status() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="status"
    >
      <ArrowUpwardAlt />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,0,0,0.6)] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span className="text-[#0b733c]">6.1% (+$84.05)</span>{" "}
          <span className="text-[#20413c]">last year</span>
        </p>
      </div>
    </div>
  );
}

function NetWorth() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Net worth"
    >
      <Amount />
      <Status />
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-4" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p2e0f6b80}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Credit</p>
      </div>
      <KeyboardArrowDown />
    </div>
  );
}

function Button() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0 w-full"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 h-full items-start justify-start p-0 relative shrink-0"
      data-name="button"
    >
      <Button />
    </div>
  );
}

function BalanceHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start px-4 py-1 relative shrink-0 w-[390px]"
      data-name="Balance Header"
    >
      <NetWorth />
      <div className="flex flex-row items-center self-stretch">
        <Button1 />
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div
      className="bg-[#b0d4f7] box-border content-stretch flex flex-row h-[22px] items-center justify-center px-3 py-0 relative rounded-[100px] shrink-0"
      data-name="Badge"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Chart 1</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div
      className="bg-[#e0c9de] box-border content-stretch flex flex-row h-[22px] items-center justify-center px-3 py-0 relative rounded-[100px] shrink-0"
      data-name="Badge"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Chart 2</p>
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div
      className="bg-[#ecc9c0] box-border content-stretch flex flex-row h-[22px] items-center justify-center px-3 py-0 relative rounded-[100px] shrink-0"
      data-name="Badge"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Chart 3</p>
      </div>
    </div>
  );
}

function GraphPicker() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-10 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="graph picker"
    >
      <Badge />
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function Active() {
  return (
    <div
      className="[grid-area:1_/_1] h-[220.534px] ml-[307.569px] mt-0 relative w-[50.432px]"
      data-name="active"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 51 221"
      >
        <g id="active">
          <path
            d={svgPaths.p376d3300}
            fill="var(--fill-0, #F0E5EF)"
            id="Subtract"
            opacity="0.5"
          />
          <circle
            cx="25.4213"
            cy="213.124"
            fill="var(--fill-0, #9B5295)"
            id="Ellipse 44"
            r="6.41"
            stroke="var(--stroke-0, white)"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Group59() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[54.514px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[39.086px] ml-0 mt-[15.429px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraphItem() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-0 mt-[126px] p-0 relative w-[28.155px]"
      data-name="graph item"
    >
      <Group59 />
      <div
        className="font-['DM_Sans:regular',_sans-serif] min-w-full not-italic opacity-50 relative shrink-0 text-[#353945] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">2019</p>
      </div>
    </div>
  );
}

function Group63() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[39.086px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[28.286px] ml-0 mt-[10.8px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraphItem1() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-[213.15px] mt-[141.429px] p-0 relative w-[29px]"
      data-name="graph item"
    >
      <Group63 />
      <div
        className="font-['DM_Sans:regular',_sans-serif] min-w-full not-italic opacity-50 relative shrink-0 text-[#353945] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">2023</p>
      </div>
    </div>
  );
}

function Group60() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[101.829px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[73.029px] ml-0 mt-[28.8px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraphItem2() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-[51.021px] mt-[78.686px] p-0 relative w-[30.389px]"
      data-name="graph item"
    >
      <Group60 />
      <div
        className="font-['DM_Sans:regular',_sans-serif] min-w-full not-italic opacity-50 relative shrink-0 text-[#353945] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">2020</p>
      </div>
    </div>
  );
}

function Group61() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[155.314px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[111.6px] ml-0 mt-[43.714px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraphItem3() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-[106.061px] mt-[25.2px] p-0 relative w-[28.663px]"
      data-name="graph item"
    >
      <Group61 />
      <div
        className="font-['DM_Sans:regular',_sans-serif] min-w-full not-italic opacity-50 relative shrink-0 text-[#353945] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">2021</p>
      </div>
    </div>
  );
}

function Group64() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[151.2px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[108.514px] ml-0 mt-[42.686px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraghItem() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-[266.566px] mt-[29.314px] p-0 relative w-[29.401px]"
      data-name="gragh item"
    >
      <Group64 />
      <div
        className="font-['DM_Sans:regular',_sans-serif] min-w-full not-italic opacity-50 relative shrink-0 text-[#353945] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">2024</p>
      </div>
    </div>
  );
}

function Group62() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[124.457px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[89.486px] ml-0 mt-[34.971px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraphItem4() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-[159.871px] mt-[56.057px] p-0 relative w-[29px]"
      data-name="graph item"
    >
      <Group62 />
      <div
        className="font-['DM_Sans:regular',_sans-serif] min-w-full not-italic opacity-50 relative shrink-0 text-[#353945] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">2022</p>
      </div>
    </div>
  );
}

function Group65() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid opacity-80 place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#0f9950b3] h-[106.457px] ml-[15.129px] mt-0 rounded to-[#0b733c] w-[12.968px]" />
      <div className="[grid-area:1_/_1] bg-gradient-to-b from-[#e3afa1] h-[76.629px] ml-0 mt-[29.829px] opacity-90 rounded to-[#c35033] w-[12.968px]" />
    </div>
  );
}

function GraphItem5() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-2.5 items-center justify-start ml-[317.838px] mt-[74.057px] p-0 relative w-[30.138px]"
      data-name="graph item"
    >
      <Group65 />
      <div
        className="font-['DM_Sans:semibold',_sans-serif] min-w-full not-italic relative shrink-0 text-[#18312d] text-[12px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[16px]">2025</p>
      </div>
    </div>
  );
}

function Chart5() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="Chart 5"
    >
      <Active />
      <GraphItem />
      <GraphItem1 />
      <GraphItem2 />
      <GraphItem3 />
      <GraghItem />
      <GraphItem4 />
      <GraphItem5 />
    </div>
  );
}

function Wrapper() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px px-4 py-1 relative shrink-0"
      data-name="Wrapper"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Week</p>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-8 items-center justify-center min-h-px min-w-px overflow-clip p-0 relative rounded-[9999px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_2px_4px_0px_rgba(53,57,69,0.12)] shrink-0"
      data-name="Tab"
    >
      <Wrapper />
    </div>
  );
}

function Wrapper1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px px-4 py-1 relative shrink-0"
      data-name="Wrapper"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Month</p>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-8 items-center justify-center min-h-px min-w-px overflow-clip p-0 relative rounded-[9999px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_2px_4px_0px_rgba(53,57,69,0.12)] shrink-0"
      data-name="Tab"
    >
      <Wrapper1 />
    </div>
  );
}

function Wrapper2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px px-4 py-1 relative shrink-0"
      data-name="Wrapper"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">3M</p>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-8 items-center justify-center min-h-px min-w-px overflow-clip p-0 relative rounded-[9999px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_2px_4px_0px_rgba(53,57,69,0.12)] shrink-0"
      data-name="Tab"
    >
      <Wrapper2 />
    </div>
  );
}

function Wrapper3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px px-4 py-1 relative shrink-0"
      data-name="Wrapper"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c8e9c8] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Year</p>
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div
      className="basis-0 bg-[#20413c] box-border content-stretch flex flex-col grow h-8 items-center justify-center min-h-px min-w-px overflow-clip p-0 relative rounded-[9999px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_2px_4px_0px_rgba(53,57,69,0.12)] shrink-0"
      data-name="Tab"
    >
      <Wrapper3 />
    </div>
  );
}

function Wrapper4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px px-4 py-1 relative shrink-0"
      data-name="Wrapper"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">All</p>
      </div>
    </div>
  );
}

function Tab4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-8 items-center justify-center min-h-px min-w-px overflow-clip p-0 relative rounded-[9999px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_2px_4px_0px_rgba(53,57,69,0.12)] shrink-0"
      data-name="Tab"
    >
      <Wrapper4 />
    </div>
  );
}

function TabBar() {
  return (
    <div
      className="bg-[#e9ecec] relative rounded-[9999px] shrink-0 w-full"
      data-name="Tab bar"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-[4px] relative w-full">
          <Tab />
          <Tab1 />
          <Tab2 />
          <Tab3 />
          <Tab4 />
        </div>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Chart"
    >
      <Chart5 />
      <TabBar />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <BalanceHeader />
      <GraphPicker />
      <Chart />
    </div>
  );
}

function Autorenew() {
  return (
    <div className="relative shrink-0 size-4" data-name="Autorenew">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g clipPath="url(#clip0_15_5764)" id="Autorenew">
          <g id="Vector"></g>
          <path
            d={svgPaths.p1a0d7900}
            fill="var(--fill-0, #20413C)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5764">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2.5 py-0 relative shrink-0"
      data-name="content"
    >
      <Autorenew />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content1 />
    </div>
  );
}

function Sync() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="sync"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#353945] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Synced: Just Now</p>
      </div>
      <Button2 />
    </div>
  );
}

function ContentHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Accounts</p>
      </div>
      <Sync />
    </div>
  );
}

function AccountBalanceWallet() {
  return (
    <div
      className="relative shrink-0 size-6"
      data-name="Account balance wallet"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Account balance wallet">
          <path
            d={svgPaths.p1e308500}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Checkings</p>
      </div>
    </div>
  );
}

function KeyboardArrowDown1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p11d13340}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$5,584.00</p>
      </div>
      <KeyboardArrowDown1 />
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <AccountBalanceWallet />
      <Title />
      <Right />
    </div>
  );
}

function AccordianCard() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame />
        </div>
      </div>
    </div>
  );
}

function Accordian() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard />
    </div>
  );
}

function Savings() {
  return (
    <div className="relative shrink-0 size-6" data-name="Savings">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Savings">
          <path
            d={svgPaths.p1a5fdd00}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Savings</p>
      </div>
    </div>
  );
}

function KeyboardArrowDown2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p11d13340}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$2,480.00</p>
      </div>
      <KeyboardArrowDown2 />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Savings />
      <Title1 />
      <Right1 />
    </div>
  );
}

function AccordianCard1() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame1 />
        </div>
      </div>
    </div>
  );
}

function Accordian1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard1 />
    </div>
  );
}

function CreditCard() {
  return (
    <div className="relative shrink-0 size-6" data-name="Credit card">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Credit card">
          <path
            d={svgPaths.p321c8f00}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Credit</p>
      </div>
    </div>
  );
}

function KeyboardArrowDown3() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p11d13340}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$1,378.00</p>
      </div>
      <KeyboardArrowDown3 />
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <CreditCard />
      <Title2 />
      <Right2 />
    </div>
  );
}

function AccordianCard2() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame2 />
        </div>
      </div>
    </div>
  );
}

function Accordian2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard2 />
    </div>
  );
}

function Payments() {
  return (
    <div className="relative shrink-0 size-6" data-name="Payments">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Payments">
          <path
            d={svgPaths.p158d4000}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Cash</p>
      </div>
    </div>
  );
}

function KeyboardArrowDown4() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p11d13340}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$568.00</p>
      </div>
      <KeyboardArrowDown4 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Payments />
      <Title3 />
      <Right3 />
    </div>
  );
}

function AccordianCard3() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame3 />
        </div>
      </div>
    </div>
  );
}

function Accordian3() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard3 />
    </div>
  );
}

function PieChartOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="Pie chart outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Pie chart outline">
          <path
            d={svgPaths.p31638700}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Investments</p>
      </div>
    </div>
  );
}

function KeyboardArrowDown5() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p11d13340}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$1,478.00</p>
      </div>
      <KeyboardArrowDown5 />
    </div>
  );
}

function ContentFrame4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <PieChartOutline />
      <Title4 />
      <Right4 />
    </div>
  );
}

function AccordianCard4() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame4 />
        </div>
      </div>
    </div>
  );
}

function Accordian4() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard4 />
    </div>
  );
}

function AccountBalance() {
  return (
    <div className="relative shrink-0 size-6" data-name="Account balance">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Account balance">
          <path
            d={svgPaths.p26b8b880}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Loan</p>
      </div>
    </div>
  );
}

function KeyboardArrowDown6() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p11d13340}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$15,450.00</p>
      </div>
      <KeyboardArrowDown6 />
    </div>
  );
}

function ContentFrame5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <AccountBalance />
      <Title5 />
      <Right5 />
    </div>
  );
}

function AccordianCard5() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame5 />
        </div>
      </div>
    </div>
  );
}

function Accordian5() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard5 />
    </div>
  );
}

function AddCircle() {
  return (
    <div className="relative shrink-0 size-6" data-name="Add circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Add circle">
          <path
            d={svgPaths.p3fb3a580}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left w-full">
        <p className="block leading-[20px]">Add Accounts</p>
      </div>
    </div>
  );
}

function Right6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="right"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre"> </p>
      </div>
    </div>
  );
}

function ContentFrame6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <AddCircle />
      <Title6 />
      <Right6 />
    </div>
  );
}

function AccordianCard6() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Accordian card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame6 />
        </div>
      </div>
    </div>
  );
}

function Accordian6() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-[10px] shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_1px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Accordian"
    >
      <AccordianCard6 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="body"
    >
      <Accordian />
      <Accordian1 />
      <Accordian2 />
      <Accordian3 />
      <Accordian4 />
      <Accordian5 />
      <Accordian6 />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Content"
    >
      <ContentHeader />
      <Body />
    </div>
  );
}

function Body1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[648px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-0 top-[106px]"
      data-name="Body"
    >
      <Header />
      <Content2 />
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-6" data-name="Home">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Home">
          <path
            d={svgPaths.p1671eff0}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Item() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px opacity-50 p-0 relative shrink-0"
      data-name="Item"
    >
      <Home />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#353945] text-[12px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function CompareArrows() {
  return (
    <div className="relative shrink-0 size-6" data-name="Compare arrows">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Compare arrows">
          <path
            d={svgPaths.p17c7900}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Item1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px opacity-50 p-0 relative shrink-0"
      data-name="Item"
    >
      <CompareArrows />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#353945] text-[12px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Transactions</p>
      </div>
    </div>
  );
}

function AddCircle1() {
  return (
    <div className="relative shrink-0 size-11" data-name="Add circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 44 44"
      >
        <g clipPath="url(#clip0_15_5728)" id="Add circle">
          <rect
            fill="var(--fill-0, #C8E9C8)"
            height="22"
            id="Rectangle 1"
            width="25.6667"
            x="9.16667"
            y="11"
          />
          <g id="Vector"></g>
          <path
            d={svgPaths.p23d62900}
            fill="var(--fill-0, #20413C)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5728">
            <rect fill="white" height="44" width="44" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Item2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Item"
    >
      <AddCircle1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-0" data-name="Group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Group">
          <g id="Vector"></g>
          <g id="Vector_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute bottom-[16.667%] left-[8.333%] right-[8.333%] top-[16.667%]"
      data-name="Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 16"
      >
        <g id="Group">
          <path
            d={svgPaths.p3e5ebc80}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Wallet() {
  return (
    <div className="overflow-clip relative shrink-0 size-6" data-name="Wallet">
      <Group />
      <Group1 />
    </div>
  );
}

function Item3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Item"
    >
      <Wallet />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Accounts</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-0" data-name="Group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Group">
          <g id="Vector"></g>
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[12.5%]" data-name="Group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
      >
        <g id="Group">
          <path
            d={svgPaths.p39046600}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function DashboardCustomize() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-6"
      data-name="Dashboard customize"
    >
      <Group2 />
      <Group3 />
    </div>
  );
}

function Item4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px opacity-50 p-0 relative shrink-0"
      data-name="Item"
    >
      <DashboardCustomize />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#353945] text-[12px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">More</p>
      </div>
    </div>
  );
}

function Items() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Items"
    >
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-2 relative shrink-0 w-full"
      data-name="Footer"
    >
      <div className="absolute border-[#e9ecec] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Items />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div
      className="bg-[#ffffff] h-[34px] relative shrink-0 w-full"
      data-name="Home Indicator"
    >
      <div className="absolute bottom-2 flex h-[5px] items-center justify-center left-1/2 translate-x-[-50%] w-36">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div
            className="bg-[#000000] h-[5px] rounded-[100px] w-36"
            data-name="Home Indicator"
          />
        </div>
      </div>
    </div>
  );
}

function Footer1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Footer"
    >
      <Footer />
      <HomeIndicator />
    </div>
  );
}

function Footer2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[66px] items-start justify-end left-0 p-0 top-[778px] w-[390px]"
      data-name="Footer"
    >
      <Footer1 />
    </div>
  );
}

function Time() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Time"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center pl-4 pr-1.5 py-0 relative w-full">
          <div
            className="font-['SF_Pro:Semibold',_sans-serif] font-[590] leading-[0] relative shrink-0 text-[#000000] text-[17px] text-center text-nowrap"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            <p className="block leading-[22px] whitespace-pre">9:41</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicIslandSpacer() {
  return (
    <div
      className="h-2.5 shrink-0 w-[124px]"
      data-name="Dynamic Island spacer"
    />
  );
}

function Battery() {
  return (
    <div
      className="h-[13px] relative shrink-0 w-[27.328px]"
      data-name="Battery"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 13"
      >
        <g id="Battery">
          <rect
            height="12"
            id="Border"
            opacity="0.35"
            rx="3.8"
            stroke="var(--stroke-0, black)"
            width="24"
            x="0.5"
            y="0.5"
          />
          <path
            d={svgPaths.p3bbd9700}
            fill="var(--fill-0, black)"
            id="Cap"
            opacity="0.4"
          />
          <rect
            fill="var(--fill-0, black)"
            height="9"
            id="Capacity"
            rx="2.5"
            width="21"
            x="2"
            y="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Levels() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0"
      data-name="Levels"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-[7px] items-center justify-center pl-1.5 pr-4 py-0 relative w-full">
          <div
            className="h-[12.226px] relative shrink-0 w-[19.2px]"
            data-name="Cellular Connection"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 20 13"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p1e09e400}
                fill="var(--fill-0, black)"
                fillRule="evenodd"
                id="Cellular Connection"
              />
            </svg>
          </div>
          <div
            className="h-[12.328px] relative shrink-0 w-[17.142px]"
            data-name="Wifi"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 18 13"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p1fac3f80}
                fill="var(--fill-0, black)"
                fillRule="evenodd"
                id="Wifi"
              />
            </svg>
          </div>
          <Battery />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Frame"
    >
      <Time />
      <DynamicIslandSpacer />
      <Levels />
    </div>
  );
}

function StatusBarIPhone() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col h-[50px] items-start justify-start pb-0 pt-[21px] px-0 relative shrink-0 w-full"
      data-name="Status Bar - iPhone"
    >
      <Frame />
    </div>
  );
}

function KeyboardBackspace() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard backspace">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard backspace">
          <path
            d={svgPaths.p1c45f500}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Left() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-[72px]"
      data-name="left"
    >
      <KeyboardBackspace />
    </div>
  );
}

function Settings() {
  return (
    <div className="relative shrink-0 size-6" data-name="Settings">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5739)" id="Settings">
          <g id="Vector"></g>
          <path
            d={svgPaths.p28f07580}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5739">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-6" data-name="Add">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Add">
          <path
            d={svgPaths.p14900b00}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Right7() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-6 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="right"
    >
      <Settings />
      <Add />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Left />
          <Right7 />
          <div
            className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#18312d] text-[18px] text-center top-1/2 translate-x-[-50%] translate-y-[-50%] w-[143px]"
            style={{ left: "calc(50% - 0.5px)" }}
          >
            <p className="block leading-[24px]">Accounts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderNav() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 top-0 w-[390px]"
      data-name="Header nav"
    >
      <StatusBarIPhone />
      <Header1 />
    </div>
  );
}

export default function IPhone131434() {
  return (
    <div className="relative size-full" data-name="iPhone 13 & 14 - 34">
      <Footer2 />
      <HeaderNav />
      <Body1 />
    </div>
  );
}