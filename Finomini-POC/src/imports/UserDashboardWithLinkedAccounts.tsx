import svgPaths from "./svg-dqw1pga3im";
import imgLogoPng1 from "figma:asset/ada7cc34c0e562f71ac6f5c431b7dfd977d0cd71.png";
import { imgGroup } from "./svg-2epj3";
import { Screen } from '../App';

function HeaderTitle() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Header Title"
    >
      <div className="basis-0 flex flex-col font-['DM_Sans:bold',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[24px] text-left">
        <p className="block leading-[32px]">{`Welcome Taylor! `}</p>
      </div>
    </div>
  );
}

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
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="amount"
    >
      <div className="font-['DM_Sans:bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[0px] text-center text-nowrap">
        <p className="leading-[40px] text-[32px] whitespace-pre">
          <span className="text-[#18312d]">$165,378.</span>
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
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative shrink-0"
      data-name="status"
    >
      <ArrowUpwardAlt />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,0,0,0.6)] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">
          <span className="text-[#0b733c]">6.1% (+$10,116.05)</span>{" "}
          <span className="text-[#20413c]">last year</span>
        </p>
      </div>
    </div>
  );
}

function NetWorth() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Net worth"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">NET WORTH SUMMARY</p>
      </div>
      <Amount />
      <Status />
    </div>
  );
}

function BalanceHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Balance Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start px-4 py-1 relative w-full">
          <NetWorth />
        </div>
      </div>
    </div>
  );
}

function Liabilities() {
  return (
    <div
      className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[209.571px] mt-0 not-italic place-items-start relative text-left"
      data-name="Liabilities"
    >
      <div className="[grid-area:1_/_1] font-['DM_Sans:semibold',_sans-serif] ml-0 mt-[21px] relative text-[#000000] text-[18px] w-[116.429px]">
        <p className="leading-[24px]">
          <span className="text-[#c35033]">$20,132.</span>
          <span className="text-[rgba(32,65,60,0.3)]">00</span>
        </p>
      </div>
      <div className="[grid-area:1_/_1] font-['DM_Sans:regular',_sans-serif] ml-0 mt-0 relative text-[#18312d] text-[14px] text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Liabilities</p>
      </div>
    </div>
  );
}

function Assets() {
  return (
    <div
      className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 not-italic place-items-start relative text-left"
      data-name="Assets"
    >
      <div className="[grid-area:1_/_1] font-['DM_Sans:semibold',_sans-serif] ml-0 mt-[21px] relative text-[#000000] text-[0px] w-[131.135px]">
        <p className="leading-[24px] text-[18px]">
          <span className="text-[#0b733c]">$185,969.</span>
          <span
            className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold text-[rgba(32,65,60,0.3)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            00
          </span>
        </p>
      </div>
      <div className="[grid-area:1_/_1] font-['DM_Sans:regular',_sans-serif] ml-0 mt-0 relative text-[#18312d] text-[14px] text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Assets</p>
      </div>
    </div>
  );
}

function Group40() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Liabilities />
      <Assets />
    </div>
  );
}

function Categories() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="categories"
    >
      <div className="bg-[#0b733c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-64" />
      <div className="basis-0 bg-[#c35033] grow h-2 min-h-px min-w-px rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function ExensesOverview() {
  return (
    <div
      className="bg-[#fefefe] box-border content-stretch flex flex-col gap-[15px] items-start justify-start overflow-clip px-4 py-3.5 relative rounded-[18px] shrink-0 w-[358px]"
      data-name="Exenses overview"
    >
      <Group40 />
      <Categories />
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

function NetWorth1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Net Worth"
    >
      <BalanceHeader />
      <ExensesOverview />
      <TabBar />
    </div>
  );
}

