export function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    data,
    environment: "development",
  };

  // En producción, siempre log a console para que aparezca en Vercel
  console.log(
    `[${level.toUpperCase()}] ${timestamp} - ${message}`,
    data ? JSON.stringify(data, null, 2) : ""
  );

  return logEntry;
}

export const logger = {
  info: (message, data) => log("info", message, data),
  error: (message, data) => log("error", message, data),
  warn: (message, data) => log("warn", message, data),
  debug: (message, data) => log("debug", message, data),
};
