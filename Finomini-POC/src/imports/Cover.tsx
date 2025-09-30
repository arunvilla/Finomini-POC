import svgPaths from "./svg-drek2fqdxf";
import imgBackgroundPatternDark from "figma:asset/69740d6f92cbd5a97c4e9725e20850203547ee4e.png";
import imgLogoPng1 from "figma:asset/ada7cc34c0e562f71ac6f5c431b7dfd977d0cd71.png";
import imgScreenshot from "figma:asset/9d85577000e1f4ba96b2aac00847f23f4a09c66c.png";
import imgFile1 from "figma:asset/ddd80bd431a7415a04e46cd02b68dd652973c501.png";
import imgIPhone14Pro2 from "figma:asset/c5454dd63c2c3f96a720608d964ba3c04fcaa97f.png";

function BackgroundPatternDark() {
  return (
    <div className="absolute h-[920px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1460px]" data-name="Background Pattern / Dark">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-gradient-to-b from-[#121212] inset-0 to-[#000000]" />
        <div className="absolute bg-repeat bg-size-[22.4px_22.4px] bg-top-left inset-0 mix-blend-screen" style={{ backgroundImage: `url('${imgBackgroundPatternDark}')` }} />
      </div>
    </div>
  );
}

function FigmaLogo1() {
  return (
    <div className="absolute inset-[10%_23.16%_10%_23.5%]" data-name="Figma-logo 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 64">
        <g clipPath="url(#clip0_4033_226)" id="Figma-logo 1">
          <path d={svgPaths.p1e869100} fill="var(--fill-0, #0ACF83)" id="path0 fill" />
          <path d={svgPaths.p13d5aa70} fill="var(--fill-0, #A259FF)" id="path1 fill" />
          <path d={svgPaths.p26c47500} fill="var(--fill-0, #F24E1E)" id="path1 fill 1" />
          <path d={svgPaths.p873eb70} fill="var(--fill-0, #FF7262)" id="path2 fill" />
          <path d={svgPaths.pe6ad580} fill="var(--fill-0, #1ABCFE)" id="path3 fill" />
        </g>
        <defs>
          <clipPath id="clip0_4033_226">
            <rect fill="white" height="64" width="42.6752" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AppsFigma() {
  return (
    <div className="overflow-clip relative shrink-0 size-[80px]" data-name="Apps / figma">
      <FigmaLogo1 />
    </div>
  );
}

function Themes() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-center overflow-clip p-[4px] relative shrink-0" data-name="_Themes">
      <div className="h-[36px] relative shrink-0 w-[33.998px]" data-name="Theme">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 36">
          <path clipRule="evenodd" d={svgPaths.p4265180} fill="var(--fill-0, #C8E9C8)" fillRule="evenodd" id="Theme" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#c8e9c8] text-[10px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Themes</p>
      </div>
    </div>
  );
}

function Styles() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-center overflow-clip p-[4px] relative shrink-0" data-name="_Styles">
      <div className="h-[36px] relative shrink-0 w-[38.978px]" data-name="Subtract">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 36">
          <path clipRule="evenodd" d={svgPaths.p3c729980} fill="var(--fill-0, #C8E9C8)" fillRule="evenodd" id="Subtract" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#c8e9c8] text-[10px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Styles</p>
      </div>
    </div>
  );
}

function Prototype() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] items-center overflow-clip p-[4px] relative shrink-0" data-name="_Prototype">
      <div className="h-[36px] relative shrink-0 w-[37.636px]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-5.31%]" style={{ "--stroke-0": "rgba(200, 233, 200, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 42 40">
            <path d={svgPaths.p3ceab450} id="Vector" stroke="var(--stroke-0, #C8E9C8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#c8e9c8] text-[10px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">Prototype</p>
      </div>
    </div>
  );
}

function FileFeatures() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-[351.978px]" data-name="_File Features">
      <Themes />
      <Styles />
      <Prototype />
    </div>
  );
}

function LogoLockup() {
  return (
    <div className="absolute content-stretch flex gap-[40px] h-[126px] items-center left-[140px] overflow-clip top-[658px]" data-name="Logo / Lockup">
      <AppsFigma />
      <div className="bg-[#a7a9ac] h-[50px] shrink-0 w-[1.308px]" data-name="Divider" />
      <FileFeatures />
    </div>
  );
}

function Brand() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[126px] items-center justify-center left-[83px] top-[67px] w-[358px]" data-name="Brand">
      <div className="relative shrink-0 size-[80px]" data-name="Logo_png 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogoPng1} />
      </div>
      <p className="font-['Inter:bold',_sans-serif] leading-[64px] not-italic relative shrink-0 text-[#c8e9c8] text-[52px] text-center text-nowrap whitespace-pre">Finomini</p>
    </div>
  );
}

function Shadow() {
  return <div className="absolute bg-[rgba(32,65,60,0.76)] bottom-0 left-[1%] right-[1%] rounded-[50px] shadow-[0px_0px_50px_0px_rgba(32,65,60,0.55)] top-0" data-name="Shadow" />;
}

