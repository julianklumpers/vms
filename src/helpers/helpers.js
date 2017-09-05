export const formatTimestampToDate = (timestamp) => {
  const day       = new Date(timestamp).getDate()
  // counts from 0. so januari is 0 and februari is 1 etc...
  const month     = new Date(timestamp).getMonth() + 1
  const fullYear  = new Date(timestamp).getFullYear()

  return `${day}/${month}/${fullYear}`
}

export const formatSquareMeters = (squareMeters) => {
  return parseInt(squareMeters).toLocaleString('nl-NL') + ' m²'
}

export const formatCurrency = (currency) => {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(currency)
}

export const decodeHtmlEntity = (str) => {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec)
  })
}

export const getMaxQuotationNumber = (quotations) => {
  let quotationNumbers = []

  if(quotations) {
    for(const user in quotations) {
      for(const customer in quotations[user]) {
        for(const quotationNumber in quotations[user][customer]) {
          quotationNumbers.push(quotationNumber)
        }
      }
    }
  }
  else {
    const date = new Date()
    quotationNumbers.push(date.getFullYear() + '0000')
  }

  return Math.max(...quotationNumbers)
}
