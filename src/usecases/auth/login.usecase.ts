import { AuthService } from 'src/auth/auth.service';
import { JWTConfig } from 'src/domain/config/swt.interface';
import { ILogger } from 'src/domain/logger/logger.interface';

export class LoginUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: ILogger,
    private readonly jwtConfig: JWTConfig,
  ) {}

  // finish login use cases
}
