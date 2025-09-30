import svgPaths from "./svg-xh4tenn6ig";
import imgUnmannedCar from "figma:asset/6a2df664c11d44c7279b5ff120a5c72a0a128462.png";

function UnmannedCar() {
  return (
    <div
      className="h-[46.848px] relative shrink-0 w-20"
      data-name="unmanned car"
    >
      <div
        className="absolute bg-center bg-contain bg-no-repeat inset-0"
        data-name="unmanned car"
        style={{ backgroundImage: `url('${imgUnmannedCar}')` }}
      />
    </div>
  );
}

function Visibility1() {
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

function Amount1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0 w-full"
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
      <Visibility1 />
    </div>
  );
}

function Progress() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[303px]" />
      <div className="basis-0 bg-[#eef8ee] grow h-2 min-h-px min-w-px rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Category() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Category"
    >
      <UnmannedCar />
      <Amount1 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[0px] text-center text-nowrap">
        <p className="font-['DM_Sans:Regular',_sans-serif] font-normal leading-[24px] text-[16px] whitespace-pre">
          <span
            className="text-[#18312d]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Monthly Limit: $1000.
          </span>
          <span
            className="text-[rgba(32,65,60,0.3)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            00
          </span>
        </p>
      </div>
      <Progress />
    </div>
  );
}

function BalanceHeader1() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-lg shrink-0 w-full"
      data-name="Balance Header"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start px-4 py-2 relative w-full">
          <Category />
        </div>
      </div>
    </div>
  );
}

function Y() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-row font-['DM_Sans:regular',_sans-serif] items-center justify-between leading-[0] ml-[67.416px] mt-[168px] not-italic p-0 relative text-[#18312d] text-[10px] text-center text-nowrap w-[290.584px]"
      data-name="Y"
    >
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">Feb</p>
      </div>
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">Mar</p>
      </div>
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">Apr</p>
      </div>
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">May</p>
      </div>
      <div className="relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">Jun</p>
      </div>
    </div>
  );
}

function X() {
  return (
    <div
      className="[grid-area:1_/_1] box-border content-stretch flex flex-col font-['DM_Sans:regular',_sans-serif] gap-10 items-start justify-center leading-[0] ml-0 mt-0 not-italic p-0 relative text-[#18312d] text-[10px] text-center text-nowrap w-[34.87px]"
      data-name="X"
    >
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">$1000</p>
      </div>
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">$500</p>
      </div>
      <div className="opacity-70 relative shrink-0">
        <p className="block leading-[16px] text-nowrap whitespace-pre">0</p>
      </div>
    </div>
  );
}

function Spending() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full"
      data-name="Spending"
    >
      <div className="[grid-area:1_/_1] flex h-[157.612px] items-center justify-center ml-[42.855px] mt-[6.706px] relative w-[308.673px]">
        <div className="flex-none rotate-[338.186deg] skew-x-[356.502deg]">
          <div className="h-[41.365px] relative w-[318.492px]">
            <div
              className="absolute bottom-[-42.306%] left-[-4.852%] right-[-4.585%] top-[-41.542%]"
              style={
                { "--stroke-0": "rgba(155, 82, 149, 1)" } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 350 77"
              >
                <g
                  filter="url(#filter0_f_57_6199)"
                  id="Vector 20"
                  opacity="0.2"
                >
                  <path
                    d={svgPaths.p209d2d00}
                    stroke="var(--stroke-0, #9B5295)"
                    strokeWidth="7"
                  />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="76.0492"
                    id="filter0_f_57_6199"
                    width="348.548"
                    x="0.547017"
                    y="0.815845"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="shape"
                    />
                    <feGaussianBlur
                      result="effect1_foregroundBlur_57_6199"
                      stdDeviation="7"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex h-[157.878px] items-center justify-center ml-[41.844px] mt-0 relative w-[310.334px]">
        <div className="flex-none rotate-[338.186deg] skew-x-[356.502deg]">
          <div className="h-[40.888px] relative w-[320.444px]">
            <div
              className="absolute bottom-[-8.56%] left-[-1.093%] right-[-1.092%] top-[-8.562%]"
              style={
                { "--stroke-0": "rgba(155, 82, 149, 1)" } as React.CSSProperties
              }
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                role="presentation"
                viewBox="0 0 328 49"
              >
                <path
                  d={svgPaths.p753cc00}
                  id="Vector 11"
                  stroke="var(--stroke-0, #9B5295)"
                  strokeLinecap="round"
                  strokeWidth="7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Y />
      <X />
    </div>
  );
}

