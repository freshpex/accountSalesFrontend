import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import avatar1sm from "../../../../assets/images/avatars/avatar1sm.png";
import nftBadge from "../../../../assets/images/miscellaneous/badge.png";
import copy1 from "../../../../assets/images/nfts/copy1.png";
import copy2 from "../../../../assets/images/nfts/copy2.png";
import copy3 from "../../../../assets/images/nfts/copy3.png";
import Picture from "../../components/common/Picture";
import { getRandomTime } from "../../../../utils/getRandomTime";

const sliderData = [
    {
        title: "Verified Instagram 500K",
        ownerName: "Premium Seller",
        ownerImg: avatar1sm,
        nftImg: copy1,
        price: 2999.99,
        timeLeft: getRandomTime(),
        motionDelay: 0,
    },
    {
        title: "TikTok 1M Followers",
        ownerName: "Elite Seller",
        ownerImg: avatar1sm,
        nftImg: copy2,
        price: 3999.99,
        timeLeft: getRandomTime(),
        motionDelay: 0.3,
    },
    {
        title: "YouTube 100K Subs",
        ownerName: "Trusted Seller",
        ownerImg: avatar1sm,
        nftImg: copy3,
        price: 1999.99,
        timeLeft: getRandomTime(),
        motionDelay: 0.6,
    },
];

const pictureContainerVariant = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.6,
            staggerChildren: 0.2
        }
    }
};

const pictureChildVariant = {
    hidden: {
        y: -100,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1,
        }
    }
};

export default function Slider({ smallerDeviceExtraClasses, largerDeviceExtraClasses }) {
    return (
        <>
            <motion.div
                variants={pictureContainerVariant}
                initial="hidden"
                whileInView="visible"
                className={`relative | grid grid-cols-[minmax(220px,_1fr)_minmax(220px,_1fr)_minmax(220px,_1fr)] gap-6 overflow-x-scroll snap-x snap-mandatory | side-scrollbar-hide | ${smallerDeviceExtraClasses}`}>
                {
                    sliderData.map(({ title, ownerImg, ownerName, nftImg, price, timeLeft }, index) =>
                        <motion.div
                            variants={pictureChildVariant}
                            key={index}
                            style={{ backgroundImage: `url(${nftImg})` }}
                            className="overflow-hidden | p-6 | text-neutral-100 | bg-cover bg-center bg-no-repeat | h-[380px] | rounded-3xl | flex flex-col justify-between gap-6 | snap-start snap-always | relative before:content-[''] before:absolute before:inset-0 before:bg-neutral-900 before:opacity-20"
                        >

                            <div className="space-y-2 | relative">
                                <h3 className="text-700 font-bold leading-tight tracking-tight">{title}</h3>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8">
                                        <Picture
                                            src={ownerImg}
                                            alt="nft owner"
                                            extraClasses=""
                                        />
                                    </div>

                                    <p className="text-500 font-medium leading-tight">{ownerName}</p>
                                </div>
                            </div>

                            <div className="relative | flex flex-col min-[915px]:flex-row justify-center min-[915px]:justify-between text-center min-[915px]:text-start items-center gap-4 rounded-xl bg-neutral-100/20 backdrop-blur-xl p-4">
                                <div className="space-y-2">
                                    <p className="text-200 leading-tight">Current Price</p>

                                    <div className="flex items-center justify-between gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="white">
                                        <g>
                                            <path d="M1 2V14M9 2V14M3 6H7M3 10H7M2 2L8 14M8 2L2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                    </svg>
                                        <p className="text-400 font-medium leading-tight">{price} Naira</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-200 leading-tight">Ends in</p>
                                    <p className="text-400 leading-tight">{timeLeft}</p>
                                </div>
                            </div>

                            <div className="w-20 h-20 min-[915px]:w-28 min-[915px]:h-28 | absolute top-1/2 left-1/2 -mt-10 -ml-10 min-[915px]:-mt-14 min-[915px]:-ml-14 z-[5] animate-spin-slow">
                                <Picture src={nftBadge} alt="live auction badge for the nft" extraClasses="" />
                            </div>
                        </motion.div>
                    )
                }
            </motion.div>

            <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 1, delay: 0.6 }}
                className={`relative | w-full h-full | ${largerDeviceExtraClasses}`}
            >
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 335,
                        depth: 150,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow]}
                    className="w-full h-full"
                >
                    {
                        sliderData.map(({ title, ownerImg, ownerName, nftImg, price, timeLeft }, index) =>
                            <SwiperSlide
                                key={index}
                                className="w-auto h-auto max-w-[400px] max-h-[440px] aspect-[0.91/1] "
                            >
                                <div
                                    style={{ backgroundImage: `url(${nftImg})` }}
                                    className="bg-cover bg-center bg-no-repeat | w-full h-full | rounded-3xl p-6 text-neutral-100 | flex flex-col justify-between gap-6 | relative before:content-[''] before:absolute before:inset-0 before:bg-neutral-900 before:opacity-20 | overflow-hidden"
                                >
                                    <div className="space-y-2 | relative">
                                        <h3 className="text-800 font-bold leading-tight tracking-tight cursor-pointer">{title}</h3>

                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8">
                                                <Picture
                                                    src={ownerImg}
                                                    alt="nft owner"
                                                    extraClasses=""
                                                />
                                            </div>

                                            <p className="text-600 font-medium leading-tight">{ownerName}</p>
                                        </div>
                                    </div>

                                    <div className="relative | flex flex-col min-[351px]:flex-row justify-center min-[351px]:justify-between text-center min-[351px]:text-start items-center gap-4 rounded-xl bg-neutral-100/20 backdrop-blur-xl px-6 py-4">
                                        <div className="space-y-2">
                                            <p className="text-300 leading-tight">Current Price</p>

                                            <div className="flex items-center justify-between gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="white">
                                                <g>
                                                    <path d="M1 2V14M9 2V14M3 6H7M3 10H7M2 2L8 14M8 2L2 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                            </svg>
                                                <p className="text-500 font-medium leading-tight">{price} Naira</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-300 leading-tight">Ends in</p>
                                            <p className="text-500 leading-tight">{timeLeft}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>

                <div className="absolute bottom-28 left-8 z-[5] animate-spin-slow">
                    <Picture src={nftBadge} alt="live auction badge for the nft" extraClasses="" />
                </div>
            </motion.div>
        </>
    );
}
