import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  SquareTerminal,
  Map,
  Bot,
} from "lucide-react";

const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
];
const navMain = [
  {
    title: "Configurações",
    url: "/settings",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Servidor",
    url: "/server",
    icon: Bot,
    items: [{ title: "sub menu", url: "teste" }],
  },
];

export { teams, navMain, projects };
