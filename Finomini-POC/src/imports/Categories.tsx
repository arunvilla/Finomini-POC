import svgPaths from "./svg-e9lhbyz5qr";
import imgGoldenApple from "figma:asset/704985f4456deb0ba7e2c71560c89bd07c7a1eae.png";
import imgEcologyLightbulb from "figma:asset/016a0d94eba2f7234c024cc5ece6d27bd4d0caba.png";
import imgPopcorn3DGlassesAndMovieTickets from "figma:asset/45d16dd6f0b9da7ae7a14ae33a9261a4d5676835.png";
import imgUnmannedCar from "figma:asset/6a2df664c11d44c7279b5ff120a5c72a0a128462.png";
import imgCashAndCoins from "figma:asset/89305583e38371756425c875d75a65d6667339d9.png";
import imgBlueberryAndRaspberryPancakes from "figma:asset/8728476bf6ae9dbdf70d850fbba076a8c51e468f.png";

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
        <p className="font-['DM_Sans:Bold',_sans-serif] font-bold leading-[32px] text-[24px] whitespace-pre">
          <span
            className="text-[#18312d]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            $65,837.
          </span>
          <span
            className="text-[rgba(32,65,60,0.3)]"
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

function Income() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Income"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Income</p>
      </div>
      <Amount1 />
    </div>
  );
}

function Visibility2() {
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

function Amount2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="amount"
    >
      <div className="font-['DM_Sans:bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[0px] text-center text-nowrap">
        <p className="font-['DM_Sans:Bold',_sans-serif] font-bold leading-[32px] text-[24px] whitespace-pre">
          <span
            className="text-[#18312d]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            $5,837.
          </span>
          <span
            className="text-[rgba(32,65,60,0.3)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            00
          </span>
        </p>
      </div>
      <Visibility2 />
    </div>
  );
}

function Expense() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Expense"
    >
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic opacity-70 relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Expense</p>
      </div>
      <Amount2 />
    </div>
  );
}

function BalanceHeader1() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row items-center justify-start px-0 py-1 relative shrink-0 w-full"
      data-name="Balance Header"
    >
      <Income />
      <Expense />
    </div>
  );
}

function Categories() {
  return (
    <div className="relative shrink-0 size-[206px]" data-name="categories">
      <div className="absolute left-0 size-[206px] top-0">
        <div
          className="absolute bottom-[30.709%] left-1/2 right-0 top-0"
          style={
            { "--fill-0": "rgba(236, 201, 192, 1)" } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 103 143"
          >
            <path
              d={svgPaths.p38ca8100}
              fill="var(--fill-0, #ECC9C0)"
              id="Ellipse 45"
            />
          </svg>
        </div>
      </div>
      <div className="absolute left-0 size-[206px] top-0">
        <div
          className="absolute bottom-0 left-0 right-[3.785%] top-0"
          style={
            { "--fill-0": "rgba(181, 223, 201, 1)" } as React.CSSProperties
          }
        >
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 199 206"
          >
            <path
              d={svgPaths.p26f516f0}
              fill="var(--fill-0, #B5DFC9)"
              id="Ellipse 47"
            />
          </svg>
        </div>
      </div>
      <div className="absolute font-['DM_Sans:regular',_sans-serif] leading-[0] left-[154.5px] not-italic text-[#000000] text-[14px] text-center text-nowrap top-[69px] translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">20%</p>
      </div>
      <div className="absolute font-['DM_Sans:regular',_sans-serif] leading-[0] left-[63px] not-italic text-[#000000] text-[14px] text-center text-nowrap top-[123px] translate-x-[-50%]">
        <p className="block leading-[20px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function Tag() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="tag"
    >
      <div className="bg-[#b5dfc9] rounded shrink-0 size-2.5" />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Income</p>
      </div>
    </div>
  );
}

function Tag1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="tag"
    >
      <div className="bg-[#ecc9c0] rounded shrink-0 size-2.5" />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[12px] text-center text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Expense</p>
      </div>
    </div>
  );
}

