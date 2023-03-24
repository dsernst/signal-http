export function extractSender(str: string): {
  senderName: string
  senderPhone: string
  recipientPhone: string
} | void {
  const regex = /Envelope from: “([^”]*)”\s+\+(\d+)\s+\(.*\)\s+to\s+\+(\d+)/
  const matches = str.match(regex)
  if (matches) {
    return {
      senderName: matches[1],
      senderPhone: matches[2],
      recipientPhone: matches[3],
    }
  }
  console.log('No match found for:', str)
}
// const example =
//   'Envelope from: “David E” +15555555555 (device: 4) to +14444444444'
// console.log(extractSender(example)) // { senderName: 'David E', senderPhone: '+15555555555', recipientPhone: '+14444444444' }
