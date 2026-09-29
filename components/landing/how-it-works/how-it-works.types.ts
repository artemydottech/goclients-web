export interface HowItWorksStep {
  title: string;
  description: string;
  code?: string;
}

export interface HowItWorksProps {
  eyebrow: string;
  title: string;
  steps: HowItWorksStep[];
}
