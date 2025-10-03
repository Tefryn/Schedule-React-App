const Button = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={onClick}>
    {text}
  </button>
);

export { Button };