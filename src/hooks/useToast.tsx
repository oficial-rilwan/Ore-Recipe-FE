import { useState } from "react";

export function useToast() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "danger">("danger");

  const triggerToast = (msg: string, type: "success" | "danger" = "danger") => {
    setMessage(msg);
    setShow(true);
    setType(type);
    setTimeout(() => {
      setShow(false);
      setMessage("");
      setType("danger");
    }, 5000);
  };

  return { show, message, triggerToast, type };
}
