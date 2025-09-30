import svgPaths from "./svg-andkyf65ak";

function Title() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Merchant</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Walmart</p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title />
      <Text />
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body />
    </div>
  );
}

function ListItem() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame />
    </div>
  );
}

function Title1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Account</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">**** 4657</p>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title1 />
      <Text1 />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body1 />
    </div>
  );
}

function ListItem1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame1 />
    </div>
  );
}

function Title2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Category</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Grocery</p>
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

function Body2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title2 />
      <Text2 />
      <KeyboardArrowDown1 />
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body2 />
    </div>
  );
}

function ListItem2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame2 />
    </div>
  );
}

function Title3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Date</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Apr 10</p>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title3 />
      <Text3 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body3 />
    </div>
  );
}

function ListItem3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame3 />
    </div>
  );
}

function Title4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Notes</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(32,65,60,0.3)] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Add</p>
      </div>
    </div>
  );
}

function Body4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title4 />
      <Text4 />
    </div>
  );
}

function ContentFrame4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body4 />
    </div>
  );
}

function ListItem4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame4 />
    </div>
  );
}

function Title5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Tags</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(32,65,60,0.3)] text-left text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Add</p>
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

function Body5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title5 />
      <Text5 />
      <KeyboardArrowDown2 />
    </div>
  );
}

function ContentFrame5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body5 />
    </div>
  );
}

function ListItem5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame5 />
    </div>
  );
}

function Title6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-center p-0 shrink-0"
      data-name="Text"
    />
  );
}

function Toggle() {
  return (
    <div className="h-8 relative shrink-0 w-16" data-name="Toggle">
      <div
        className="absolute bottom-[-3.125%] left-0 right-0 top-0"
        style={{ "--fill-0": "rgba(233, 236, 236, 1)" } as React.CSSProperties}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 64 33"
        >
          <g id="Toggle">
            <path d={svgPaths.pbf79a00} fill="var(--fill-0, #E9ECEC)" />
            <g filter="url(#filter0_dd_55_7148)" id="Ellipse 1">
              <circle cx="16" cy="16" fill="var(--fill-0, white)" r="12" />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="32"
              id="filter0_dd_55_7148"
              width="32"
              x="0"
              y="1"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.207843 0 0 0 0 0.223529 0 0 0 0 0.270588 0 0 0 0.12 0"
              />
              <feBlend
                in2="BackgroundImageFix"
                mode="normal"
                result="effect1_dropShadow_55_7148"
              />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.207843 0 0 0 0 0.223529 0 0 0 0 0.270588 0 0 0 0.16 0"
              />
              <feBlend
                in2="effect1_dropShadow_55_7148"
                mode="normal"
                result="effect2_dropShadow_55_7148"
              />
              <feBlend
                in="SourceGraphic"
                in2="effect2_dropShadow_55_7148"
                mode="normal"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Body6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title6 />
      <Text6 />
      <Toggle />
    </div>
  );
}

function ContentFrame6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body6 />
    </div>
  );
}

function ListItem6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame6 />
    </div>
  );
}

function Title7() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:semibold',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[20px]">Merchant Trend</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight() {
  return (
    <div className="relative shrink-0 size-6" data-name="Keyboard arrow right">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Keyboard arrow right">
          <path
            d={svgPaths.p3cf14e00}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Body7() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title7 />
      <KeyboardArrowRight />
    </div>
  );
}

function ContentFrame7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Body7 />
    </div>
  );
}

function ListItem7() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <ContentFrame7 />
    </div>
  );
}

function List() {
  return (
    <div
      className="bg-[#f6f7f9] box-border content-stretch flex flex-col gap-2 items-start justify-start px-0 py-2 relative rounded-2xl shrink-0 w-[358px]"
      data-name="List"
    >
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Section() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Section"
    >
      <List />
    </div>
  );
}

function Body8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="body"
    >
      <Section />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Content"
    >
      <Body8 />
    </div>
  );
}

function Body9() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[648px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-0 top-[106px]"
      data-name="Body"
    >
      <Content1 />
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
            className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#18312d] text-[18px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{ left: "calc(50% - 0.5px)" }}
          >
            <p className="block leading-[24px] whitespace-pre">
              Transaction Details
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
      <Header />
    </div>
  );
}

export default function IPhone131445() {
  return (
    <div className="relative size-full" data-name="iPhone 13 & 14 - 45">
      <Footer2 />
      <HeaderNav />
      <Body9 />
    </div>
  );
}