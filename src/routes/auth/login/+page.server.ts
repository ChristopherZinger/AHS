import { prisma } from '$lib/server/prisma.js';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { compareSync } from 'bcrypt';
import { setSessionCookie } from '$lib/server/authCookiesUtils';
import type { TokenUser } from '$lib/server/TokenUserUtils';

// }
