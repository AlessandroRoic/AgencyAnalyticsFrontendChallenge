import { useMemo } from "react";

const useByteParser = (bytes: number) => {
  const bytesToSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  const parsedBytes = useMemo(() => bytesToSize(bytes), [bytes]);

  return {
    parsedBytes,
  };
};

export default useByteParser;
