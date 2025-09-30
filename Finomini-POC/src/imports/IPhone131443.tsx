import svgPaths from "./svg-qll5vuxvpj";
import imgDepth5Frame2 from "figma:asset/dced20ee7198c91005d34d154b2594e6f3ebd377.png";

function Depth5Frame2() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat rounded-[64px] shrink-0 size-32"
      data-name="Depth 5, Frame 2"
      style={{ backgroundImage: `url('${imgDepth5Frame2}')` }}
    />
  );
}

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <div className="basis-0 font-['DM_Sans:semibold',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[18px] text-center">
        <p className="block leading-[24px]">Taylor Saver</p>
      </div>
    </div>
  );
}

function ContainerHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Container Header"
    >
      <Depth5Frame2 />
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
      <div className="basis-0 font-['DM_Sans:regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic opacity-70 relative shrink-0 text-[#18312d] text-[16px] text-center">
        <p className="block leading-[24px]">taylorsaver@gmail.com</p>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div
      className="box-border content-stretch flex flex-row-reverse items-center justify-center pl-0 pr-4 py-0 relative shrink-0 w-full"
      data-name="Body"
    >
      <Transaction />
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
      <Body />
    </div>
  );
}

function DetailsCard() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-2xl shrink-0 w-full"
      data-name="Details Card"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start p-[16px] relative w-full">
          <ContentFrame />
        </div>
      </div>
    </div>
  );
}

function ContentHeader() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-start p-0 relative shrink-0 w-[358px]"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Account</p>
      </div>
    </div>
  );
}

function PersonOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="Person outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5753)" id="Person outline">
          <g id="Vector"></g>
          <path
            d={svgPaths.pbc0d500}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5753">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
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
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Personal Info</p>
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

function Body1() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title1 />
      <KeyboardArrowRight />
    </div>
  );
}

function ContentFrame1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <PersonOutline />
      <Body1 />
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
      <ContentFrame1 />
    </div>
  );
}

function LockOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="Lock outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5803)" id="Lock outline">
          <g id="Vector"></g>
          <path
            d={svgPaths.p12644480}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5803">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
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
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Change Password</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight1() {
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

function Body2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title2 />
      <KeyboardArrowRight1 />
    </div>
  );
}

function ContentFrame2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <LockOutline />
      <Body2 />
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
      <ContentFrame2 />
    </div>
  );
}

function FaceId() {
  return (
    <div className="relative shrink-0 size-6" data-name="Face ID">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Face ID">
          <path
            d={svgPaths.p1c01ae00}
            fill="var(--fill-0, #353945)"
            id="face id"
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
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">
          Login Method (Biometric, PIN, MFA)
        </p>
      </div>
    </div>
  );
}

function KeyboardArrowRight2() {
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

function Body3() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title3 />
      <KeyboardArrowRight2 />
    </div>
  );
}

function ContentFrame3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <FaceId />
      <Body3 />
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
      <ContentFrame3 />
    </div>
  );
}

function InsertLink() {
  return (
    <div className="relative shrink-0 size-6" data-name="Insert link">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5760)" id="Insert link">
          <g id="Vector"></g>
          <path
            d={svgPaths.p31f8ad00}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5760">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
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
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Linked Accounts</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight3() {
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

function Body4() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title4 />
      <KeyboardArrowRight3 />
    </div>
  );
}

function ContentFrame4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <InsertLink />
      <Body4 />
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
      <ContentFrame4 />
    </div>
  );
}

function Devices() {
  return (
    <div className="relative shrink-0 size-6" data-name="Devices">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5743)" id="Devices">
          <g id="Vector"></g>
          <path
            d={svgPaths.p648a870}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5743">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
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
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Connected Devices</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight4() {
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

function Body5() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title5 />
      <KeyboardArrowRight4 />
    </div>
  );
}

function ContentFrame5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Devices />
      <Body5 />
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
      <ContentFrame5 />
    </div>
  );
}

function ErrorOutline() {
  return (
    <div className="relative shrink-0 size-6" data-name="Error outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Error outline">
          <path
            d={svgPaths.p5671dc0}
            fill="var(--fill-0, #353945)"
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
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Delete/Deactivate Account</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight5() {
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

function Body6() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title6 />
      <KeyboardArrowRight5 />
    </div>
  );
}

function ContentFrame6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ErrorOutline />
      <Body6 />
    </div>
  );
}

function ListItem5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <ContentFrame6 />
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
    </div>
  );
}

function Account() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Account"
    >
      <ContentHeader />
      <List />
    </div>
  );
}

function ContentHeader1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 h-6 items-center justify-start p-0 relative shrink-0 w-[358px]"
      data-name="Content Header"
    >
      <div className="font-['DM_Sans:semibold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#18312d] text-[18px] text-center text-nowrap">
        <p className="block leading-[24px] whitespace-pre">{`Finance & Preferences`}</p>
      </div>
    </div>
  );
}

