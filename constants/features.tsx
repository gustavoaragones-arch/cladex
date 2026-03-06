import { AiFillPieChart, AiOutlineTeam } from "react-icons/ai";
import { BsBarChartFill, BsServer } from "react-icons/bs";
import { GiLockSpy } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";

export const features = [
  {
    heading: "Guided Stage Engine",
    description:
      "Every transaction moves through eight structured stages — from intake to closing. Each stage generates tasks, tracks deadlines, and tells you exactly what comes next.",
    icon: <AiFillPieChart className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: "Offer Risk Scoring",
    description:
      "Every offer receives a deterministic 0–100 risk score based on financing type, contingencies, down payment, appraisal gap, and closing timeline. Highest price is not always the best offer.",
    icon: <BsBarChartFill className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: "Risk Radar",
    description:
      "Real-time monitoring of your transaction health. Disclosure completeness, document status, deadline compliance, and open risk flags — all visible in one place.",
    icon: <AiOutlineTeam className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: "Deadline Management",
    description:
      "Every stage automatically generates a checklist of required tasks with due dates. Nothing falls through the cracks because the engine tracks it for you.",
    icon: <BsServer className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: "Document Center",
    description:
      "Upload, organize, and track every document your transaction requires. Secure private storage with clear status indicators for what is complete and what is pending.",
    icon: <GiLockSpy className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    heading: "Professional Integration",
    description:
      "At critical stages, Cladex surfaces the right professionals — flat-fee attorneys, title companies, and review services. You decide when and whether to engage them.",
    icon: <MdDarkMode className="text-primary h-4 w-4 relative z-50" />,
  },
];
