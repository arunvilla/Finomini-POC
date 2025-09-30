import imgGoldenApple from "figma:asset/704985f4456deb0ba7e2c71560c89bd07c7a1eae.png";
import imgRentAndUtilities from "figma:asset/48d26304a2e40a95a0597981a604825257629e03.png";
import imgEntertainment from "figma:asset/45d16dd6f0b9da7ae7a14ae33a9261a4d5676835.png";
import imgFoodAndDrinks from "figma:asset/8728476bf6ae9dbdf70d850fbba076a8c51e468f.png";
import imgIncome from "figma:asset/89305583e38371756425c875d75a65d6667339d9.png";
import imgTransportation from "figma:asset/6a2df664c11d44c7279b5ff120a5c72a0a128462.png";
import imgBankFee from "figma:asset/e03996f2824e49b406627889e2ffdd15502c6dd9.png";
import imgPersonalCare from "figma:asset/ad62f618ba1fe54c34ad80c2cbe558a573feb2e7.png";
import imgLoanPayments from "figma:asset/fb9735029a2bc7481820b76a910a3af4c15c7dc4.png";
import imgGovNpo from "figma:asset/a1697221309b1dbbea9137fe27eb7dc18312306f.png";
import imgMedical from "figma:asset/680746d49d670880cd2b810f55991ad8eeb184e8.png";
import imgTravel from "figma:asset/7c0308bc8289f190c558fd0c84a79bf1999b9bde.png";
import imgHomeImprovements from "figma:asset/dbfae6140841c869b560ed812c32547c23c5eb26.png";
import imgDocumentWithCheckMark from "figma:asset/c59c709daf1b13b6023531e0be43121c672ea4ec.png";
import imgArrow from "figma:asset/d5b7f0b04d613a7a2d32a4372a0bd0d5c352bea6.png";
import imgGeneralServices from "figma:asset/b10423c488ea93497a5eda8cdb98e601492a6eef.png";

function Heading() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="heading">
      <p className="basis-0 font-['DM_Sans:bold',_sans-serif] grow leading-[40px] min-h-px min-w-px not-italic relative shrink-0 text-[#18312d] text-[32px]">Finomini Illustrations</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Heading">
      <Heading />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1089 2">
            <path d="M0 1H1089" id="Line" stroke="var(--stroke-0, #1C2B36)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function GeneralMerchandise() {
  return (
    <div className="h-[85px] relative shrink-0 w-[80px]" data-name="General merchandise">
      <div className="absolute bottom-0 left-0 right-[11.25%] top-0" data-name="golden apple">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[99.8%] left-0 max-w-none top-[0.1%] w-[112.68%]" src={imgGoldenApple} />
        </div>
      </div>
    </div>
  );
}

function RentAndUtilities() {
  return (
    <div className="h-[70px] relative shrink-0 w-[80px]" data-name="Rent and utilities">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgRentAndUtilities} />
    </div>
  );
}

function Entertainment() {
  return (
    <div className="h-[60px] relative shrink-0 w-[80px]" data-name="Entertainment">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgEntertainment} />
    </div>
  );
}

function FoodAndDrinks() {
  return (
    <div className="h-[44px] relative shrink-0 w-[80px]" data-name="Food and drinks">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgFoodAndDrinks} />
    </div>
  );
}

function Income() {
  return (
    <div className="h-[52px] relative shrink-0 w-[80px]" data-name="Income">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgIncome} />
    </div>
  );
}

function Transportation() {
  return (
    <div className="h-[47px] relative shrink-0 w-[80px]" data-name="Transportation">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgTransportation} />
    </div>
  );
}

function BankFee() {
  return (
    <div className="h-[58px] relative shrink-0 w-[80px]" data-name="Bank_fee">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgBankFee} />
    </div>
  );
}

function PersonalCare() {
  return (
    <div className="h-[63px] relative shrink-0 w-[64px]" data-name="Personal care">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgPersonalCare} />
    </div>
  );
}

function LoanPayments() {
  return (
    <div className="h-[92px] relative shrink-0 w-[80px]" data-name="Loan payments">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgLoanPayments} />
    </div>
  );
}

function GovNpo() {
  return (
    <div className="h-[64px] relative shrink-0 w-[89px]" data-name="Gov & npo">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgGovNpo} />
    </div>
  );
}

function Medical() {
  return (
    <div className="h-[76px] relative shrink-0 w-[60px]" data-name="Medical">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgMedical} />
    </div>
  );
}

function Travel() {
  return (
    <div className="h-[80px] relative shrink-0 w-[49px]" data-name="Travel">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgTravel} />
    </div>
  );
}

function HomeImprovements() {
  return (
    <div className="h-[64px] relative shrink-0 w-[100px]" data-name="Home improvements">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgHomeImprovements} />
    </div>
  );
}

function TransferOut() {
  return (
    <div className="h-[97px] relative shrink-0 w-[90px]" data-name="Transfer out">
      <div className="absolute h-[85px] left-0 top-0 w-[80.265px]" data-name="document with check mark">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgDocumentWithCheckMark} />
      </div>
      <div className="absolute flex h-[56.801px] items-center justify-center left-[29px] top-[43px] w-[60.507px]">
        <div className="flex-none rotate-[30deg]">
          <div className="h-[37.891px] relative w-[48px]" data-name="arrow">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TransferIn() {
  return (
    <div className="h-[97px] relative shrink-0 w-[93px]" data-name="Transfer in">
      <div className="absolute h-[85px] left-0 top-0 w-[80.265px]" data-name="document with check mark">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgDocumentWithCheckMark} />
      </div>
      <div className="absolute flex h-[56.801px] items-center justify-center left-[32px] top-[40px] w-[60.507px]">
        <div className="flex-none rotate-[210deg]">
          <div className="h-[37.891px] relative w-[48px]" data-name="arrow">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralServices() {
  return (
    <div className="h-[64px] relative shrink-0 w-[90px]" data-name="General services">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgGeneralServices} />
    </div>
  );
}

function Illustrations() {
  return (
    <div className="content-center flex flex-wrap gap-[10px] items-center relative shrink-0 w-full" data-name="Illustrations">
      <GeneralMerchandise />
      <RentAndUtilities />
      <Entertainment />
      <FoodAndDrinks />
      <Income />
      <Transportation />
      <BankFee />
      <PersonalCare />
      <LoanPayments />
      <GovNpo />
      <Medical />
      <Travel />
      <HomeImprovements />
      <TransferOut />
      <TransferIn />
      <GeneralServices />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:bold',_sans-serif] leading-[28px] not-italic relative shrink-0 text-[#18312d] text-[20px] text-nowrap whitespace-pre">Categories</p>
      <Illustrations />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full">
      <Frame55 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col gap-[54px] items-start relative shrink-0 w-full">
      <Heading1 />
      <Frame57 />
    </div>
  );
}

export default function Illustrations1() {
  return (
    <div className="bg-[#f6f7f9] relative size-full" data-name="Illustrations">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-start p-[80px] relative size-full">
          <Frame59 />
        </div>
      </div>
    </div>
  );
}