function Spending1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start leading-[0] p-0 relative shrink-0 w-full"
      data-name="Spending"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] not-italic relative shrink-0 text-[#000000] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Spending Trend</p>
      </div>
      <Spending />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-4" data-name="Add">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Add">
          <path
            d={svgPaths.p12feaf00}
            fill="var(--fill-0, #353945)"
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
      <Add />
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

function Content2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-2.5 py-0 relative shrink-0"
      data-name="content"
    >
      <FilterList />
    </div>
  );
}

function Button3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content2 />
    </div>
  );
}

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#000000] text-[18px] text-left">
        <p className="block leading-[24px]">Sub Categories</p>
      </div>
      <Button2 />
      <Button3 />
    </div>
  );
}

function LocalCarWash() {
  return (
    <div className="relative shrink-0 size-8" data-name="Local car wash">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g clipPath="url(#clip0_57_6213)" id="Local car wash">
          <g id="Vector"></g>
          <path
            d={svgPaths.p1421ee80}
            fill="var(--fill-0, #9B5295)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_6213">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Illustration() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <LocalCarWash />
    </div>
  );
}

function FavoriteBorder() {
  return (
    <div className="relative shrink-0 size-6" data-name="Favorite border">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_4681)" id="Favorite border">
          <g id="Vector"></g>
          <path
            d={svgPaths.pcf0b300}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_4681">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-end p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration />
      </div>
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic opacity-70 relative shrink-0 text-[#18312d] text-[16px] text-right">
        <p className="block leading-[24px]">Transportation</p>
      </div>
      <Icon />
    </div>
  );
}

function Transaction() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$10 of $50</p>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Car Wash</p>
      </div>
      <Transaction />
    </div>
  );
}

function ContainerHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header />
      <Title1 />
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader />
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="bg-[#eef8ee] relative rounded-2xl shrink-0 w-full"
      data-name="Details Card"
    >
      <div className="absolute border-[#20413c] border-[0.5px] border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[16px] relative w-full">
          <ContentFrame />
        </div>
      </div>
    </div>
  );
}

function Subcategories() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Subcategories"
    >
      <DetailsCard />
    </div>
  );
}

function LocalGasStation() {
  return (
    <div className="relative shrink-0 size-8" data-name="Local gas station">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g clipPath="url(#clip0_57_6206)" id="Local gas station">
          <g id="Vector"></g>
          <path
            d={svgPaths.p1e529800}
            fill="var(--fill-0, #9B5295)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_6206">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Illustration1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <LocalGasStation />
    </div>
  );
}

function FavoriteBorder1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Favorite border">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_4681)" id="Favorite border">
          <g id="Vector"></g>
          <path
            d={svgPaths.pcf0b300}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_4681">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-end p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder1 />
    </div>
  );
}

function Header1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration1 />
      </div>
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic opacity-70 relative shrink-0 text-[#18312d] text-[16px] text-right">
        <p className="block leading-[24px]">Transportation</p>
      </div>
      <Icon1 />
    </div>
  );
}

function Transaction1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$10 of $50</p>
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Fuel</p>
      </div>
      <Transaction1 />
    </div>
  );
}

function ContainerHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header1 />
      <Title2 />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader1 />
    </div>
  );
}

function DetailsCard1() {
  return (
    <div
      className="bg-[#eef8ee] relative rounded-2xl shrink-0 w-full"
      data-name="Details Card"
    >
      <div className="absolute border-[#20413c] border-[0.5px] border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[16px] relative w-full">
          <ContentFrame1 />
        </div>
      </div>
    </div>
  );
}

