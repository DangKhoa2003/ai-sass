'use client';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import { apiIncomingHistory, myBank } from '@/constants';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Copy, Mail, PhoneCall, Map } from 'lucide-react';
import { handleError } from '@/lib/utils';
import { createTransaction } from '@/lib/actions/transaction.action';
import { updateUser } from '@/lib/actions/user.actions';

const Checkout = ({
    plan,
    amount,
    credits,
    buyerId,
    user,
    isDisable,
}: {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
    user: CreateUserParams;
    isDisable: boolean;
}) => {
    const { toast } = useToast();
    const [isCheckout, setIsCheckout] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timeId = setInterval(() => {
            if (isCheckout) {
                onCheckout();
                setIsCheckout(false);
            }
        }, 20000);
        return () => clearInterval(timeId);
    }, [isCheckout]);

    const onCheckout = async () => {
        try {
            const response = await fetch(apiIncomingHistory);
            const data = await response.json();
            const lastPaid = data.data[data.data.length - 1];

            if (
                lastPaid.amount >= amount &&
                lastPaid.content.includes(buyerId)
            ) {
                const transaction = {
                    stripeId: uuidv4(),
                    amount: amount,
                    plan: plan,
                    credits: credits,
                    buyerId: buyerId,
                    createdAt: new Date(),
                };

                const newUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    photo: user.photo,
                    isPro: user.isPro || plan === 'Pro Package' ? true : false,
                    isPremium:
                        user.isPremium || plan === 'Premium Package'
                            ? true
                            : false,
                };
                await updateUser(user.clerkId, newUser);
                const newTransaction = await createTransaction(transaction);
                if (newTransaction) {
                    toast({
                        title: 'Thanh toán thành công',
                        duration: 5000,
                        className: 'success-toast',
                    });
                    router.prefetch('/profile');
                } else {
                    toast({
                        title: 'Thanh toán thất bại. Vui lòng liên hệ ngay bộ phận hỗ trợ của chúng tôi',
                        duration: 5000,
                        className: 'error-toast',
                    });
                }
            } else {
                toast({
                    title: 'Thanh toán thất bại. Vui lòng liên hệ ngay bộ phận hỗ trợ của chúng tôi',
                    duration: 5000,
                    className: 'error-toast',
                });
            }
        } catch (error) {
            handleError(error);
        }
    };

    const onCopy = (content: string, title: string) => {
        navigator.clipboard.writeText(content);
        toast({
            title: 'Copied ' + title + ' to the clipboard.',
            duration: 5000,
            className: 'success-toast',
        });
    };

    return (
        <section>
            <Sheet key="bottom">
                <SheetTrigger
                    onClick={() => {
                        setIsCheckout(true);
                    }}
                    disabled={isDisable}
                    className="w-full rounded-full bg-purple-gradient bg-cover text-white py-2 disabled:cursor-not-allowed disabled:bg-none disabled:bg-black/40"
                >
                    Buy Credit
                </SheetTrigger>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle className="text-center text-2xl text-black font-extrabold">
                            Payment {plan}
                        </SheetTitle>
                        <SheetDescription className="flex items-center gap-x-6">
                            <Image
                                src={`https://img.vietqr.io/image/${
                                    myBank.BANK_ID
                                }-${
                                    myBank.ACCOUNT_NO
                                }-tMEh41m.jpg?amount=${amount}&addInfo=${`${plan} - ${buyerId}`}`}
                                alt="QR Code"
                                width={280}
                                height={280}
                            />

                            <section className="flex-1">
                                <h1 className="text-2xl text-black font-semibold">
                                    Transfer via QR
                                </h1>
                                <h1 className="text-base text-black mt-4">
                                    Step 1: Open the bank app and scan the QR
                                    code.
                                </h1>
                                <h1 className="text-base text-black mt-2">
                                    Step 2: Ensure the transfer content.
                                </h1>
                                <h1 className="text-base text-black mt-2">
                                    Step 3: Make the payment.
                                </h1>
                                <h1 className="text-2xl text-black font-semibold mt-4">
                                    Manual transfer
                                </h1>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-4">
                                    <Alert>
                                        <AlertTitle>Account number</AlertTitle>
                                        <div className="flex justify-between items-center">
                                            <AlertDescription>
                                                {myBank.ACCOUNT_NO}
                                            </AlertDescription>
                                            <Copy
                                                onClick={() =>
                                                    onCopy(
                                                        myBank.ACCOUNT_NO,
                                                        'account number',
                                                    )
                                                }
                                                className="h-4 w-4 cursor-pointer"
                                            />
                                        </div>
                                    </Alert>
                                    <Alert>
                                        <AlertTitle>Account name</AlertTitle>
                                        <div className="flex justify-between items-center">
                                            <AlertDescription>
                                                TRẦN HÀ ĐĂNG KHOA
                                            </AlertDescription>
                                        </div>
                                    </Alert>

                                    <Alert>
                                        <AlertTitle>
                                            Transfer content
                                        </AlertTitle>
                                        <div className="flex justify-between items-center">
                                            <AlertDescription>
                                                {plan} {buyerId}
                                            </AlertDescription>
                                            <Copy
                                                onClick={() =>
                                                    onCopy(
                                                        `${plan} ${buyerId}`,
                                                        'transfer content',
                                                    )
                                                }
                                                className="h-4 w-4 cursor-pointer"
                                            />
                                        </div>
                                    </Alert>

                                    <Alert>
                                        <AlertTitle>Bank branch</AlertTitle>
                                        <div className="flex justify-between items-center">
                                            <AlertDescription>
                                                MB Bank - Củ Chi
                                            </AlertDescription>
                                        </div>
                                    </Alert>
                                </div>

                                <h1 className="text-2xl text-purple-500 font-semibold mt-4">
                                    ⚠️ Note:
                                </h1>
                                <h1 className="mt-4 text-base text-black">
                                    Maximum 5 minutes after the transfer time,
                                    if the system does not respond, please
                                    contact our support department immediately.
                                </h1>
                                <h1 className="flex gap-x-4 items-center text-base text-black mt-2">
                                    <PhoneCall className="h-4 w-4" />
                                    037.336.5530
                                </h1>
                                <h1 className="flex gap-x-4 items-center text-base text-black mt-2">
                                    <Mail className="h-4 w-4" />
                                    tranhadangkhoa2003@gmail.com
                                </h1>
                                <h1 className="flex gap-x-4 items-center text-base text-black mt-2">
                                    <Map className="h-4 w-4" />
                                    12 Trịnh Đình Thảo, Hòa Thạnh Ward, Tân Phú
                                    District, Ho Chi Minh City
                                </h1>
                            </section>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default Checkout;
