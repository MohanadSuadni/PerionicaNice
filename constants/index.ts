import {
  acme,
  apex,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  celestial,
  echo,
  instagram,
  linkedin,
  pin,
  pulse,
  quantum,
  x,
  youtube,
} from "@/public";

/**
 * Navigacija
 */
export const navigationItems = [
  { id: 1, title: "O nama", href: "/#Onama" },
  { id: 2, title: "Usluga", href: "#USLUGE" },
  { id: 3, title: "Cenovnik", href: "#CN" },
  { id: 4, title: "FAQ", href: "#FAQ" },
  { id: 5, title: "Naši klijenti", href: "#RV" },
  { id: 6, title: "Kontakt", href: "#Kontakt" },
];

/**
 * Footer navigacija
 */
export const footerItems = [...navigationItems];

/**
 * Footer društvene mreže
 */
export const footerSocialsItems = [
  { id: 1, src: instagram, href: "/" },
  { id: 2, src: linkedin, href: "/" },
  { id: 3, src: pin, href: "/" },
  { id: 4, src: x, href: "/" },
  { id: 5, src: youtube, href: "/" },
];

/**
 * Logo marquee
 */
export const logoMarqueeItems = [
  { id: 1, src: apex },
  { id: 2, src: acme },
  { id: 3, src: celestial },
  { id: 4, src: echo },
  { id: 5, src: pulse },
  { id: 6, src: quantum },
];

/**
 * Testimonials
 */
export const testimonials = [
  { id: 1, text: "Visok kvalitet pranja uz brzu uslugu i tačnu isporuku...", src: avatar9, name: "zona__wedding_salon", username: "@vencanice zona obrenova" },
  { id: 2, text: "Vrlo kvalitetan i pokazuje veliku posvećenost.  i pažnju prema detaljima, što ovaj rad čini izuzetnim....", src: avatar1, name: "Mohannad", username: "@mohanedf308" },
  { id: 3, text: "Prezadovoljan! Sve je oprano perfektno, bez čekanja i bez greške...", src: avatar2, name: " Event Hall", username: "@prostorizavencanja" },
  { id: 4, text: "This app has completely transformed...", src: avatar3, name: "Ana.s", username: "@Ana.s1993" },
  { id: 5, text: "I was amazed at how quickly...", src: avatar4, name: "Marina1775", username: "@Marina1775" },
  { id: 6, text: "Planning and executing events...", src: avatar5, name: "Taylor Kim", username: "@taylorkimm" },
  { id: 7, text: "The customizability and integration...", src: avatar6, name: "Riley Smith", username: "@rileysmith1" },
  { id: 8, text: "Adopting this app for our team...", src: avatar7, name: "Jordan Patels", username: "@jpatelsdesign" },
  { id: 9, text: "With this app, we can easily assign...", src: avatar8, name: "Sam Dawson", username: "@dawsontechtips" },
];

/**
 * Pricing items
 */
export const pricingItems = [
  {
    id: 1,
    title: "Free",
    price: 0,
    btn: "Get for free",
    features: [
      { id: 1, feature: "Up to 5 project members" },
      { id: 2, feature: "Unlimited tasks and projects" },
      { id: 3, feature: "2GB storage" },
      { id: 4, feature: "Integrations" },
      { id: 5, feature: "Basic support" },
    ],
  },
  {
    id: 2,
    title: "Pro",
    price: 9,
    btn: "Sign up now",
    features: [
      { id: 1, feature: "Up to 50 project members" },
      { id: 2, feature: "Unlimited tasks and projects" },
      { id: 3, feature: "50GB storage" },
      { id: 4, feature: "Integrations" },
      { id: 5, feature: "Priority support" },
      { id: 6, feature: "Advanced support" },
      { id: 7, feature: "Export support" },
    ],
  },
  {
    id: 3,
    title: "Business",
    price: 19,
    btn: "Sign up now",
    features: [
      { id: 1, feature: "Up to 5 project members" },
      { id: 2, feature: "Unlimited tasks and projects" },
      { id: 3, feature: "200GB storage" },
      { id: 4, feature: "Integrations" },
      { id: 5, feature: "Dedicated account manager" },
      { id: 6, feature: "Custom fields" },
      { id: 7, feature: "Advanced analytics" },
      { id: 8, feature: "Export capabilities" },
      { id: 9, feature: "API access" },
      { id: 10, feature: "Advanced security features" },
    ],
  },
];
