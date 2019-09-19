
export const unsubscribe = (socket, currencyPair) => {
  if (!socket || !currencyPair) return
  socket.send(JSON.stringify({ event: 'bts:unsubscribe', data: { channel: `order_book_${currencyPair}` } }))
  socket.close();
}

export const subscribe = (currency_pair) => {
  const webSocket = new WebSocket('wss://ws.bitstamp.net/');
  webSocket.onopen = () => {
    webSocket.send(JSON.stringify({ event: 'bts:subscribe', data: { channel: `order_book_${currency_pair}` } }))
  }
  return webSocket;
}