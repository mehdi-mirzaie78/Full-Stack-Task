interface DateTimeProps {
  dateTimeString: string;
}

const DateTime: React.FC<DateTimeProps> = ({ dateTimeString }) => {
  const date = new Date(dateTimeString);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <time dateTime={dateTimeString} className="text-gray-500 text-xs my-auto">
      <span className="font-semibold">{formattedDate}</span>{" "}
      <span className="text-blue-500">{formattedTime}</span>
    </time>
  );
};

export default DateTime;
