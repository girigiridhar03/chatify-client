export function getSender(loggedIn, users) {
  return users[0]?._id === loggedIn ? users[1] : users[0];
}
