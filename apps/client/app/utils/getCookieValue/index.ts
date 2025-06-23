function getCookieValue(
  cookieHeader: string,
  cookieName: string
): string | undefined {
  if (!cookieHeader) return undefined
  // Split cookies and find the token
  const cookies = cookieHeader.split(';').map((c) => c.trim())
  const tokenCookie = cookies.find((c) => c.startsWith(`${cookieName}=`))
  if (!tokenCookie) return undefined
  // Return the value after 'token='
  return decodeURIComponent(tokenCookie.split('=')[1] || '')
}

export default getCookieValue
