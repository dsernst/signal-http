export function extractSender(str: string): {
  fromName: string
  fromPhone: string
  recipient: string
} | void {
  const regex = /Envelope from: “([^”]*)”\s+\+(\d+)\s+\(.*\)\s+to\s+\+(\d+)/
  const matches = str.match(regex)
  if (matches) {
    return {
      fromName: matches[1],
      fromPhone: matches[2],
      recipient: matches[3],
    }
  }
  console.log('No match found for:', str)
}
// const example =
//   'Envelope from: “David E” +15555555555 (device: 4) to +14444444444'
// console.log(extractSender(example)) // { fromName: 'David E', fromPhone: '+15555555555', recipient: '+14444444444' }
