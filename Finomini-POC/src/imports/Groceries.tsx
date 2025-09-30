import svgPaths from "./svg-g5f3tpedzb";

function LocalGasStation() {
  return (
    <div className="relative shrink-0 size-14" data-name="Local gas station">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 56 56"
      >
        <g clipPath="url(#clip0_57_7640)" id="Local gas station">
          <g id="Vector"></g>
          <path
            d={svgPaths.p21e69c00}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_7640">
            <rect fill="white" height="56" width="56" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Chart2() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      data-name="Chart 2"
    >
      <div className="[grid-area:1_/_1] flex h-[111.984px] items-center justify-center ml-0 mt-0 relative w-[111.984px]">
        <div className="flex-none rotate-[356.467deg]">
          <div className="relative size-[105.687px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 106 106"
            >
              <circle
                cx="52.8437"
                cy="52.8437"
                fill="var(--fill-0, #B5DFC9)"
                id="Ellipse 15"
                r="52.8437"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] ml-[3.156px] mt-[3.156px] relative size-[105.687px]">
        <div
          className="absolute bottom-1/2 left-1/2 right-[14.645%] top-0"
          style={{ "--fill-0": "rgba(15, 153, 80, 1)" } as React.CSSProperties}
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 39 53"
          >
            <path
              d={svgPaths.p2f6b4400}
              fill="var(--fill-0, #0F9950)"
              id="Ellipse 17"
            />
          </svg>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[88.384px] items-center justify-center ml-[12.098px] mt-[11.986px] relative w-[88.384px]">
        <div className="flex-none rotate-[9.469deg]">
          <div className="relative size-[76.798px]">
            <div className="absolute bottom-[-18.23%] left-[-13.021%] right-[-13.021%] top-[-7.813%]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 97 97"
              >
                <g filter="url(#filter0_d_57_7656)" id="Ellipse 12">
                  <circle
                    cx="48.3991"
                    cy="44.3991"
                    fill="var(--fill-0, white)"
                    r="38.3991"
                  />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="96.7982"
                    id="filter0_d_57_7656"
                    width="96.7982"
                    x="0"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="effect1_dropShadow_57_7656"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_57_7656"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] font-['Inter:bold',_sans-serif] h-6 ml-[55.432px] mt-[31.931px] not-italic relative text-[#000000] text-[0px] text-center translate-x-[-50%] w-[75px]">
        <p
          className="block font-['DM_Sans:Bold',_sans-serif] font-bold leading-[28px] mb-0 text-[20px]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          5%
        </p>
        <p
          className="block font-['DM_Sans:Regular',_sans-serif] font-normal leading-[16px] text-[8px]"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          of total Budgeted
        </p>
      </div>
    </div>
  );
}

function Name() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[11px] grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Name"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#303048] text-[16px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Budgeted</p>
      </div>
    </div>
  );
}

function Detail() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-0.5 items-end justify-start p-0 relative shrink-0"
      data-name="Detail"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#303048] text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$50</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Item"
    >
      <Name />
      <Detail />
    </div>
  );
}

function Name1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-[11px] grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Name"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#303048] text-[16px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Spent</p>
      </div>
    </div>
  );
}

function Detail1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-0.5 items-end justify-start p-0 relative shrink-0"
      data-name="Detail"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#303048] text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">$10</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Item"
    >
      <Name1 />
      <Detail1 />
    </div>
  );
}

function List() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="List"
    >
      <Item />
      <Item1 />
    </div>
  );
}

function Row2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Row 2"
    >
      <Chart2 />
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <List />
      </div>
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <LocalGasStation />
      <Row2 />
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-full"
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

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[18px] text-left">
        <p className="block leading-[24px]">Transactions</p>
      </div>
      <Button2 />
    </div>
  );
}