function Subcategories1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Subcategories"
    >
      <DetailsCard1 />
    </div>
  );
}

function LocalCarWash1() {
  return (
    <div className="relative shrink-0 size-8" data-name="Local car wash">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g clipPath="url(#clip0_57_6213)" id="Local car wash">
          <g id="Vector"></g>
          <path
            d={svgPaths.p1421ee80}
            fill="var(--fill-0, #9B5295)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_6213">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Illustration2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <LocalCarWash1 />
    </div>
  );
}

function FavoriteBorder2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Favorite border">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_4681)" id="Favorite border">
          <g id="Vector"></g>
          <path
            d={svgPaths.pcf0b300}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_4681">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-end p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder2 />
    </div>
  );
}

function Header2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration2 />
      </div>
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic opacity-70 relative shrink-0 text-[#18312d] text-[16px] text-right">
        <p className="block leading-[24px]">Transportation</p>
      </div>
      <Icon2 />
    </div>
  );
}

function Transaction2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$10 of</p>
      </div>
    </div>
  );
}

function TextField() {
  return (
    <div
      className="bg-[#eef8ee] box-border content-stretch flex flex-row items-center justify-start p-[8px] relative rounded-lg shrink-0 w-14"
      data-name="text field"
    >
      <div className="absolute border border-[#b2b9c7] border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[16px] text-left">
        <p className="block leading-[20px]">$50</p>
      </div>
    </div>
  );
}

function TextField1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative rounded-lg shrink-0"
      data-name="text field"
    >
      <TextField />
    </div>
  );
}

function Title3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Car Wash</p>
      </div>
      <Transaction2 />
      <TextField1 />
    </div>
  );
}

function ContainerHeader2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header2 />
      <Title3 />
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader2 />
    </div>
  );
}

function DetailsCard2() {
  return (
    <div
      className="bg-[#eef8ee] relative rounded-2xl shrink-0 w-full"
      data-name="Details Card"
    >
      <div className="absolute border-[#20413c] border-[0.5px] border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[16px] relative w-full">
          <ContentFrame2 />
        </div>
      </div>
    </div>
  );
}

function Subcategories2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Subcategories"
    >
      <DetailsCard2 />
    </div>
  );
}

function SubCategories() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Sub Categories"
    >
      <Subcategories />
      <Subcategories1 />
      <Subcategories2 />
    </div>
  );
}

function Transactions() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Transactions"
    >
      <Title />
      <SubCategories />
    </div>
  );
}

function Sub() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Sub"
    >
      <Transactions />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="section 1"
    >
      <Spending1 />
      <Sub />
    </div>
  );
}

function Section() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Section"
    >
      <BalanceHeader1 />
      <Section1 />
    </div>
  );
}

function Body() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="body"
    >
      <Section />
    </div>
  );
}

function Content3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Content"
    >
      <Body />
    </div>
  );
}

function Body1() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[738px] items-start justify-start left-0 overflow-x-clip overflow-y-auto p-0 top-[106px]"
      data-name="Body"
    >
      <Content3 />
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

function FavoriteBorder3() {
  return (
    <div className="relative shrink-0 size-6" data-name="Favorite border">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_4681)" id="Favorite border">
          <g id="Vector"></g>
          <path
            d={svgPaths.pcf0b300}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_4681">
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
      <FavoriteBorder3 />
    </div>
  );
}

function Header3() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full">
          <Left />
          <Right />
          <div
            className="absolute flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic text-[#18312d] text-[18px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]"
            style={{ left: "calc(50% - 0.5px)" }}
          >
            <p className="block leading-[24px] whitespace-pre">Groceries</p>
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
      <Header3 />
    </div>
  );
}

export default function GroceriesWithBudget() {
  return (
    <div className="relative size-full" data-name="Groceries with Budget">
      <HeaderNav />
      <Body1 />
    </div>
  );
}