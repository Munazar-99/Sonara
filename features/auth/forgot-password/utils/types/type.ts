import { z } from 'zod';
import { emailSchema } from '../zod/schema';

export type EmailFormValues = z.infer<typeof emailSchema>;
