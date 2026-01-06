// Crisis Helplines and Resources

export interface Helpline {
  name: string;
  number: string;
  description: string;
  available: string;
}

export const CRISIS_HELPLINES: Helpline[] = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 free and confidential support for people in distress",
    available: "24/7"
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    description: "Text HOME to connect with a Crisis Counselor",
    available: "24/7"
  },
  {
    name: "The Trevor Project",
    number: "1-866-488-7386",
    description: "Support for LGBTQ youth in crisis",
    available: "24/7"
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Substance abuse and mental health treatment referral",
    available: "24/7"
  }
];

export const EMERGENCY_NUMBERS = {
  EMERGENCY: "911",
  CAMPUS_SECURITY: "Campus Security (check your school)",
  LOCAL_HOSPITAL: "Nearest Emergency Room"
};
