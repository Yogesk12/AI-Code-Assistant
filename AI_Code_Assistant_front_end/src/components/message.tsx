type Props = {
  message: any;
};

export default function Message({ message }: Props) {
  console.log("mess----------",message)
  return (
    <div>
      <div
        className={`message ${
          message.role === "user" ? "user" : "bot"
        }`}
      >
        {message.content || (<span className="typing">Typing...</span>
        )}
      </div>

      {/* {message.sources && (
        <div>
          <strong>Sources:</strong>
          {message.sources.map((s: any, i: number) => (
            <div key={i}>
              <p>{s.file_path}</p>
              <pre>{s.content}</pre>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}