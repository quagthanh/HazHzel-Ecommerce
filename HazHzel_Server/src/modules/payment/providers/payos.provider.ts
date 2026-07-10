import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';

export const PAYOS_INSTANCE = 'PAYOS_INSTANCE';

export const PayOSProvider: Provider = {
    provide: PAYOS_INSTANCE,
    useFactory: (configService: ConfigService) => {
        const clientId = configService.get<string>('PAYOS_CLIENT_ID');
        const apiKey = configService.get<string>('PAYOS_API_KEY');
        const checksumKey = configService.get<string>('PAYOS_CHECKSUM_KEY');

        return new PayOS({
            clientId: clientId,
            apiKey: apiKey,
            checksumKey: checksumKey
        });
    },
    inject: [ConfigService],
};