function PersonOutline1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Person outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5753)" id="Person outline">
          <g id="Vector"></g>
          <path
            d={svgPaths.pbc0d500}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5753">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
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
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Personal Info</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight6() {
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
      <KeyboardArrowRight6 />
    </div>
  );
}

function ContentFrame7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <PersonOutline1 />
      <Body7 />
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
      <ContentFrame7 />
    </div>
  );
}

function LockOutline1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Lock outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5803)" id="Lock outline">
          <g id="Vector"></g>
          <path
            d={svgPaths.p12644480}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5803">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Title8() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Change Password</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight7() {
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

function Body8() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title8 />
      <KeyboardArrowRight7 />
    </div>
  );
}

function ContentFrame8() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <LockOutline1 />
      <Body8 />
    </div>
  );
}

function ListItem7() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame8 />
    </div>
  );
}

function FaceId1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Face ID">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Face ID">
          <path
            d={svgPaths.p1c01ae00}
            fill="var(--fill-0, #353945)"
            id="face id"
          />
        </g>
      </svg>
    </div>
  );
}

function Title9() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">
          Login Method (Biometric, PIN, MFA)
        </p>
      </div>
    </div>
  );
}

function KeyboardArrowRight8() {
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

function Body9() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title9 />
      <KeyboardArrowRight8 />
    </div>
  );
}

function ContentFrame9() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <FaceId1 />
      <Body9 />
    </div>
  );
}

function ListItem8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame9 />
    </div>
  );
}

function InsertLink1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Insert link">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5760)" id="Insert link">
          <g id="Vector"></g>
          <path
            d={svgPaths.p31f8ad00}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5760">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Title10() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Linked Accounts</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight9() {
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

function Body10() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title10 />
      <KeyboardArrowRight9 />
    </div>
  );
}

function ContentFrame10() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <InsertLink1 />
      <Body10 />
    </div>
  );
}

function ListItem9() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame10 />
    </div>
  );
}

function Devices1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Devices">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_15_5743)" id="Devices">
          <g id="Vector"></g>
          <path
            d={svgPaths.p648a870}
            fill="var(--fill-0, #353945)"
            id="Vector_2"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_5743">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Title11() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Connected Devices</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight10() {
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

function Body11() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title11 />
      <KeyboardArrowRight10 />
    </div>
  );
}

function ContentFrame11() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <Devices1 />
      <Body11 />
    </div>
  );
}

function ListItem10() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <div className="absolute border-[#bac4c3] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
      <ContentFrame11 />
    </div>
  );
}

function ErrorOutline1() {
  return (
    <div className="relative shrink-0 size-6" data-name="Error outline">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Error outline">
          <path
            d={svgPaths.p5671dc0}
            fill="var(--fill-0, #353945)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Title12() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0"
      data-name="Title"
    >
      <div
        className="font-['DM_Sans:regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#18312d] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[24px]">Delete/Deactivate Account</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight11() {
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

function Body12() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Body"
    >
      <Title12 />
      <KeyboardArrowRight11 />
    </div>
  );
}

function ContentFrame12() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Content frame"
    >
      <ErrorOutline1 />
      <Body12 />
    </div>
  );
}

function ListItem11() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-center justify-start p-[16px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[358px]"
      data-name="List item"
    >
      <ContentFrame12 />
    </div>
  );
}

function List1() {
  return (
    <div
      className="bg-[#f6f7f9] box-border content-stretch flex flex-col gap-2 items-start justify-start px-0 py-2 relative rounded-2xl shrink-0 w-[358px]"
      data-name="List"
    >
      <ListItem6 />
      <ListItem7 />
      <ListItem8 />
      <ListItem9 />
      <ListItem10 />
      <ListItem11 />
    </div>
  );
}

function Account1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="Account"
    >
      <ContentHeader1 />
      <List1 />
    </div>
  );
}

function List2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0"
      data-name="List"
    >
      <Account />
      <Account1 />
    </div>
  );
}

function Body13() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="body"
    >
      <DetailsCard />
      <List2 />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start px-4 py-0 relative shrink-0 w-[390px]"
      data-name="Content"
    >
      <Body13 />
    </div>
  );
}

function Body14() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-col gap-6 h-[738px] items-start justify-start left-0 overflow-x-clip overflow-y-auto p-0 top-[106px]"
      data-name="Body"
    >
      <Content1 />
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
            <div
              className="absolute inset-0"
              style={{ "--fill-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}
            />
          </div>
          <div
            className="h-[12.328px] relative shrink-0 w-[17.142px]"
            data-name="Wifi"
          >
            <div
              className="absolute inset-0"
              style={{ "--fill-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}
            />
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
            style={{ left: "calc(50% - 1px)" }}
          >
            <p className="block leading-[24px] whitespace-pre">User Settings</p>
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

export default function IPhone131443() {
  return (
    <div className="relative size-full" data-name="iPhone 13 & 14 - 43">
      <HeaderNav />
      <Body14 />
    </div>
  );
}