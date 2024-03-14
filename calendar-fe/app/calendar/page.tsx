export default function Calendar() {
  return (
    <main>
      {[...Array(100)].map((_, i) => (
        <h2 key={i}>Calendar</h2>
      ))}
    </main>
  );
}
