// MSW 2.0 버전에서는 node 서버가 필요 없음
import { handlers } from './handlers'

// createServer() 대신 빈 객체를 내보냄
export const server = {
  listen: () => {},
  close: () => {},
  use: () => {},
  resetHandlers: () => {},
}