function Tags() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="tags"
    >
      <Tag />
      <Tag1 />
    </div>
  );
}

function PieChart() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Pie Chart"
    >
      <Categories />
      <Tags />
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
        <p className="block leading-[16px] whitespace-pre">Categories</p>
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
        <p className="block leading-[16px] whitespace-pre">Sub Categories</p>
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
        <p className="block leading-[16px] whitespace-pre">Favorites</p>
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
        <p className="block leading-[16px] whitespace-pre">Custom</p>
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

function Content6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Expenses</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content6 />
    </div>
  );
}

function Content7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-3 py-0 relative shrink-0"
      data-name="content"
    >
      <div className="flex flex-col font-['DM_Sans:semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#18312d] text-[14px] text-center text-nowrap">
        <p className="block leading-[16px] whitespace-pre">Income</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start px-0 py-2.5 relative rounded-lg shrink-0"
      data-name="Button"
    >
      <div className="absolute border border-[#20413c] border-solid inset-0 pointer-events-none rounded-lg" />
      <Content7 />
    </div>
  );
}

function Categories1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-x-auto overflow-y-clip p-0 relative shrink-0 w-[374px]"
      data-name="Categories"
    >
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Categories2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Categories"
    >
      <Categories1 />
    </div>
  );
}

function GoldenApple() {
  return (
    <div className="h-10 relative shrink-0 w-[37px]" data-name="golden apple">
      <div
        className="[background-size:112.68%_99.8%] absolute bg-left bg-no-repeat bottom-0 left-0 right-[11.25%] top-0"
        data-name="golden apple"
        style={{ backgroundImage: `url('${imgGoldenApple}')` }}
      />
    </div>
  );
}

function Illustration() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <GoldenApple />
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

function Icon() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="icon"
    >
      <Favorite />
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration />
      </div>
      <Icon />
    </div>
  );
}

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Grocery</p>
      </div>
    </div>
  );
}

function ContainerHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header />
      <Title />
    </div>
  );
}

function Transaction() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px mr-[-16px] order-1 p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$100.00 of $150</p>
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

function Bar() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Bar"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[94px]" />
      <div className="basis-0 bg-[#20413c] grow h-2 min-h-px min-w-px opacity-20 rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Progress() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <Bar />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function ContentFrame() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader />
      <Body />
      <Progress />
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="bg-[#eef8ee] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[168px]"
      data-name="Details Card"
    >
      <ContentFrame />
    </div>
  );
}

function EcologyLightbulb() {
  return (
    <div
      className="h-[43.225px] relative shrink-0 w-[37px]"
      data-name="ecology lightbulb"
    >
      <div
        className="absolute bg-center bg-contain bg-no-repeat inset-0"
        data-name="ecology lightbulb"
        style={{ backgroundImage: `url('${imgEcologyLightbulb}')` }}
      />
    </div>
  );
}

function Illustration1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <EcologyLightbulb />
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

function Icon1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder />
    </div>
  );
}

function Header1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration1 />
      </div>
      <Icon1 />
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Utilities</p>
      </div>
    </div>
  );
}

function ContainerHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header1 />
      <Title1 />
    </div>
  );
}

function Transaction1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px mr-[-16px] order-1 p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$100.00 of $150</p>
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

function Bar1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Bar"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[94px]" />
      <div className="basis-0 bg-[#20413c] grow h-2 min-h-px min-w-px opacity-20 rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Progress1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <Bar1 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader1 />
      <Body1 />
      <Progress1 />
    </div>
  );
}

function DetailsCard1() {
  return (
    <div
      className="bg-[#ecc9c0] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[168px]"
      data-name="Details Card"
    >
      <ContentFrame1 />
    </div>
  );
}