function CostcoLogo() {
  return (
    <div className="relative shrink-0 size-6" data-name="Costco logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_7644)" id="Costco logo">
          <g id="Group">
            <path
              d={svgPaths.p25f18300}
              fill="var(--fill-0, #005DAA)"
              id="Vector"
            />
            <path
              d={svgPaths.p139a4e80}
              fill="var(--fill-0, #005DAA)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p3a1a2840}
              fill="var(--fill-0, #005DAA)"
              id="Vector_3"
            />
            <path
              d={svgPaths.p27de4200}
              fill="var(--fill-0, #005DAA)"
              id="Vector_4"
            />
            <path
              d={svgPaths.pefe7020}
              fill="var(--fill-0, #005DAA)"
              id="Vector_5"
            />
          </g>
          <path
            d={svgPaths.p2e075000}
            fill="var(--fill-0, #005DAA)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p37029240}
            fill="var(--fill-0, #E31837)"
            id="Vector_7"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_7644">
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
      <CostcoLogo />
    </div>
  );
}

function Tag() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 w-6"
      data-name="Tag"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[10px] text-center w-full">
        <p className="block leading-[16px]">G</p>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Gas</p>
      </div>
      <Tag />
    </div>
  );
}

function Title2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <Title1 />
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
      <Title2 />
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
      <ContentFrame1 />
    </div>
  );
}

function CostcoLogo2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Costco logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_7644)" id="Costco logo">
          <g id="Group">
            <path
              d={svgPaths.p25f18300}
              fill="var(--fill-0, #005DAA)"
              id="Vector"
            />
            <path
              d={svgPaths.p139a4e80}
              fill="var(--fill-0, #005DAA)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p3a1a2840}
              fill="var(--fill-0, #005DAA)"
              id="Vector_3"
            />
            <path
              d={svgPaths.p27de4200}
              fill="var(--fill-0, #005DAA)"
              id="Vector_4"
            />
            <path
              d={svgPaths.pefe7020}
              fill="var(--fill-0, #005DAA)"
              id="Vector_5"
            />
          </g>
          <path
            d={svgPaths.p2e075000}
            fill="var(--fill-0, #005DAA)"
            id="Vector_6"
          />
          <path
            d={svgPaths.p37029240}
            fill="var(--fill-0, #E31837)"
            id="Vector_7"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_7644">
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
      <CostcoLogo2 />
    </div>
  );
}

function Tag2() {
  return (
    <div
      className="bg-[#c8e9c8] box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 w-6"
      data-name="Tag"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[10px] text-center w-full">
        <p className="block leading-[16px]">G</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div
      className="box-border content-stretch flex flex-row h-[22px] items-center justify-center px-3 py-0 relative rounded-[100px] shrink-0"
      data-name="Badge"
    >
      <div className="absolute border border-[#bc8bb8] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#9b5295] text-[12px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Split</p>
      </div>
    </div>
  );
}

function Title5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-4 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Gas</p>
      </div>
      <Tag2 />
      <Badge />
    </div>
  );
}

function Title6() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <Title5 />
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-nowrap text-right">
        <p className="block leading-[16px] whitespace-pre">-$50.00</p>
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
        <p className="block leading-[20px]">Account **4526</p>
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
      <Title6 />
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
      <Body2 />
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
      <TransactionCard />
      <TransactionCard2 />
      <TransactionCard />
    </div>
  );
}

function Transactions1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      <Title />
      <Transactions />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="section 1"
    >
      <Transactions1 />
    </div>
  );
}

function Section() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Section"
    >
      <DetailsCard />
      <Section1 />
    </div>
  );
}

function Body4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="body"
    >
      <Section />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Content"
    >
      <Body4 />
    </div>
  );
}

function Body5() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[738px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-0 top-[106px]"
      data-name="Body"
    >
      <Content2 />
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

function Favorite() {
  return (
    <div className="relative shrink-0 size-6" data-name="Favorite">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_4689)" id="Favorite">
          <g id="Vector"></g>
          <path
            d={svgPaths.p24e06320}
            fill="var(--fill-0, #D31B2B)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_4689">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Right() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-6 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="right"
    >
      <Settings />
      <Favorite />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Left />
          <Right />
          <div
            className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#18312d] text-[18px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{ left: "calc(50% - 1px)" }}
          >
            <p className="block leading-[24px] whitespace-pre">Fuel</p>
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

export default function Groceries() {
  return (
    <div className="relative size-full" data-name="Groceries">
      <HeaderNav />
      <Body5 />
    </div>
  );
}