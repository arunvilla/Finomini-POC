import svgPaths from "./svg-8slxfp2tjp";

function KeyboardArrowLeft() {
  return (
    <div className="relative shrink-0 size-5" data-name="Keyboard arrow left">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Keyboard arrow left">
          <path
            d={svgPaths.p15284a80}
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
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-[14px] relative shrink-0"
      data-name="content"
    >
      <KeyboardArrowLeft />
    </div>
  );
}

function Previous() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start p-0 relative rounded-lg shrink-0"
      data-name="Previous"
    >
      <Content />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">April</p>
      </div>
    </div>
  );
}

function Month() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Month"
    >
      <Content1 />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">2025</p>
      </div>
    </div>
  );
}

function Year() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Year"
    >
      <Content2 />
    </div>
  );
}

function Date() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Date"
    >
      <Month />
      <Year />
    </div>
  );
}

function KeyboardArrowRight() {
  return (
    <div className="relative shrink-0 size-5" data-name="Keyboard arrow right">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Keyboard arrow right">
          <path
            d={svgPaths.p7fe2100}
            fill="var(--fill-0, #20413C)"
            fillOpacity="0.3"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-[14px] relative shrink-0"
      data-name="content"
    >
      <KeyboardArrowRight />
    </div>
  );
}

function Next() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start p-0 relative rounded-lg shrink-0"
      data-name="Next"
    >
      <Content3 />
    </div>
  );
}

function CalendarHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between order-3 p-0 relative shrink-0 w-full"
      data-name="Calendar header"
    >
      <Previous />
      <Date />
      <Next />
    </div>
  );
}

function Sunday() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Sunday"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">Su</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Monday() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Monday"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">Mo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tuesday() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Tuesday"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">Tu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Wednesdsay() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Wednesdsay"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">We</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Thursday() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Thursday"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">Th</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Friday() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Friday"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">Fr</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Saturday() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow h-11 min-h-px min-w-px relative shrink-0"
      data-name="Saturday"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col h-11 items-center justify-center p-[16px] relative w-full">
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center w-10">
            <p className="block leading-[20px]">Sa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DaysOfWeek() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row items-start justify-start order-2 overflow-clip p-0 relative shrink-0 w-full"
      data-name="Days of week"
    >
      <Sunday />
      <Monday />
      <Tuesday />
      <Wednesdsay />
      <Thursday />
      <Friday />
      <Saturday />
    </div>
  );
}

function Text() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">23</p>
      </div>
    </div>
  );
}

function Date1() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">24</p>
      </div>
    </div>
  );
}

function Date2() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">25</p>
      </div>
    </div>
  );
}

function Date3() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">26</p>
      </div>
    </div>
  );
}

function Date4() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">27</p>
      </div>
    </div>
  );
}

function Date5() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">28</p>
      </div>
    </div>
  );
}

function Date6() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Date7() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col font-['DM_Sans:regular',_sans-serif] items-center justify-center leading-[0] not-italic p-0 relative rounded-md shrink-0 size-10 text-center text-nowrap"
      data-name="text"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[#18312d] text-[8px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">2</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#9b5295] text-[10px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">$20</p>
      </div>
    </div>
  );
}

function Date8() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Date9() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Date10() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col font-['DM_Sans:regular',_sans-serif] items-center justify-center leading-[0] not-italic p-0 relative rounded-md shrink-0 size-10 text-center text-nowrap"
      data-name="text"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[#18312d] text-[14px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">5</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#9b5295] text-[10px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">$9.99</p>
      </div>
    </div>
  );
}

function Date11() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">6</p>
      </div>
    </div>
  );
}

function Date12() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">7</p>
      </div>
    </div>
  );
}

function Date13() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">8</p>
      </div>
    </div>
  );
}

function Date14() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">9</p>
      </div>
    </div>
  );
}

function Date15() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">10</p>
      </div>
    </div>
  );
}

function Date16() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col font-['DM_Sans:regular',_sans-serif] items-center justify-center leading-[0] not-italic p-0 relative rounded-md shrink-0 size-10 text-center text-nowrap"
      data-name="text"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[#18312d] text-[8px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">11</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#9b5295] text-[10px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">$120</p>
      </div>
    </div>
  );
}

function Date17() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">12</p>
      </div>
    </div>
  );
}

function Date18() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">13</p>
      </div>
    </div>
  );
}

function Date19() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text18 />
        </div>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">14</p>
      </div>
    </div>
  );
}

function Date20() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">15</p>
      </div>
    </div>
  );
}

function Date21() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text20 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">16</p>
      </div>
    </div>
  );
}

function Date22() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text21 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">17</p>
      </div>
    </div>
  );
}

function Date23() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text22 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">18</p>
      </div>
    </div>
  );
}