function Popcorn3DGlassesAndMovieTickets() {
  return (
    <div
      className="h-[27.448px] relative shrink-0 w-[37px]"
      data-name="popcorn, 3D glasses, and movie tickets"
    >
      <div
        className="absolute bg-center bg-contain bg-no-repeat inset-0"
        data-name="popcorn, 3D glasses, and movie tickets"
        style={{
          backgroundImage: `url('${imgPopcorn3DGlassesAndMovieTickets}')`,
        }}
      />
    </div>
  );
}

function Illustration2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <Popcorn3DGlassesAndMovieTickets />
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

function Icon2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder1 />
    </div>
  );
}

function Header2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration2 />
      </div>
      <Icon2 />
    </div>
  );
}

function Title2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Entertainment</p>
      </div>
    </div>
  );
}

function ContainerHeader2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header2 />
      <Title2 />
    </div>
  );
}

function Transaction2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px mr-[-16px] order-1 p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$100.00 of $150</p>
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

function Bar2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px p-0 relative shrink-0"
      data-name="Bar"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[94px]" />
      <div className="basis-0 bg-[#20413c] grow h-2 min-h-px min-w-px opacity-20 rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Progress2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <Bar2 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">80%</p>
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
      <ContainerHeader2 />
      <Body2 />
      <Progress2 />
    </div>
  );
}

function DetailsCard2() {
  return (
    <div
      className="bg-[#e6f1fc] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[168px]"
      data-name="Details Card"
    >
      <ContentFrame2 />
    </div>
  );
}

function UnmannedCar() {
  return (
    <div
      className="h-[21.667px] relative shrink-0 w-[37px]"
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

function Illustration3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <UnmannedCar />
    </div>
  );
}

function Favorite1() {
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

function Icon3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="icon"
    >
      <Favorite1 />
    </div>
  );
}

function Header3() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration3 />
      </div>
      <Icon3 />
    </div>
  );
}

function Title3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Transportation</p>
      </div>
    </div>
  );
}

function ContainerHeader3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header3 />
      <Title3 />
    </div>
  );
}

function Transaction3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px mr-[-16px] order-1 p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$100.00 of $150</p>
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

function Bar3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Bar"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[94px]" />
      <div className="basis-0 bg-[#20413c] grow h-2 min-h-px min-w-px opacity-20 rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Progress3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <Bar3 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function ContentFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader3 />
      <Body3 />
      <Progress3 />
    </div>
  );
}

function DetailsCard3() {
  return (
    <div
      className="bg-[#e0c9de] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[168px]"
      data-name="Details Card"
    >
      <ContentFrame3 />
    </div>
  );
}

function CashAndCoins() {
  return (
    <div
      className="h-[24.03px] relative shrink-0 w-[37px]"
      data-name="Cash and coins"
    >
      <div
        className="absolute bg-center bg-contain bg-no-repeat inset-0"
        data-name="Cash and coins"
        style={{ backgroundImage: `url('${imgCashAndCoins}')` }}
      />
    </div>
  );
}

function Illustration4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <CashAndCoins />
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

function Icon4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder2 />
    </div>
  );
}

function Header4() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration4 />
      </div>
      <Icon4 />
    </div>
  );
}

function Title4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Income</p>
      </div>
    </div>
  );
}

function ContainerHeader4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header4 />
      <Title4 />
    </div>
  );
}

function Transaction4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px mr-[-16px] order-1 p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$100.00 of $150</p>
      </div>
    </div>
  );
}

function Body4() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-start justify-start pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction4 />
    </div>
  );
}

function Bar4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Bar"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[94px]" />
      <div className="basis-0 bg-[#20413c] grow h-2 min-h-px min-w-px opacity-20 rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Progress4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <Bar4 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function ContentFrame4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader4 />
      <Body4 />
      <Progress4 />
    </div>
  );
}