function ContentHeader() {
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

function Group() {
  return (
    <div
      className="absolute bottom-[0.022%] left-[0.04%] right-[0.041%] top-[0.023%]"
      data-name="Group"
    >
      <div className="absolute bottom-[-0.233%] left-[-0.423%] right-[-0.423%] top-[-0.233%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 10 16"
        >
          <g id="Group">
            <path
              clipRule="evenodd"
              d={svgPaths.p22075a80}
              fill="var(--fill-0, #B1060F)"
              fillRule="evenodd"
              id="Vector"
              stroke="var(--stroke-0, black)"
              strokeMiterlimit="10"
              strokeWidth="0.0676261"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.pc4d8280}
              fill="url(#paint0_radial_28_5622)"
              fillRule="evenodd"
              id="Vector_2"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.pbc9db00}
              fill="var(--fill-0, #E50914)"
              fillRule="evenodd"
              id="Vector_3"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p22075a80}
              fill="var(--fill-0, #B1060F)"
              fillRule="evenodd"
              id="Vector_4"
              stroke="var(--stroke-0, black)"
              strokeMiterlimit="10"
              strokeWidth="0.0676261"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.pc4d8280}
              fill="url(#paint1_radial_28_5622)"
              fillRule="evenodd"
              id="Vector_5"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.pbc9db00}
              fill="var(--fill-0, #E50914)"
              fillRule="evenodd"
              id="Vector_6"
            />
          </g>
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(4.86416 8.17198) rotate(-19.1007) scale(0.526802 19.2975)"
              gradientUnits="userSpaceOnUse"
              id="paint0_radial_28_5622"
              r="1"
            >
              <stop />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(4.86416 8.17198) rotate(-19.1007) scale(0.526802 19.2975)"
              gradientUnits="userSpaceOnUse"
              id="paint1_radial_28_5622"
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
      className="h-[14.52px] overflow-clip relative shrink-0 w-2"
      data-name="netflix logo"
    >
      <Group />
    </div>
  );
}

function Logo() {
  return (
    <div
      className="bg-[#fbe8ea] box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative rounded-[9999px] shrink-0 size-7"
      data-name="Logo"
    >
      <NetflixLogo />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Logo />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Netflix</p>
      </div>
    </div>
  );
}

function Transaction() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] grow items-center justify-between leading-[0] min-h-px min-w-px mr-[-16px] not-italic order-1 p-0 relative shrink-0 text-[#18312d] text-left text-nowrap"
      data-name="transaction"
    >
      <div className="relative shrink-0 text-[16px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">
          $10.<span className="text-[rgba(32,65,60,0.3)]">00</span>
        </p>
      </div>
      <div className="relative shrink-0 text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          Apr 20
        </p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-start justify-start pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction />
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
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Subscription</p>
      </div>
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[152px]"
      data-name="Details Card"
    >
      <ContentFrame />
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute bottom-[14.773%] left-[0.099%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.016px_-2.363px] mask-size-[16px_16px] right-[-0.099%] top-[14.773%]"
      data-name="Group"
      style={{ maskImage: `url('${imgGroup}')` }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 12"
      >
        <g id="Group">
          <path
            d={svgPaths.pf620000}
            fill="var(--fill-0, #FF0302)"
            id="Vector"
          />
          <path
            d={svgPaths.p394d1530}
            fill="var(--fill-0, #FEFEFE)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function YoutubeLogo() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-4"
      data-name="youtube logo"
    >
      <ClipPathGroup />
    </div>
  );
}

function Logo1() {
  return (
    <div
      className="bg-[#f9eeeb] box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative rounded-[9999px] shrink-0 size-7"
      data-name="Logo"
    >
      <YoutubeLogo />
    </div>
  );
}

function Header1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Logo1 />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Youtube</p>
      </div>
    </div>
  );
}

function Transaction1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] grow items-center justify-between leading-[0] min-h-px min-w-px mr-[-16px] not-italic order-1 p-0 relative shrink-0 text-[#18312d] text-left text-nowrap"
      data-name="transaction"
    >
      <div className="relative shrink-0 text-[16px]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">$8.99</p>
      </div>
      <div className="relative shrink-0 text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          Apr 25
        </p>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-start justify-start pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction1 />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Header1 />
      <Body1 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Subscription</p>
      </div>
    </div>
  );
}

function DetailsCard1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[152px]"
      data-name="Details Card"
    >
      <ContentFrame1 />
    </div>
  );
}

function Row() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <DetailsCard />
      <DetailsCard1 />
    </div>
  );
}