function Date24() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text23 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">19</p>
      </div>
    </div>
  );
}

function Date25() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text24 />
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col font-['DM_Sans:regular',_sans-serif] items-center justify-center leading-[0] not-italic p-0 relative rounded-md shrink-0 size-10 text-center text-nowrap"
      data-name="text"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[#18312d] text-[8px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">20</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#9b5295] text-[10px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">$10</p>
      </div>
    </div>
  );
}

function Date26() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text25 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">21</p>
      </div>
    </div>
  );
}

function Date27() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text26 />
        </div>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">22</p>
      </div>
    </div>
  );
}

function Date28() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text27 />
        </div>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">23</p>
      </div>
    </div>
  );
}

function Date29() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text28 />
        </div>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">24</p>
      </div>
    </div>
  );
}

function Date30() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text29 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col font-['DM_Sans:regular',_sans-serif] items-center justify-center leading-[0] not-italic p-0 relative rounded-md shrink-0 size-10 text-center text-nowrap"
      data-name="text"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[#18312d] text-[8px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">25</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[#9b5295] text-[10px]">
        <p className="block leading-[16px] text-nowrap whitespace-pre">
          $159.98
        </p>
      </div>
    </div>
  );
}

function Date31() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text30 />
        </div>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">26</p>
      </div>
    </div>
  );
}

function Date32() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text31 />
        </div>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">27</p>
      </div>
    </div>
  );
}

function Date33() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text32 />
        </div>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">28</p>
      </div>
    </div>
  );
}

function Date34() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">29</p>
      </div>
    </div>
  );
}

function Date35() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text34 />
        </div>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">30</p>
      </div>
    </div>
  );
}

function Date36() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text35 />
        </div>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[8px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">31</p>
      </div>
    </div>
  );
}

function Date37() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text36 />
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Date38() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text37 />
        </div>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Date39() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text38 />
        </div>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Date40() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text39 />
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Date41() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text40 />
        </div>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative rounded-[40px] shrink-0 size-10"
      data-name="text"
    >
      <div className="flex flex-col font-['DM_Sans:regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-[rgba(32,65,60,0.3)] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Date42() {
  return (
    <div
      className="basis-0 grow h-11 min-h-px min-w-[50px] relative shrink-0"
      data-name="Date"
    >
      <div className="flex flex-col items-center justify-center min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 h-11 items-center justify-center min-w-inherit px-0.5 py-3 relative w-full">
          <Text41 />
        </div>
      </div>
    </div>
  );
}

function Dates() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-start flex gap-0 items-start justify-start max-w-[396px] min-w-[352px] order-1 p-0 relative shrink-0 w-full"
      data-name="Dates"
    >
      <Date1 />
      <Date2 />
      <Date3 />
      <Date4 />
      <Date5 />
      <Date6 />
      <Date7 />
      <Date8 />
      <Date9 />
      <Date10 />
      <Date11 />
      <Date12 />
      <Date13 />
      <Date14 />
      <Date15 />
      <Date16 />
      <Date17 />
      <Date18 />
      <Date19 />
      <Date20 />
      <Date21 />
      <Date22 />
      <Date23 />
      <Date24 />
      <Date25 />
      <Date26 />
      <Date27 />
      <Date28 />
      <Date29 />
      <Date30 />
      <Date31 />
      <Date32 />
      <Date33 />
      <Date34 />
      <Date35 />
      <Date36 />
      <Date37 />
      <Date38 />
      <Date39 />
      <Date40 />
      <Date41 />
      <Date42 />
    </div>
  );
}

function Month1() {
  return (
    <div
      className="box-border content-stretch flex flex-col-reverse items-center justify-start min-w-[352px] order-3 p-0 relative shrink-0 w-full"
      data-name="Month 1"
    >
      <CalendarHeader />
      <DaysOfWeek />
      <Dates />
    </div>
  );
}

function Calendar() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-full"
      data-name="Calendar"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col-reverse gap-6 items-center justify-start p-[12px] relative w-full">
          <Month1 />
        </div>
      </div>
    </div>
  );
}

function Accounts() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Accounts"
    >
      <Calendar />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#18312d] w-full"
      data-name="Header"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[16px] text-left">
        <p className="block leading-[20px]">Monthly Subscription Cost</p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] opacity-70 relative shrink-0 text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">As of April 30</p>
      </div>
    </div>
  );
}

function Name() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px order-2 p-0 relative shrink-0"
      data-name="Name"
    >
      <div className="absolute border-[#20413c] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0073e5] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">$370.00</p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">6 Subscriptions</p>
      </div>
    </div>
  );
}

function Percentage() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center leading-[0] min-h-px min-w-px not-italic order-1 p-0 relative shrink-0 text-left text-nowrap"
      data-name="Percentage"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] relative shrink-0 text-[#0073e5] text-[18px]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">40%</p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] relative shrink-0 text-[#000000] text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          of Monthly Expenses
        </p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Name />
      <Percentage />
    </div>
  );
}

