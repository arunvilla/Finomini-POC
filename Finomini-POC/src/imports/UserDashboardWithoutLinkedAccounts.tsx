import svgPaths from "./svg-d1f70w4903";
import imgLogoPng1 from "figma:asset/ada7cc34c0e562f71ac6f5c431b7dfd977d0cd71.png";
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

function Liabilities() {
  return (
    <div
      className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[209.571px] mt-0 not-italic place-items-start relative text-left"
      data-name="Liabilities"
    >
      <div className="[grid-area:1_/_1] font-['DM_Sans:semibold',_sans-serif] ml-0 mt-[21px] relative text-[#000000] text-[18px] w-[116.429px]">
        <p className="leading-[24px]">
          <span className="text-[#c35033]">$200.</span>
          <span className="text-[rgba(32,65,60,0.3)]">00</span>
        </p>
      </div>
      <div className="[grid-area:1_/_1] font-['DM_Sans:regular',_sans-serif] ml-0 mt-0 relative text-[#18312d] text-[14px] text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Expenses</p>
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
          <span className="text-[#0b733c]">$35210.</span>
          <span
            className="font-['DM_Sans:SemiBold',_sans-serif] font-semibold text-[rgba(32,65,60,0.3)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            00
          </span>
        </p>
      </div>
      <div className="[grid-area:1_/_1] font-['DM_Sans:regular',_sans-serif] ml-0 mt-0 relative text-[#18312d] text-[14px] text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Income</p>
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
      <div className="bg-[#0b733c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[297px]" />
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

function Content() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Link Account</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-[#20413c] box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0 w-full"
      data-name="Button"
    >
      <Content />
    </div>
  );
}

function Header() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-left w-full">
        <p className="block leading-[24px]">No Linked Accounts</p>
      </div>
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-left w-full">
        <p className="block leading-[20px]">
          Securely connect your bank to start tracking your finances.
        </p>
      </div>
      <Button />
    </div>
  );
}

function InsertLink() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="Insert link">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 60 60"
      >
        <g clipPath="url(#clip0_28_4066)" id="Insert link">
          <g id="Vector"></g>
          <path
            d={svgPaths.pcc7be00}
            fill="var(--fill-0, #20413C)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_4066">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Body() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative self-stretch shrink-0"
      data-name="Body"
    >
      <InsertLink />
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Header />
      <Body />
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="bg-[#b0d4f7] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-full"
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

function ContentHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">{`Benefit's of Linking Accounts`}</p>
      </div>
    </div>
  );
}

function IncompleteCircle() {
  return (
    <div className="relative shrink-0 size-6" data-name="Incomplete circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_28_4081)" id="Incomplete circle">
          <g id="Vector"></g>
          <path
            d={svgPaths.p2becef00}
            fill="var(--fill-0, #9B5295)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_4081">
            <rect fill="white" height="24" width="24" />
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
      <IncompleteCircle />
    </div>
  );
}

function Icon() {
  return (
    <div
      className="bg-[#d1afce] box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-[9999px] shrink-0"
      data-name="Icon"
    >
      <Content1 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative rounded-[9999px] shrink-0"
      data-name="Button"
    >
      <Icon />
      <div
        className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[14px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[16px]">Track All Your Transactions</p>
      </div>
    </div>
  );
}

function SignalCellularAlt() {
  return (
    <div className="relative shrink-0 size-6" data-name="Signal cellular alt">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_28_4075)" id="Signal cellular alt">
          <g id="Vector"></g>
          <path
            d={svgPaths.p30a7b1f0}
            fill="var(--fill-0, #C35033)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_4075">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2.5 py-0 relative shrink-0"
      data-name="content"
    >
      <SignalCellularAlt />
    </div>
  );
}

function Icon1() {
  return (
    <div
      className="bg-[#e3afa1] box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-[9999px] shrink-0"
      data-name="Icon"
    >
      <Content2 />
    </div>
  );
}

function Button2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative rounded-[9999px] shrink-0"
      data-name="Button"
    >
      <Icon1 />
      <div
        className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[14px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[16px]">Track Spending Patterns</p>
      </div>
    </div>
  );
}