function DetailsCard4() {
  return (
    <div
      className="bg-[#b5dfc9] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[168px]"
      data-name="Details Card"
    >
      <ContentFrame4 />
    </div>
  );
}

function BlueberryAndRaspberryPancakes() {
  return (
    <div
      className="h-[20.159px] relative shrink-0 w-[37px]"
      data-name="Blueberry and raspberry pancakes"
    >
      <div
        className="absolute bg-center bg-contain bg-no-repeat inset-0"
        data-name="Blueberry and raspberry pancakes"
        style={{
          backgroundImage: `url('${imgBlueberryAndRaspberryPancakes}')`,
        }}
      />
    </div>
  );
}

function Illustration5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-center p-0 relative shrink-0"
      data-name="Illustration"
    >
      <BlueberryAndRaspberryPancakes />
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

function Icon5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2.5 grow items-center justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="icon"
    >
      <FavoriteBorder3 />
    </div>
  );
}

function Header5() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-row items-center self-stretch">
        <Illustration5 />
      </div>
      <Icon5 />
    </div>
  );
}

function Title5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-left">
        <p className="block leading-[24px]">Food</p>
      </div>
    </div>
  );
}

function ContainerHeader5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Header5 />
      <Title5 />
    </div>
  );
}

function Transaction5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between min-h-px min-w-px mr-[-16px] order-1 p-0 relative shrink-0"
      data-name="transaction"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[16px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">$100.00 of $150</p>
      </div>
    </div>
  );
}

function Body5() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-start justify-start pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction5 />
    </div>
  );
}

function Bar5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Bar"
    >
      <div className="bg-[#20413c] h-2 rounded-bl-[30px] rounded-tl-[30px] shrink-0 w-[94px]" />
      <div className="basis-0 bg-[#20413c] grow h-2 min-h-px min-w-px opacity-20 rounded-br-[30px] rounded-tr-[30px] shrink-0" />
    </div>
  );
}

function Progress5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="progress"
    >
      <Bar5 />
      <div className="font-['DM_Sans:regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#000000] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">80%</p>
      </div>
    </div>
  );
}

function ContentFrame5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ContainerHeader5 />
      <Body5 />
      <Progress5 />
    </div>
  );
}

function DetailsCard5() {
  return (
    <div
      className="bg-[#f1b8bd] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[16px] relative rounded-2xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] shrink-0 w-[168px]"
      data-name="Details Card"
    >
      <ContentFrame5 />
    </div>
  );
}

function Categories3() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-start flex gap-4 items-start justify-center px-0 py-1 relative shrink-0 w-full"
      data-name="Categories"
    >
      <DetailsCard />
      <DetailsCard1 />
      <DetailsCard2 />
      <DetailsCard3 />
      <DetailsCard4 />
      <DetailsCard5 />
    </div>
  );
}

function Section1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="section 1"
    >
      <Categories3 />
    </div>
  );
}

function Section() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Section"
    >
      <Categories2 />
      <Section1 />
    </div>
  );
}

function Body6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="body"
    >
      <BalanceHeader1 />
      <PieChart />
      <Section />
    </div>
  );
}

function Content8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Content"
    >
      <Body6 />
    </div>
  );
}

function Body7() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[738px] items-start justify-start left-0 overflow-x-clip overflow-y-auto pb-0 pt-6 px-0 top-[106px]"
      data-name="Body"
    >
      <Content8 />
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

function Search2() {
  return (
    <div className="relative shrink-0 size-6" data-name="Search">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_57_4685)" id="Search">
          <g id="Vector"></g>
          <path
            d={svgPaths.p730dd00}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_57_4685">
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
      <Search2 />
    </div>
  );
}

function Header6() {
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
            <p className="block leading-[24px] whitespace-pre">
              Spending Categories
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
      <Header6 />
    </div>
  );
}

export default function Categories4() {
  return (
    <div className="relative size-full" data-name="Categories">
      <HeaderNav />
      <Body7 />
    </div>
  );
}