function Categories() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="categories"
    >
      <div className="basis-0 bg-[#b0d4f7] grow h-2 min-h-px min-w-px rounded-bl-[30px] rounded-tl-[30px] shrink-0" />
      <div className="basis-0 bg-[#ecc9c0] grow h-2 min-h-px min-w-px rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Header />
      <Body />
      <Categories />
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-px relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0"
      data-name="Details Card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Card"
    >
      <DetailsCard />
    </div>
  );
}

function ContentHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Next Payment</p>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow h-full items-start justify-center leading-[0] min-h-px min-w-px not-italic p-0 relative shrink-0 text-[#18312d] text-left text-nowrap"
      data-name="Header"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] opacity-70 relative shrink-0 text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          Due Apr 20
        </p>
      </div>
      <div className="font-['DM_Sans:semibold',_sans-serif] relative shrink-0 text-[18px]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">
          Netflix
        </p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] opacity-70 relative shrink-0 text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          $10.00
        </p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div
      className="absolute bottom-[0.022%] left-[0.04%] right-[0.041%] top-[0.023%]"
      data-name="Group"
    >
      <div className="absolute bottom-[-0.161%] left-[-0.282%] right-[-0.282%] top-[-0.161%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 23"
        >
          <g id="Group">
            <path
              clipRule="evenodd"
              d={svgPaths.p3e4f5a00}
              fill="var(--fill-0, #B1060F)"
              fillRule="evenodd"
              id="Vector"
              stroke="var(--stroke-0, black)"
              strokeMiterlimit="10"
              strokeWidth="0.0676261"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p30c58e00}
              fill="url(#paint0_radial_28_4041)"
              fillRule="evenodd"
              id="Vector_2"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p12e87880}
              fill="var(--fill-0, #E50914)"
              fillRule="evenodd"
              id="Vector_3"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p3e4f5a00}
              fill="var(--fill-0, #B1060F)"
              fillRule="evenodd"
              id="Vector_4"
              stroke="var(--stroke-0, black)"
              strokeMiterlimit="10"
              strokeWidth="0.0676261"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p30c58e00}
              fill="url(#paint1_radial_28_4041)"
              fillRule="evenodd"
              id="Vector_5"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p12e87880}
              fill="var(--fill-0, #E50914)"
              fillRule="evenodd"
              id="Vector_6"
            />
          </g>
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(6.79624 11.3724) rotate(-18.4633) scale(0.78722 28.0145)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial_28_4041"
              r="1"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(6.79624 11.3724) rotate(-18.4633) scale(0.78722 28.0145)"
              gradientUnits="userSpaceOnUse"
              id="paint1_radial_28_4041"
              r="1"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function NetflixLogo() {
  return (
    <div
      className="h-[21px] overflow-clip relative shrink-0 w-3"
      data-name="netflix logo"
    >
      <Group />
    </div>
  );
}

function Netflix() {
  return (
    <div
      className="bg-[#fbe8ea] box-border content-stretch flex flex-col gap-2 h-11 items-center justify-center p-0 relative rounded shrink-0 w-[70px]"
      data-name="Netflix"
    >
      <NetflixLogo />
    </div>
  );
}

function Body1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Body"
    >
      <Netflix />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 h-[72px] items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Header1 />
      <Body1 />
    </div>
  );
}

function DetailsCard1() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-full"
      data-name="Details Card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame1 />
        </div>
      </div>
    </div>
  );
}

function NextPayment() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Next Payment"
    >
      <ContentHeader />
      <DetailsCard1 />
    </div>
  );
}

function ContentHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#18312d] w-full"
      data-name="Content Header"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow min-h-px min-w-px relative shrink-0 text-[18px] text-left">
        <p className="block leading-[24px]">Upcoming Payments</p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] relative shrink-0 text-[12px] text-center text-nowrap">
        <p className="[text-decoration-line:underline] [text-decoration-style:solid] [text-underline-position:from-font] block leading-[20px] whitespace-pre">
          See all
        </p>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0 size-4" data-name="Avatar">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 16 16"
      >
        <g id="Avatar">
          <rect fill="var(--fill-0, #20413C)" height="16" rx="8" width="16" />
          <circle
            cx="8"
            cy="8"
            fill="var(--fill-0, white)"
            id="Ellipse 4"
            r="3"
          />
        </g>
      </svg>
    </div>
  );
}

function Stepper() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-0.5 items-center justify-center p-0 relative shrink-0"
      data-name="Stepper"
    >
      <Avatar />
    </div>
  );
}

function Stepper1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-4"
      data-name="Stepper"
    >
      <Stepper />
    </div>
  );
}

