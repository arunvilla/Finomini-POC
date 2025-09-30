import svgPaths from "./svg-uc5r6yoopi";
import imgProfilePictureOfAWoman from "figma:asset/ae8f7df079e6f0a9097298fcde096d1fd1331c69.png";

interface ContainerProps {
  onBack?: () => void;
}

function Container({ onBack }: ContainerProps) {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <button
        onClick={onBack}
        className="flex flex-col font-['Material_Icons:Regular',_'Noto_Sans:Regular',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#000000] text-[24px] text-left text-nowrap"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}
      >
        <p className="block leading-[24px] whitespace-pre">arrow_back</p>
      </button>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="absolute bottom-0 box-border content-stretch flex flex-col items-end justify-start p-0 right-9 top-0"
      data-name="Container"
    >
      <div
        className="flex flex-col font-['Material_Icons:Regular',_'Noto_Sans:Regular',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#000000] text-[14px] text-nowrap text-right"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}
      >
        <p className="block leading-[20px] whitespace-pre">
          signal_cellular_alt
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="flex flex-col font-['Material_Icons:Regular',_'Noto_Sans:Regular',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#000000] text-[14px] text-nowrap text-right"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}
      >
        <p className="block leading-[20px] whitespace-pre">wifi</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div
      className="absolute bottom-0 box-border content-stretch flex flex-col items-start justify-center left-3.5 pl-1 pr-0 py-0 top-0"
      data-name="Margin"
    >
      <Container2 />
    </div>
  );
}

function Container3() {
  return (
    <div
      className="box-border content-stretch flex flex-col h-full items-end justify-start p-0 relative"
      data-name="Container"
    >
      <div
        className="flex flex-col font-['Material_Icons:Regular',_'Noto_Sans:Regular',_sans-serif] justify-center leading-[0] relative shrink-0 text-[#000000] text-[14px] text-nowrap text-right"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}
      >
        <p className="block leading-[20px] whitespace-pre">battery_full</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-5 relative shrink-0 w-[50px]" data-name="Container">
      <Container1 />
      <Margin />
      <div className="absolute bottom-[3px] flex items-center justify-center right-[-3px] top-[3px]">
        <div className="flex-none h-5 rotate-[270deg] w-3.5">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[0.5px] items-end justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">9:41</p>
      </div>
      <Container4 />
    </div>
  );
}

function Container6({ onBack }: ContainerProps) {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container onBack={onBack} />
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Heading 1"
    >
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[24px] text-center w-full">
        <p className="block leading-[32px]">Personal Information</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-gray-500 w-full">
        <p className="block leading-[24px]">Manage your personal details</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading1 />
      <Container7 />
    </div>
  );
}

function ProfilePictureOfAWoman() {
  return (
    <div
      className="[background-size:100%_100%] bg-no-repeat bg-top-left max-w-32 rounded-[9999px] shrink-0 size-32"
      data-name="Profile picture of a woman"
      style={{ backgroundImage: `url('${imgProfilePictureOfAWoman}')` }}
    />
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-5" data-name="Component 1">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Component 1">
          <path
            d={svgPaths.p33b85d00}
            fill="var(--fill-0, white)"
            id="Vector"
          />
          <path
            d={svgPaths.p3ec1680}
            fill="var(--fill-0, white)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div
      className="absolute bg-[#000000] bottom-1 box-border content-stretch flex flex-col items-start justify-start p-[6px] right-1 rounded-[9999px] w-8"
      data-name="Background"
    >
      <Component1 />
    </div>
  );
}

function Container9() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start order-2 p-0 relative shrink-0"
      data-name="Container"
    >
      <ProfilePictureOfAWoman />
      <Background />
    </div>
  );
}

function Component2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center px-[25px] py-[9px] relative rounded-lg shrink-0"
      data-name="Component 2"
    >
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-lg" />
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-gray-700 text-nowrap">
        <p className="block leading-[24px] whitespace-pre">Change Photo</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start order-1 pb-0 pt-4 px-0 relative shrink-0"
      data-name="Button:margin"
    >
      <Component2 />
    </div>
  );
}

function Container10() {
  return (
    <div
      className="box-border content-stretch flex flex-col-reverse items-center justify-start pb-0 pt-2 px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container9 />
      <ButtonMargin />
    </div>
  );
}

function Heading2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Heading 2"
    >
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[18px] text-left w-full">
        <p className="block leading-[28px]">Personal Details</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-700 text-left w-full">
        <p className="block leading-[20px]">First Name</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start overflow-auto p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[20px]">Taylor</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[13px] py-[9px] relative w-full">
          <Container11 />
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container12() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative self-stretch shrink-0"
      data-name="Container"
    >
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-700 text-left w-full">
        <p className="block leading-[20px]">Last Name</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start overflow-auto p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[20px]">Saver</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[13px] py-[9px] relative w-full">
          <Container13 />
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container14() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative self-stretch shrink-0"
      data-name="Container"
    >
      <Label1 />
      <Input1 />
    </div>
  );
}

