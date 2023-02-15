import { trpc } from "./trpc";

function App() {
  const rates = trpc.rates.useQuery();

  if (!rates.data) {
    return <div>Is loading</div>;
  }

  return (
    <div>
      {rates.data.map((rate) => (
        <div key={rate.country}>{rate.country}</div>
      ))}
    </div>
  );
}

export default App;