function Screenshot() {
  return (
    <div className="absolute inset-[1.94%_4.44%_1.94%_4.67%] rounded-[15px]" data-name="Screenshot">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[15px] size-full" src={imgScreenshot} />
    </div>
  );
}

function Frame375() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[151px]">
      <div className="h-[107.68px] relative shrink-0 w-[90px]" data-name="file 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[140.32%] left-[-33.49%] max-w-none top-[-20.93%] w-[167.89%]" src={imgFile1} />
        </div>
      </div>
      <p className="font-['Inter:bold',_sans-serif] leading-[44px] not-italic opacity-80 relative shrink-0 text-[#20413c] text-[36px] text-nowrap whitespace-pre">Finomini</p>
    </div>
  );
}

function IPhone13142() {
  return (
    <div className="absolute h-[592px] left-[13px] rounded-[12px] top-[12px] w-[274px]" data-name="iPhone 13 & 14 - 2">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[592px] items-center justify-center px-[120px] py-[323px] relative w-[274px]">
          <Frame375 />
        </div>
      </div>
    </div>
  );
}

function Lens() {
  return (
    <div className="absolute inset-[23.53%_6.96%_26.47%_78.26%]" data-name="Lens">
      <div className="absolute bottom-[-25%] left-[-25.37%] right-[-25.37%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 15">
          <g id="Lens">
            <g filter="url(#filter0_f_4033_235)" id="Ellipse 1">
              <path d={svgPaths.p10c46600} fill="url(#paint0_linear_4033_235)" fillOpacity="0.3" />
            </g>
            <g filter="url(#filter1_f_4033_235)" id="Ellipse 2">
              <path d={svgPaths.p12912640} fill="var(--fill-0, #2C2C2C)" />
            </g>
            <g filter="url(#filter2_f_4033_235)" id="Ellipse 3">
              <ellipse cx="8.91304" cy="4.58823" fill="var(--fill-0, #616198)" rx="1.04348" ry="0.352941" />
            </g>
            <g filter="url(#filter3_f_4033_235)" id="Ellipse 4">
              <ellipse cx="8.91304" cy="6.70588" fill="var(--fill-0, #1D6FAB)" rx="0.347826" ry="0.352941" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="12" id="filter0_f_4033_235" width="17.8261" x="0" y="3">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4033_235" stdDeviation="1.5" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="8.35294" id="filter1_f_4033_235" width="8.26087" x="4.78261" y="1.82353">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4033_235" stdDeviation="0.5" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2.70588" id="filter2_f_4033_235" width="4.08696" x="6.86957" y="3.23529">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4033_235" stdDeviation="0.5" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="2.70588" id="filter3_f_4033_235" width="2.69565" x="7.56522" y="5.35294">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4033_235" stdDeviation="0.5" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4033_235" x1="8.91304" x2="8.91304" y1="0" y2="12">
              <stop offset="0.34375" stopColor="#6D4767" stopOpacity="0" />
              <stop offset="1" stopColor="#6D4767" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Island() {
  return (
    <div className="absolute h-[24px] left-[110px] top-[20px] w-[80px]" data-name="Island">
      <div className="absolute bg-black inset-0 rounded-[50px]" data-name="Island" />
      <Lens />
    </div>
  );
}

function Device() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Device">
      <IPhone13142 />
      <div className="absolute bottom-[-0.01%] left-0 right-0 top-0" data-name="iPhone14pro2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgIPhone14Pro2} />
      </div>
      <Island />
    </div>
  );
}

function Device14Pm() {
  return (
    <div className="absolute h-[614.019px] left-[1100px] top-[130px] w-[300px]" data-name="Device 14PM">
      <Shadow />
      <Screenshot />
      <Device />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[140px] top-[412px]" data-name="Text">
      <p className="font-['Inter:bold',_sans-serif] leading-[112px] not-italic relative shrink-0 text-[96px] text-white w-[1100px]">Design Files</p>
    </div>
  );
}

function StatusIndicator() {
  return (
    <div className="absolute bg-[#f06e06] bottom-[499px] box-border content-stretch flex gap-[24px] items-center left-[140px] px-[24px] py-[17px] rounded-[5px]" data-name="_Status Indicator">
      <p className="font-['DM_Sans:bold',_sans-serif] leading-[44px] not-italic relative shrink-0 text-[36px] text-nowrap text-white whitespace-pre">DSGN. In Progress</p>
    </div>
  );
}

export default function Cover() {
  return (
    <div className="relative size-full" data-name="Cover">
      <BackgroundPatternDark />
      <div className="absolute bg-[#18312d] h-[939px] left-[-24px] mix-blend-lighten top-[-29px] w-[1488px]" />
      <LogoLockup />
      <Brand />
      <Device14Pm />
      <Text />
      <StatusIndicator />
    </div>
  );
}