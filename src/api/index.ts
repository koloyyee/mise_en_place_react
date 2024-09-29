
export function getLocalToken(){
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("No token");
    return null;
  }
  return token;
}