function AttLogo1() {
  return (
    <div className="relative shrink-0 size-4" data-name="att logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="att logo">
          <path
            d={svgPaths.p17d35c00}
            fill="var(--fill-0, #00A8E0)"
            id="path9"
          />
        </g>
      </svg>
    </div>
  );
}

function Logo2() {
  return (
    <div
      className="bg-[#e6f1fc] box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative rounded-[9999px] shrink-0 size-7"
      data-name="Logo"
    >
      <AttLogo1 />
    </div>
  );
}

function Header2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Logo2 />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">{`AT&T`}</p>
      </div>
    </div>
  );
}

function Transaction2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] grow items-center justify-between leading-[0] min-h-px min-w-px mr-[-16px] not-italic order-1 p-0 relative shrink-0 text-[#18312d] text-left text-nowrap"
      data-name="transaction"
    >
      <div className="relative shrink-0 text-[16px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">
          $141.<span className="text-[rgba(32,65,60,0.3)]">00</span>
        </p>
      </div>
      <div className="relative shrink-0 text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          Apr 25
        </p>
      </div>
    </div>
  );
}

function Body2() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-start justify-start pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction2 />
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Header2 />
      <Body2 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Subscription</p>
      </div>
    </div>
  );
}

function DetailsCard2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[152px]"
      data-name="Details Card"
    >
      <ContentFrame2 />
    </div>
  );
}

function SpotifyLogo() {
  return (
    <div className="relative shrink-0 size-4" data-name="spotify logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g clipPath="url(#clip0_28_5634)" id="spotify logo">
          <path
            d={svgPaths.p2308e080}
            fill="var(--fill-0, #00D95F)"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_5634">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logo3() {
  return (
    <div
      className="bg-[#e7f5ee] box-border content-stretch flex flex-row gap-2 items-center justify-center p-0 relative rounded-[9999px] shrink-0 size-7"
      data-name="Logo"
    >
      <SpotifyLogo />
    </div>
  );
}

function Header3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <Logo3 />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Spotify</p>
      </div>
    </div>
  );
}

function Transaction3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] grow items-center justify-between leading-[0] min-h-px min-w-px mr-[-16px] not-italic order-1 p-0 relative shrink-0 text-[#18312d] text-left text-nowrap"
      data-name="transaction"
    >
      <div className="relative shrink-0 text-[16px]">
        <p className="block leading-[24px] text-nowrap whitespace-pre">$9.99</p>
      </div>
      <div className="relative shrink-0 text-[12px]">
        <p className="block leading-[20px] text-nowrap whitespace-pre">
          Apr 25
        </p>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-start justify-start pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction3 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Header3 />
      <Body3 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Subscription</p>
      </div>
    </div>
  );
}

function DetailsCard3() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[152px]"
      data-name="Details Card"
    >
      <ContentFrame3 />
    </div>
  );
}

function Row1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Row"
    >
      <DetailsCard2 />
      <DetailsCard3 />
    </div>
  );
}

function Transactions() {
  return (
    <div
      className="bg-[#f5eef4] relative rounded-[20px] shrink-0 w-full"
      data-name="Transactions"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-[16px] relative w-full">
          <Row />
          <Row1 />
        </div>
      </div>
    </div>
  );
}

function UpcomingPayments() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Upcoming Payments"
    >
      <ContentHeader />
      <Transactions />
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
        <p className="block leading-[24px]">Recent Transactions</p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] relative shrink-0 text-[12px] text-center text-nowrap">
        <p className="[text-decoration-line:underline] [text-decoration-style:solid] [text-underline-position:from-font] block leading-[20px] whitespace-pre">
          See all
        </p>
      </div>
    </div>
  );
}

function WalmartLogo() {
  return (
    <div className="relative shrink-0 size-6" data-name="Walmart logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_28_4057)" id="Walmart logo">
          <path
            d={svgPaths.p2b642dc0}
            fill="var(--fill-0, #FDBB30)"
            id="Vector"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_4057">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logo4() {
  return (
    <div
      className="bg-[#f5eef4] box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[8px] relative rounded-[20px] shrink-0 size-10"
      data-name="Logo"
    >
      <WalmartLogo />
    </div>
  );
}

function Title() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Walmart</p>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <Title />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">-$50.00</p>
      </div>
    </div>
  );
}