function Pay() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="pay"
    >
      <Stepper1 />
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[18px] text-left">
        <p className="block leading-[28px]">Youtube</p>
      </div>
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[14px] text-right">
        <p className="block leading-[16px]">Apr 25</p>
      </div>
    </div>
  );
}

function Line() {
  return <div className="bg-[#20413c] h-8 shrink-0 w-0.5" data-name="Line" />;
}

function Avatar1() {
  return (
    <div className="relative shrink-0 size-4" data-name="Avatar">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 16 16"
      >
        <g id="Avatar">
          <rect fill="var(--fill-0, #20413C)" height="16" rx="8" width="16" />
          <circle
            cx="8"
            cy="8"
            fill="var(--fill-0, white)"
            id="Ellipse 4"
            r="3"
          />
        </g>
      </svg>
    </div>
  );
}

function Stepper2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center p-0 relative shrink-0 w-[162px]"
      data-name="Stepper"
    >
      <Line />
      <Avatar1 />
    </div>
  );
}

function Stepper3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-4"
      data-name="Stepper"
    >
      <Stepper2 />
    </div>
  );
}

function Pay1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="pay"
    >
      <Stepper3 />
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[18px] text-left">
        <p className="block leading-[28px]">{`AT&T`}</p>
      </div>
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[14px] text-right">
        <p className="block leading-[16px]">Apr 25</p>
      </div>
    </div>
  );
}

function Line1() {
  return <div className="bg-[#20413c] h-8 shrink-0 w-0.5" data-name="Line" />;
}

function Avatar2() {
  return (
    <div className="relative shrink-0 size-4" data-name="Avatar">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 16 16"
      >
        <g id="Avatar">
          <rect fill="var(--fill-0, #20413C)" height="16" rx="8" width="16" />
          <circle
            cx="8"
            cy="8"
            fill="var(--fill-0, white)"
            id="Ellipse 4"
            r="3"
          />
        </g>
      </svg>
    </div>
  );
}

function Stepper4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-0.5 items-center justify-center p-0 relative shrink-0 w-[162px]"
      data-name="Stepper"
    >
      <Line1 />
      <Avatar2 />
    </div>
  );
}

function Stepper5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-4"
      data-name="Stepper"
    >
      <Stepper4 />
    </div>
  );
}

function Pay2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-end justify-start p-0 relative shrink-0 w-full"
      data-name="pay"
    >
      <Stepper5 />
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[18px] text-left">
        <p className="block leading-[28px]">Spotify</p>
      </div>
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[14px] text-right">
        <p className="block leading-[16px]">Apr 25</p>
      </div>
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Pay />
      <Pay1 />
      <Pay2 />
    </div>
  );
}

function DetailsCard2() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-full"
      data-name="Details Card"
    >
      <div className="flex flex-col items-end relative size-full">
        <div className="box-border content-stretch flex flex-col gap-10 items-end justify-start p-[16px] relative w-full">
          <ContentFrame2 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <ContentHeader1 />
      <DetailsCard2 />
    </div>
  );
}

function Transactions() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      <Card />
      <NextPayment />
      <Frame1 />
    </div>
  );
}

function Content4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start px-4 py-0 relative w-full">
          <Accounts />
          <Transactions />
        </div>
      </div>
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
            fill="var(--fill-0, #20413C)"
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
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Item"
    >
      <Home />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
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

function AddCircle() {
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
      <AddCircle />
    </div>
  );
}

function Group1() {
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

function Group2() {
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
            fill="var(--fill-0, #353945)"
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
      <Group1 />
      <Group2 />
    </div>
  );
}

function Item3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow h-10 items-center justify-center min-h-px min-w-px opacity-50 p-0 relative shrink-0"
      data-name="Item"
    >
      <Wallet />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#353945] text-[12px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Accounts</p>
      </div>
    </div>
  );
}

function Group3() {
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

function Group4() {
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
      <Group3 />
      <Group4 />
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
      className="absolute box-border content-stretch flex flex-col gap-2.5 h-[66px] items-start justify-end left-0 p-0 top-[672px] w-[390px]"
      data-name="Footer"
    >
      <Footer1 />
    </div>
  );
}

function Body2() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[738px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-0 top-[106px] w-[390px]"
      data-name="Body"
    >
      <Footer2 />
      <Content4 />
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

function Header2() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Left />
          <div
            className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#18312d] text-[18px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{ left: "calc(50% - 0.5px)" }}
          >
            <p className="block leading-[24px] whitespace-pre">
              Upcoming Payments
            </p>
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
      <Header2 />
    </div>
  );
}

export default function IPhone131438() {
  return (
    <div className="relative size-full" data-name="iPhone 13 & 14 - 38">
      <HeaderNav />
      <Body2 />
    </div>
  );
}