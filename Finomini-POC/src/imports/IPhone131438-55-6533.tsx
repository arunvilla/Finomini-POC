import svgPaths from "./svg-6gucm88tuq";

function CheckBox() {
  return (
    <div className="relative shrink-0 size-5" data-name="Check box">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g clipPath="url(#clip0_55_6543)" id="Check box">
          <g id="Vector"></g>
          <path
            d={svgPaths.p6990300}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_55_6543">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-5" data-name="Keyboard arrow down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Keyboard arrow down">
          <path
            d={svgPaths.p377f4400}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function TextField() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg shrink-0 w-full"
      data-name="text field"
    >
      <div className="absolute border border-[#b2b9c7] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2 py-3 relative w-full">
          <CheckBox />
          <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[16px] text-left">
            <p className="block leading-[24px]">Account ****4526</p>
          </div>
          <KeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}

function DropDown() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 h-12 items-start justify-center p-0 relative rounded-lg shrink-0 w-full"
      data-name="drop-down"
    >
      <TextField />
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
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="amount"
    >
      <div className="font-['DM_Sans:bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[0px] text-center text-nowrap">
        <p className="leading-[40px] text-[32px] whitespace-pre">
          <span className="text-[#18312d]">$837.</span>
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

function NetWorth() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Net worth"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">TOTAL EXPENSES</p>
      </div>
      <Amount />
    </div>
  );
}

function VisaWhite1() {
  return (
    <div className="h-[13px] relative shrink-0 w-6" data-name="Visa (White)">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 13"
      >
        <g id="Visa (White)">
          <g id="Union">
            <path d={svgPaths.p31c12b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p35506e00} fill="var(--fill-0, white)" />
            <path
              clipRule="evenodd"
              d={svgPaths.p1ed1cc00}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
            />
            <path d={svgPaths.p2500c480} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function PaymentGateway1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[15px] h-6 items-center justify-start p-0 relative shrink-0"
      data-name="Payment Gateway"
    >
      <VisaWhite1 />
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">**** 4763</p>
      </div>
    </div>
  );
}

function Balance1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Balance"
    >
      <Title1 />
    </div>
  );
}

function LeftTopFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-end p-0 relative shrink-0"
      data-name="Left Top Frame"
    >
      <Balance1 />
    </div>
  );
}

function Card1() {
  return (
    <div
      className="absolute bg-gradient-to-b from-[#c35033] h-[68px] left-0 rounded-bl-[12px] rounded-tl-[12px] to-[#d31b2b] top-0 w-[85px]"
      data-name="Card"
    >
      <div className="box-border content-stretch flex flex-col gap-4 h-[68px] items-start justify-center overflow-clip px-4 py-0 relative w-[85px]">
        <PaymentGateway1 />
        <LeftTopFrame1 />
      </div>
      <div className="absolute border border-[rgba(255,255,255,0.6)] border-solid inset-0 pointer-events-none rounded-bl-[12px] rounded-tl-[12px] shadow-[0px_1px_4px_0px_rgba(53,57,69,0.16),0px_4px_8px_0px_rgba(53,57,69,0.12)]" />
    </div>
  );
}

function Card2() {
  return (
    <div
      className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[85px]"
      data-name="Card"
    >
      <Card1 />
    </div>
  );
}

function Button1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 h-full items-start justify-start p-0 relative shrink-0"
      data-name="button"
    >
      <Card2 />
    </div>
  );
}

function BalanceHeader() {
  return (
    <div
      className="bg-[#fafdfa] relative rounded-lg shadow-[0px_0px_2px_0px_rgba(53,57,69,0.16),0px_2px_4px_0px_rgba(53,57,69,0.12)] shrink-0 w-full"
      data-name="Balance Header"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start pl-4 pr-0 py-1 relative w-full">
          <NetWorth />
          <div className="flex flex-row items-center self-stretch">
            <Button1 />
          </div>
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
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Accounts</p>
      </div>
      <DropDown />
      <BalanceHeader />
    </div>
  );
}

function FilterList() {
  return (
    <div className="relative shrink-0 size-4" data-name="Filter list">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Filter list">
          <path
            d={svgPaths.p1ee01d00}
            fill="var(--fill-0, #20413C)"
            id="Vector"
          />
        </g>
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
      <FilterList />
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

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">All</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="bg-[#20413c] box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <Content2 />
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Recurring</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Refunds</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content4 />
    </div>
  );
}

function Content5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Uncategorized</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content5 />
    </div>
  );
}

function Categories() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0"
      data-name="Categories"
    >
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Categories1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Categories"
    >
      <Button2 />
      <div className="flex h-[36px] items-center justify-center relative shrink-0 w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-9">
            <div
              className="absolute bottom-[-0.5px] left-[-1.389%] right-[-1.389%] top-[-0.5px]"
              style={
                {
                  "--stroke-0": "rgba(178, 185, 199, 1)",
                } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 38 2"
              >
                <path
                  d="M1 1H37"
                  id="Line 1"
                  stroke="var(--stroke-0, #B2B9C7)"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Categories />
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

function Title2() {
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

function Title3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <Title2 />
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

function Body() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title3 />
      <Subtitle />
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Logo />
      <Body />
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
      <ContentFrame />
    </div>
  );
}

function Transactions() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      {[...Array(5).keys()].map((_, i) => (
        <TransactionCard key={i} />
      ))}
    </div>
  );
}

function Transactions1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Transactions</p>
      </div>
      <Categories1 />
      <Transactions />
    </div>
  );
}

function Content6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start px-4 py-0 relative w-full">
          <Accounts />
          <Transactions1 />
        </div>
      </div>
    </div>
  );
}

function Body5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[648px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-0 top-[106px] w-[390px]"
      data-name="Body"
    >
      <Content6 />
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
      <Group />
      <Group1 />
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

function Header() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Left />
          <div
            className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#18312d] text-[18px] text-center top-1/2 translate-x-[-50%] translate-y-[-50%] w-[143px]"
            style={{ left: "calc(50% - 0.5px)" }}
          >
            <p className="block leading-[24px]">Transactions</p>
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
      <Header />
    </div>
  );
}

export default function IPhone131438() {
  return (
    <div className="relative size-full" data-name="iPhone 13 & 14 - 38">
      <Footer2 />
      <HeaderNav />
      <Body5 />
    </div>
  );
}