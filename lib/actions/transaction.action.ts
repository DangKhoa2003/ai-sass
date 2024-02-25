'use server';

import { handleError } from '../utils';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';

export async function createTransaction(transaction: CreateTransactionParams) {
    try {
        await connectToDatabase();

        // Create a new transaction with a buyerId
        const newTransaction = await Transaction.create({
            ...transaction,
            buyer: transaction.buyerId,
        });

        await updateCredits(transaction.buyerId, transaction.credits);

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        handleError(error);
    }
}

export async function getTransactionById(stripeId: string) {
    try {
        await connectToDatabase();

        const transaction = await Transaction.find({ stripeId: stripeId });

        if (!transaction) throw new Error('Transaction not found');

        return JSON.parse(JSON.stringify(transaction));
    } catch (error) {
        handleError(error);
    }
}
