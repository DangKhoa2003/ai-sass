import Image from 'next/image';
import Link from 'next/link';
import { Suspense, lazy } from 'react';

import { Collection } from '@/components/shared/Collection';

const SplineCustom = lazy(() => import('@/components/shared/SplineCustom'));
import { navLinks } from '@/constants';
import { getAllImages } from '@/lib/actions/image.actions';
import LoadingUI from '@/components/shared/Loading';

const Home = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchQuery = (searchParams?.query as string) || '';
    const images = await getAllImages({ page, searchQuery });

    return (
        <>
            <Suspense fallback={<LoadingUI />}>
                <SplineCustom />
            </Suspense>

            <section className="home">
                <ul className="flex-center w-full gap-20">
                    {navLinks.slice(1, 6).map((link) => (
                        <Link
                            key={link.route}
                            href={link.route}
                            className="flex-center flex-col gap-2"
                        >
                            <li className="flex-center w-fit rounded-full bg-[#0D1221] p-4">
                                <Image
                                    src={link.icon}
                                    alt="image"
                                    width={24}
                                    height={24}
                                />
                            </li>
                            <p className="p-14-medium text-center text-[#0D1221]">
                                {link.label}
                            </p>
                        </Link>
                    ))}
                </ul>
            </section>
            <section className="sm:mt-12">
                <Collection
                    hasSearch={true}
                    images={images?.data}
                    searchQuery={searchQuery}
                    totalPages={images?.totalPage}
                    page={page}
                    heading="Recent Edits"
                />
            </section>
        </>
    );
};

export default Home;
