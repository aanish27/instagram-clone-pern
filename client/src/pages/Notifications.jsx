import { useEffect } from "react";

function Notifications() {
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/events", {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      console.log(event);
    };

    return () => eventSource.close();
  }, []);

  return <div>Notifications</div>;
}

export default Notifications;
