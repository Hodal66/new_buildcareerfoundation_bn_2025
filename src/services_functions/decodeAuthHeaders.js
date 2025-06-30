import jwt from "jsonwebtoken";
import config from "../../config";

export function decodeAuthHeaders(authHeader) {
  const token = authHeader.replace("Bearer ", ""); // 3
  if (!token) {
    throw new Error("No token found");
  }
  const decodedData = jwt.verify(token, config.jwt.JWT_SECRET);
  console.log(decodedData);
  return decodedData;
}