function Subtitle() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] items-center justify-start leading-[0] not-italic opacity-70 p-0 relative shrink-0 text-[#18312d] text-[12px] w-full"
      data-name="Subtitle"
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-left">
        <p className="block leading-[20px]">Account **4526</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Fri, 21 Feb 2025</p>
      </div>
    </div>
  );
}

function Body4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title1 />
      <Subtitle />
    </div>
  );
}

function ContentFrame4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Logo4 />
      <Body4 />
    </div>
  );
}

function TransactionCard() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-10 items-end justify-start px-0 py-4 relative shrink-0 w-[358px]"
      data-name="Transaction card"
    >
      <div className="absolute border-[#e9ecec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <ContentFrame4 />
    </div>
  );
}

function Transactions1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      {[...Array(4).keys()].map((_, i) => (
        <TransactionCard key={i} />
      ))}
    </div>
  );
}

function RecentTransactions() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Recent Transactions"
    >
      <ContentHeader1 />
      <Transactions1 />
    </div>
  );
}

function Body8() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[648px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-4 top-[106px] w-[390px]"
      data-name="Body"
    >
      <HeaderTitle />
      <NetWorth1 />
      <UpcomingPayments />
      <RecentTransactions />
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
          <g id="Vector_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Group3() {
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
      <Group2 />
      <Group3 />
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

function Group4() {
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

function Group5() {
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
      <Group4 />
      <Group5 />
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

function Left() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-[72px]"
      data-name="left"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-10"
        data-name="Logo_png 1"
        style={{ backgroundImage: `url('${imgLogoPng1}')` }}
      />
    </div>
  );
}

interface SettingsProps {
  onNavigate?: (screen: Screen) => void;
}

function Settings({ onNavigate }: SettingsProps) {
  return (
    <button 
      onClick={() => onNavigate?.('profile')}
      className="relative shrink-0 size-6" 
      data-name="Settings"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Settings">
          <path
            d={svgPaths.p3501cf00}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </button>
  );
}

function NotificationsNone() {
  return (
    <div className="relative shrink-0 size-6" data-name="Notifications none">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_28_4101)" id="Notifications none">
          <g id="Vector"></g>
          <path
            d={svgPaths.p34be6d80}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_4101">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className="overflow-clip relative shrink-0 size-6" data-name="Avatar">
      <div className="absolute inset-0" data-name="background">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            fill="var(--fill-0, #20413C)"
            id="background"
            r="12"
          />
        </svg>
      </div>
      <div
        className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#c8e9c8] text-[12px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]"
        style={{ left: "calc(50% + 0.5px)" }}
      >
        <p className="block leading-[16px] whitespace-pre">TS</p>
      </div>
    </div>
  );
}

function Avatar1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start overflow-clip p-0 relative shrink-0"
      data-name="Avatar"
    >
      <Avatar />
    </div>
  );
}

interface RightProps {
  onNavigate?: (screen: Screen) => void;
}

function Right({ onNavigate }: RightProps) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-6 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="right"
    >
      <Settings onNavigate={onNavigate} />
      <NotificationsNone />
      <Avatar1 />
    </div>
  );
}

function Header4({ onNavigate }: RightProps) {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Left />
          <Right onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

function HeaderNav({ onNavigate }: RightProps) {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col items-start justify-start left-0 p-0 top-0 w-[390px]"
      data-name="Header nav"
    >
      <StatusBarIPhone />
      <Header4 onNavigate={onNavigate} />
    </div>
  );
}

interface UserDashboardProps {
  onNavigate?: (screen: Screen) => void;
}

export default function UserDashboardWithLinkedAccounts({ onNavigate }: UserDashboardProps) {
  return (
    <div
      className="relative size-full"
      data-name="User Dashboard with linked accounts"
    >
      <Footer2 />
      <HeaderNav onNavigate={onNavigate} />
      <Body8 />
    </div>
  );
}