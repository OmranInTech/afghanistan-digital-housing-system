import { useCitizensQueue } from "../features/citizens/useCitizensQueue";
import CitizenQueueList from "../features/citizens/CitizenQueueList";

export default function CitizensQueue() {
  const { data, loading, action } = useCitizensQueue();

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>Citizen Verification Queue</h2>

      <CitizenQueueList data={data} onAction={action} />
    </div>
  );
}