function People() {
  return (
    <div className="relative shrink-0 size-6" data-name="People">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_28_4088)" id="People">
          <g id="Vector"></g>
          <path
            d={svgPaths.p145af000}
            fill="var(--fill-0, #0073E5)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_28_4088">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2.5 py-0 relative shrink-0"
      data-name="content"
    >
      <People />
    </div>
  );
}

function Icon2() {
  return (
    <div
      className="bg-[#b0d4f7] box-border content-stretch flex flex-col items-center justify-start opacity-80 px-0 py-2.5 relative rounded-[9999px] shrink-0"
      data-name="Icon"
    >
      <Content3 />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative rounded-[9999px] shrink-0"
      data-name="Button"
    >
      <Icon2 />
      <div
        className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[14px] text-center"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[16px]">Manage Shared Expenses</p>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Buttons"
    >
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Group1() {
  return (
    <div
      className="absolute bottom-0 left-[19.792%] right-[17.708%] top-[12.5%]"
      data-name="Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 18"
      >
        <g id="Group">
          <path
            d={svgPaths.p9273200}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div
      className="absolute bottom-0 contents left-[19.792%] right-[17.708%] top-[12.5%]"
      data-name="Group"
    >
      <Group1 />
    </div>
  );
}

function Group3() {
  return (
    <div
      className="absolute bottom-0 contents left-[19.792%] right-[17.708%] top-[12.5%]"
      data-name="Group"
    >
      <Group2 />
    </div>
  );
}

function TouchApp() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-5"
      data-name="Touch app"
    >
      <Group3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-0 relative w-full">
          <TouchApp />
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
            <p className="block leading-[20px] whitespace-pre">
              Explore Sample Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="basis-0 bg-[#c8e9c8] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <Content4 />
    </div>
  );
}

function Bottom() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Bottom"
    >
      <Button4 />
    </div>
  );
}

function Benifits() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Benifits"
    >
      <ContentHeader />
      <Buttons />
      <Bottom />
    </div>
  );
}

function ContentHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">
          Recent Transactions
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

function Logo() {
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
      className="box-border content-stretch flex flex-row font-['DM_Sans:semibold',_sans-serif] items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#18312d] w-full"
      data-name="Title"
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[16px] text-left">
        <p className="block leading-[20px]">Pay</p>
      </div>
      <div className="relative shrink-0 text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$5210.00</p>
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
        <p className="block leading-[20px]">Income</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Fri, 21 Feb 2025</p>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title />
      <Subtitle />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Logo />
      <Body1 />
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
      <ContentFrame1 />
    </div>
  );
}

function WalmartLogo1() {
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

function Logo1() {
  return (
    <div
      className="bg-[#f5eef4] box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[8px] relative rounded-[20px] shrink-0 size-10"
      data-name="Logo"
    >
      <WalmartLogo1 />
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['DM_Sans:semibold',_sans-serif] items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#18312d] w-full"
      data-name="Title"
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[16px] text-left">
        <p className="block leading-[20px]">Dinner with Amy</p>
      </div>
      <div className="relative shrink-0 text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">-$50.00</p>
      </div>
    </div>
  );
}

function Subtitle1() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] items-center justify-start leading-[0] not-italic opacity-70 p-0 relative shrink-0 text-[#18312d] text-[12px] w-full"
      data-name="Subtitle"
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-left">
        <p className="block leading-[20px]">Split</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Fri, 21 Feb 2025</p>
      </div>
    </div>
  );
}

function Body2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title1 />
      <Subtitle1 />
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Logo1 />
      <Body2 />
    </div>
  );
}

function TransactionCard1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-10 items-end justify-start px-0 py-4 relative shrink-0 w-[358px]"
      data-name="Transaction card"
    >
      <div className="absolute border-[#e9ecec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <ContentFrame2 />
    </div>
  );
}

function WalmartLogo2() {
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

function Logo2() {
  return (
    <div
      className="bg-[#f5eef4] box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[8px] relative rounded-[20px] shrink-0 size-10"
      data-name="Logo"
    >
      <WalmartLogo2 />
    </div>
  );
}

function Title2() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['DM_Sans:semibold',_sans-serif] items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-[#18312d] w-full"
      data-name="Title"
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[16px] text-left">
        <p className="block leading-[20px]">Trip with John</p>
      </div>
      <div className="relative shrink-0 text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">-$150.00</p>
      </div>
    </div>
  );
}

