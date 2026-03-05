export interface TeamMember {
  name: string;
  role: string;
  photo: string | null;
  bio: string;
  links: { label: string; url: string }[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ms Diana Monteiro",
    role: "Faculty Convenor",
    photo: "/core_team/diana.webp",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Dr Shrisha H.S",
    role: "Faculty Convenor",
    photo: "/core_team/shirsha.webp",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Ashley Cleon Pinto",
    role: "Lead Organizer",
    photo: "/core_team/ashley.webp",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Shovin Jeson Dsouza",
    role: "Lead Organizer",
    photo: "/core_team/shovin.webp",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Priyal Saldanha",
    role: "Lead Organizer",
    photo: "/core_team/priyal.webp",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Ankit Shah",
    role: "Lead Organizer",
    photo: "/core_team/ankit.webp",
    bio: "Mastermind behind HackToFuture. Loves chaos, coffee, and clean code.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Viona Noronha",
    role: "Logistics & Accomodation Lead",
    photo: "/core_team/viona.webp",
    bio: "Full-stack wizard. Turns caffeine into APIs at alarming speed.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Melroy Almeida",
    role: "Logistics & Accomodation Lead",
    photo: "/core_team/melroy.webp",
    bio: "Full-stack wizard. Turns caffeine into APIs at alarming speed.",
    links: [
      { label: "GitHub", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Bob Builder",
    role: "Design Lead",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Bob",
    bio: "Pixel perfectionist. If it's not aligned, it's not shipping.",
    links: [
      { label: "Dribbble", url: "#" },
      { label: "LinkedIn", url: "#" },
    ],
  },
  {
    name: "Carol Danvers",
    role: "Marketing Head",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Carol",
    bio: "Spreads the word faster than light. Social media sorcerer.",
    links: [
      { label: "Instagram", url: "#" },
      { label: "Twitter", url: "#" },
    ],
  },
  {
    name: "Dave Singh",
    role: "Sponsorship Lead",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Dave",
    bio: "Can convince anyone to sponsor anything. Charming negotiator.",
    links: [
      { label: "LinkedIn", url: "#" },
      { label: "Email", url: "#" },
    ],
  },
  {
    name: "Eve Torres",
    role: "Logistics Coordinator",
    photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Eve",
    bio: "Nothing escapes her spreadsheets. The backbone of operations.",
    links: [
      { label: "LinkedIn", url: "#" },
      { label: "GitHub", url: "#" },
    ],
  },
];
