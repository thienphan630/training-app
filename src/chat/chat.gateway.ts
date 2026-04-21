import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép từ mọi nguồn, Dev only
  },
  namespace: '/chat'
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly jwtService: JwtService) { }

  @WebSocketServer()
  server: Server;

  // ═══════════════════════════════════════════
  // LIFECYCLE HOOKS
  // ═══════════════════════════════════════════

  afterInit(server: any) {
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      //Get token form auth or headers
      const token = client.handshake.auth?.token?.replace('Bearer ', '') ||
        client.handshake.headers?.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('Token không được cung cấp');
      }

      const payload = await this.jwtService.verifyAsync(token);

      client.data.user = payload;
      this.logger.log(`User "${payload.username}" connected (${client.id})`);

      // Gửi event chào mừng
      client.emit('welcome', {
        message: 'Hello from the other side!',
        yourId: client.id,
        time: new Date().toISOString(),
      })
    } catch (error) {
      this.logger.error(`Auth failed for ${client.id}: ${error.message}`);
      client.emit('error', { message: 'Xác thực thất bại' });
      client.disconnect(true);//Ngắt kết nối ngay lập tức
    }
  }

  handleDisconnect(client: any) {
    this.logger.warn(`Client disconnected: ${client.id}`);
  }

  // ═══════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log(`Ping from ${client.id}: ${JSON.stringify(data)}`);

    return { event: 'pong', data: { message: 'PONG!', time: Date.now() } };
  }
}
