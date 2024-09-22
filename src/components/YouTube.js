const YouTubeEmbed = ({ id }) => {
  if (!id) {
    return null;
  }

  return (
    <div>
      <div>
        <p className="font-bold">Zapraszam Was na dłuższą relację na moim kanale YouTube</p>
      </div>
      <div className="aspect-[16/9] max-w-3xl mx-auto">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;

