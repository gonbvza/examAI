import {
  faFilePdf,
  faCircleQuestion,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import FeatureCard from "./FeatureCard";
import TestimonyCard from "./TestimonyCard";
import BillingCard from "./BillingCard";
import FAQSection from "./FAQsection";
import ContactPage from "./Contact";

import { faqData } from "./FAQrows";

const Landing = () => {
  return (
    <div>
      <div className="title-section bg-gradient-to-r from-[#6366F1]/5 to-[#F59E0B]/5 px-[200px] py-[200px] min-h-[700px] flex items-start justify-center">
        <div className="flex flex-col items-center gap-[16px]">
          <h1 className="text-5xl font-bold">
            Transform your study materials with
            <span className="text-[#6366F1]"> AI</span>
          </h1>
          <p className="text-xl font-semibold text-[#4B5563] max-w-[64%] text-center">
            Upload PDFs and text documents to instantly generate comprehensive
            summaries and practice questions powered by advanced AI
          </p>
          <div className="start-button purple-bg rounded-lg cursor-pointer transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
            <button className="px-[30px] py-[10px] text-white text-lg font-semibold cursor-pointer">
              Start now
            </button>
          </div>
        </div>
      </div>

      <div className="features p-[64px] flex flex-col items-center text-center gap-[64px] bg-white">
        <div className="title">
          <p className="text-3xl font-bold">Powerful AI Features</p>
          <p className="text-lg text-[#4B5563] font-bold">
            Everything you need to excel in your studies
          </p>
        </div>
        <div className="flex gap-[32px]">
          <FeatureCard
            icon={faFilePdf}
            title="Smart Study mode"
            description={
              "Upload any PDF document and get instant AI-powered analysis and summaries"
            }
          />
          <FeatureCard
            icon={faCircleQuestion}
            title="Smart Questions"
            description={
              "Generate practice questions automatically from your study materials"
            }
          />
          <FeatureCard
            icon={faClipboardList}
            title="Quick Summaries"
            description={
              "Get concise, comprehensive summaries of lenghty documents in seconds"
            }
          />
        </div>
      </div>
      <div className="px-[200px] py-[64px] bg-[#F9FAFB] flex justify-between">
        <div className="left-col flex flex-col gap-[26px]">
          <p className="text-3xl font-bold">About ExamAI</p>
          <p className="text-[#4B5563] text-xl max-w-3xl">
            Founded by education technology experts, ExamAI is revolutionizing
            how students prepare for exams. Our AI-powered platform has helped
            over 100,000 students improve their study efficiency by 300%.{" "}
          </p>
          <div className="numbers flex justify-around">
            <div className="number-1">
              <p className="text-3xl text-[#6366F1] font-bold">100K+</p>
              <p className="text-lg font-medium">Students</p>
            </div>
            <div className="number-1">
              <p className="text-3xl text-[#6366F1] font-bold">100K+</p>
              <p className="text-lg font-medium">Documents</p>
            </div>
          </div>
        </div>
        <div className="right-col max-w-[550px]">
          <img
            className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300   hover:border-indigo-200"
            src="../../../public/assets/people.jpg"
            alt="Image with people"
          />
        </div>
      </div>
      <div className="features p-[64px] flex flex-col items-center text-center gap-[64px] bg-white">
        <div className="title">
          <p className="text-3xl font-bold">What students say</p>
        </div>
        <div className="flex gap-[32px]">
          <TestimonyCard
            study={"Medical sciences, Eindhoven"}
            title="Pedro Cristos"
            description={
              "ExamAI helped me summarize 500-page textbooks in minutes. My exam scores improved by 40%!"
            }
          />
          <TestimonyCard
            study={"Visual Communication, Montvallon"}
            title="Sofia Dubois"
            description={
              "Thanks to ExamAI, I understood complex topics faster and aced my finals effortlessly!"
            }
          />
          <TestimonyCard
            study={"Computer Engineering, Firenze"}
            title="Luca Bellandi"
            description={
              "ExamAI saved me hours of study time and boosted my grades like never before."
            }
          />
        </div>
      </div>
      <div className="billing py-[64px] bg-[#F9FAFB] flex flex-col items-center gap-5">
        <div className="title text-center">
          <p className="text-3xl font-semibold">Choose Your Plan</p>
          <p className="text-[#4B5563] text-xl font-semibold">
            Start free, upgrade when you need more
          </p>
        </div>
        <div className="flex justify-around gap-30">
          <BillingCard
            planName="Free"
            price={0}
            period="month"
            features={[
              "5 documents/month",
              "Basic summaries",
              "10 questions/month",
            ]}
            buttonText="Get started"
            onButtonClick={() => console.log("Free plan selected")}
          />

          <BillingCard
            planName="Pro"
            price={5}
            period="month"
            features={[
              "Unlimited documents",
              "Advanced AI summaries",
              "Priority support",
              "Custom integrations",
            ]}
            buttonText="Start free trial"
            isPopular={true}
            onButtonClick={() => console.log("Pro plan selected")}
          />
        </div>
      </div>
      <div className="bg-white">
        <FAQSection faqs={faqData} />
      </div>
      <div>
        <ContactPage/>
            </div>  
    </div>
  );
};

export default Landing;