function Subtitle2() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] items-center justify-start leading-[0] not-italic opacity-70 p-0 relative shrink-0 text-[#18312d] text-[12px] w-full"
      data-name="Subtitle"
    >
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 text-left">
        <p className="block leading-[20px]">Split</p>
      </div>
      <div className="relative shrink-0 text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">Fri, 21 Feb 2025</p>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title2 />
      <Subtitle2 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Logo2 />
      <Body3 />
    </div>
  );
}

function TransactionCard2() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col gap-10 items-end justify-start px-0 py-4 relative shrink-0 w-[358px]"
      data-name="Transaction card"
    >
      <div className="absolute border-[#e9ecec] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <ContentFrame3 />
    </div>
  );
}

function Transactions() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      <TransactionCard />
      <TransactionCard1 />
      <TransactionCard2 />
    </div>
  );
}

function TrackManually() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Track manually"
    >
      <ContentHeader1 />
      <Transactions />
    </div>
  );
}

function ContentHeader2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">
          Start Tracking Manually
        </p>
      </div>
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-5" data-name="Add">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Add">
          <path
            d={svgPaths.p32a25c80}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Content5() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-0 relative w-full">
          <Add />
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
            <p className="block leading-[20px] whitespace-pre">Add Income</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="basis-0 bg-[#dee3e2] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <Content5 />
    </div>
  );
}

function CallSplit() {
  return (
    <div className="relative shrink-0 size-5" data-name="Call split">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Call split">
          <path
            d={svgPaths.p37706a80}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Content6() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-0 relative w-full">
          <CallSplit />
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
            <p className="block leading-[20px] whitespace-pre">
              Split Transaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="basis-0 bg-[#dee3e2] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <Content6 />
    </div>
  );
}

function Top() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Top"
    >
      <Button5 />
      <Button6 />
    </div>
  );
}

function Remove() {
  return (
    <div className="relative shrink-0 size-5" data-name="Remove">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Remove">
          <path
            d={svgPaths.p217e7400}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Content7() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-0 relative w-full">
          <Remove />
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
            <p className="block leading-[20px] whitespace-pre">Add Expense</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div
      className="basis-0 bg-[#dee3e2] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <Content7 />
    </div>
  );
}

function Target() {
  return (
    <div className="relative shrink-0 size-5" data-name="Target">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Target">
          <path
            d={svgPaths.p2113c700}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Content8() {
  return (
    <div className="relative shrink-0 w-full" data-name="content">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-4 py-0 relative w-full">
          <Target />
          <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-center text-nowrap">
            <p className="block leading-[20px] whitespace-pre">Set a Goal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div
      className="basis-0 bg-[#dee3e2] box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px px-0 py-3.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <Content8 />
    </div>
  );
}

function Bottom1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Bottom"
    >
      <Button7 />
      <Button8 />
    </div>
  );
}

function TrackManually1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Track manually"
    >
      <ContentHeader2 />
      <Top />
      <Bottom1 />
    </div>
  );
}

function Body4() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[648px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-4 top-[106px] w-[390px]"
      data-name="Body"
    >
      <HeaderTitle />
      <ExensesOverview />
      <DetailsCard />
      <Benifits />
      <TrackManually />
      <TrackManually1 />
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
          <g id="Vector_2"></g>
        </g>
      </svg>
    </div>
  );
}

function Group5() {
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
      <Group4 />
      <Group5 />
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

function Group6() {
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

function Group7() {
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
      <Group6 />
      <Group7 />
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

function Header1({ onNavigate }: RightProps) {
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
      <Header1 onNavigate={onNavigate} />
    </div>
  );
}

interface UserDashboardProps {
  onNavigate?: (screen: Screen) => void;
}

export default function UserDashboardWithoutLinkedAccounts({ onNavigate }: UserDashboardProps) {
  return (
    <div
      className="relative size-full"
      data-name="User Dashboard without linked accounts"
    >
      <Footer2 />
      <HeaderNav onNavigate={onNavigate} />
      <Body4 />
    </div>
  );
}