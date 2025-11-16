import { OnboardingFlow } from '../OnboardingFlow';

export default function OnboardingFlowExample() {
  const handleComplete = (data: any) => {
    console.log('Onboarding completed with data:', data);
  };

  return <OnboardingFlow onComplete={handleComplete} />;
}
