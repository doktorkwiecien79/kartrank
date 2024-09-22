import {politykaPrywatnosci} from '../textContent';

export default function PolitykaPrywanotsci() {
  const renderParagraph = (paragraf) => {
    switch (paragraf.styl) {
      case "italic":
        return <p className="italic mb-2">{paragraf.tekst}</p>;
      case "bold":
        return <p className="font-bold mb-4">{paragraf.tekst}</p>;
      default:
        return <p className="mb-1">{paragraf.tekst}</p>;
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center w-full">
        <div className="text-left p-8 flex-grow flex-basis-3/4">
          {Object.values(politykaPrywatnosci).map((paragraf, index) => (
            <div key={index}>{renderParagraph(paragraf)}</div>
          ))}
        </div>
      </div>
    </main>
  );
}