function Container15() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-center p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container12 />
      <Container14 />
    </div>
  );
}

function Label2() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-700 text-left w-full">
        <p className="block leading-[20px]">Email Address</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start overflow-auto p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[20px]">taylorsaver@gmail.com</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[13px] py-[9px] relative w-full">
          <Container16 />
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container17() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Label2 />
      <Input2 />
    </div>
  );
}

function Label3() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-700 text-left w-full">
        <p className="block leading-[20px]">Phone Number</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start overflow-auto p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[14px] text-left w-full">
        <p className="block leading-[20px]">$1 (555)-193-4567</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[13px] py-[9px] relative w-full">
          <Container18 />
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container19() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Label3 />
      <Input3 />
    </div>
  );
}

function Label4() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Label"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-700 text-left w-full">
        <p className="block leading-[20px]">Date of Birth</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div
      className="box-border content-stretch flex flex-row font-['Inter:Regular',_sans-serif] font-normal gap-px items-start justify-start leading-[0] not-italic px-px py-0 relative self-stretch shrink-0 text-[#000000] text-[14px] text-left text-nowrap"
      data-name="Paragraph"
    >
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[20px] text-nowrap whitespace-pre">06</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[20px] text-nowrap whitespace-pre">/</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[20px] text-nowrap whitespace-pre">18</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[20px] text-nowrap whitespace-pre">/</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="block leading-[20px] text-nowrap whitespace-pre">1996</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px overflow-clip p-0 relative shrink-0"
      data-name="Container"
    >
      <Paragraph />
    </div>
  );
}

function Component3() {
  return (
    <div
      className="h-[13.125px] relative shrink-0 w-3.5"
      data-name="Component 1"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        role="presentation"
        viewBox="0 0 14 14"
      >
        <g id="Component 1">
          <path
            d={svgPaths.p2e800100}
            fill="var(--fill-0, black)"
            id="Vector"
          />
          <g id="Vector_2"></g>
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start overflow-clip pb-[2.875px] pt-0.5 px-0.5 relative shrink-0 size-[18px]"
      data-name="image fill"
    >
      <Component3 />
    </div>
  );
}

function Image() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 size-[18px]"
      data-name="Image"
    >
      <ImageFill />
    </div>
  );
}

function Container21() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container20 />
      <Image />
    </div>
  );
}

function Input4() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-md shrink-0 w-full"
      data-name="Input"
    >
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-[13px] py-[9px] relative w-full">
          <Container21 />
        </div>
      </div>
      <div className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container22() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Label4 />
      <Input4 />
    </div>
  );
}

function Container23() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-700 text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Account Status</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <div
        className="flex flex-col font-['Material_Icons:Regular',_'Noto_Sans:Regular',_sans-serif] justify-center leading-[0] relative shrink-0 text-[24px] text-green-500 text-left text-nowrap"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}
      >
        <p className="block leading-[24px] whitespace-pre">check_circle</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start pl-2 pr-0 py-0 relative shrink-0"
      data-name="Margin"
    >
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-500 text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">Phone verified</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0"
      data-name="Container"
    >
      <Container24 />
      <Margin1 />
    </div>
  );
}

function Container26() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between pb-4 pt-2 px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Container23 />
      <Container25 />
    </div>
  );
}

function Component4() {
  return (
    <div
      className="bg-[#000000] relative rounded-lg shrink-0 w-full"
      data-name="Component 2"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-center px-4 py-3 relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Bold',_sans-serif] font-bold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center">
            <p className="block leading-[24px]">Save Changes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Form"
    >
      <Container15 />
      <Container17 />
      <Container19 />
      <Container22 />
      <Container26 />
      <Component4 />
    </div>
  );
}

function Container27() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-0 pt-2 px-0 relative shrink-0 w-full"
      data-name="Container"
    >
      <Heading2 />
      <Form />
    </div>
  );
}

function Container28({ onBack }: ContainerProps) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start pb-10 pt-6 px-6 relative w-full">
          <Container6 onBack={onBack} />
          <Container8 />
          <Container10 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

interface BackgroundShadowProps {
  onBack?: () => void;
}

export default function BackgroundShadow({ onBack }: BackgroundShadowProps) {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative rounded-3xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-full"
      data-name="Background+Shadow"
    >
      <Container28 onBack={onBack} />
    </div>
  );
}