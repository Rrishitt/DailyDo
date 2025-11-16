import { EmptyState } from '../EmptyState';

export default function EmptyStateExample() {
  return <EmptyState onCreateTask={() => console.log('Create task clicked')} />;
}
