export type NavKey =
  | "home"
  | "about"
  | "services"
  | "pricing"
  | "faq"
  | "clients"
  | "contact"
  | "login";

export type FAQItem = {
  question: string;
  answer: string;
};

export type Dict = {
  nav: Record<NavKey, string>;

  

  
  hero: {
    title: string;
    subtitle: string;
    contact: string;
    reviews: string;
  };

  common: {
    close: string;
  };

  about: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
    vision: string;
    extra?: string;
  };

  contact: {
    title: string;
    phone: string;
    email: string;
    location: string;
    hours: string;
  };

  productShowcase: {
    title: string;
    desc: string;

    express: { title: string; text: string };
    premium: { title: string; text: string };
    eco: { title: string; text: string };
    equipment: { title: string; text: string };
  };

  usluga: {
    heading: string;
    description: string;

    title: string;
    pranjeText: string;

    susenje: string;
    susenjeText: string;

    peglanje: string;
    peglanjeText: string;

    dostava: string;
    dostavaText: string;
  };

  pricing: {
    title: string;
    button: string;
    items: {
      icon: string;
      name: string;
      price: string;
    }[];
  };

  faq: FAQItem[];

testimonials: {
    heading: string;
    label: string;
    description: string;  
    };

    "cta": {
      review: string;
      phare1: string;
      phare2: string;
      phare3: string;
      
      
      
    };


};

export type Locale = "sr" | "en" | "ru";