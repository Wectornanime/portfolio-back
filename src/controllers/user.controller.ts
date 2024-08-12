import { Request, Response } from 'express';

export function getAllUsers(req: Request, resp: Response) {
    const usersTemp = [
        {
            id: '001',
            name: 'tester',
            email: 'tester@test.com',
            role: 'USER'
        },
        {
            id: '002',
            name: 'tester2',
            email: 'tester2@test.com',
            role: 'USER'
        }
    ];

    return resp.status(200).json(usersTemp);
}
