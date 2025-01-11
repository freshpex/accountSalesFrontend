import { motion } from "framer-motion";
import dotsBg from "../../../../assets/images/miscellaneous/dots.png";
import Picture from "../../components/common/Picture";
import ContainedButton from "../../components/common/buttons/ContainedButton";
import Slider from "./Slider";

export default function Hero() {
    return (
        <section
            aria-label="hero section"
            className="bg-neutral-100"
        >
            <div className="container tablet:px-10 laptop:px-20 | pb-32 pt-14 | relative z-[0]">
                <div className="grid grid-cols-1 min-[1300px]:grid-cols-[minmax(auto,_620px),_minmax(auto,_570px)] justify-between items-center gap-y-20">

                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", duration: 1, delay: 0.3 }}
                        className="flex flex-col justify-between gap-y-8 gap-x-24 laptop:max-[1300px]:flex-row | max-laptop:max-w-xl max-laptop:mx-auto">
                        <div>
                            <h1 className="text-900 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight | max-w-xl mb-6">
                                Buy and Sell Premium Social Media Accounts
                            </h1>

                            <p className="text-600 text-neutral-600 leading-relaxed | max-w-[470px] mb-10">Secure marketplace for verified social media accounts. Purchase established accounts with real followers. Instagram, TikTok, YouTube, Facebook, and WhatsApp Business accounts available.</p>

                            <ContainedButton
                                type="button"
                                extraClasses="min-[1224px]:max-[1300px]:hidden | px-10 py-5 text-600 font-medium leading-tight"
                            >
                                Explore Now
                            </ContainedButton>
                        </div>

                        <div className="grow | space-y-6 | mobile-lg:max-w-[400px]">
                            <div className="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4">
                                <div>
                                    <p className="text-900 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight">50K+</p>
                                    <p className="text-600 text-neutral-600 leading-relaxed">Accounts Sold</p>
                                </div>
                                <div>
                                    <p className="text-900 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight">8K+</p>
                                    <p className="text-600 text-neutral-600 leading-relaxed">Active Listings</p>
                                </div>
                                <div>
                                    <p className="text-900 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight">12K+</p>
                                    <p className="text-600 text-neutral-600 leading-relaxed">Happy Clients</p>
                                </div>
                            </div>

                            <ContainedButton
                                type="button"
                                extraClasses="min-[1300px]:hidden max-[1224px]:hidden | px-10 py-5 text-600 font-medium leading-tight"
                            >
                                Explore Now
                            </ContainedButton>
                        </div>
                    </motion.div>

                    <Slider
                        smallerDeviceExtraClasses="min-[1300px]:hidden"
                        largerDeviceExtraClasses="hidden min-[1300px]:block"
                    />
                </div>

                <div className="absolute bottom-40 left-6 -z-10">
                    <Picture
                        src={dotsBg}
                        alt="background Image positioned with hero section"
                        extraClasses=""
                    />
                </div>
            </div>
        </section>
    );
}
