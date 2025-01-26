import Picture from "../../components/common/Picture";
import TextButton from "../../components/common/buttons/TextButton";
import { Link } from "react-router-dom";

export default function ResourceNftCard({ item }) {
    const { img, avatar, title, price, nftNumber, totalNftNumber, timeLeft } = item || {};
    return (
        <div
            aria-label="nft card"
            className="p-3 bg-neutral-100 shadow-sm rounded-2xl hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-[223px]">
                <Picture
                    src={img}
                    alt="nft picture"
                    extraClasses="rounded-xl cursor-pointer"
                />

                <div className="absolute -bottom-4 left-3 flex items-center -space-x-3">
                    {avatar.map((avatarItem, index) =>
                        <div key={index}>
                            <Picture
                                src={avatarItem}
                                alt="nft buyer"
                                extraClasses=""
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="px-3.5 pt-6">
                <p className="text-neutral-900 text-600 font-bold leading-5 mb-[10px] cursor-pointer">{title}</p>

                <div className="flex items-center justify-between gap-4 mb-[18px]">
                    <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                        <g>
                            <path d="M1 2V14M9 2V14M3 6H7M3 10H7M2 2L8 14M8 2L2 14" stroke="#00AC4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                        <p className="text-200 font-bold text-accent-400 leading-tight">{price} Naira</p>
                    </div>

                    <p className="font-medium leading-5 text-neutral-600/80">{nftNumber} of {totalNftNumber}</p>
                </div>

                <div className="pt-[11px] border-t border-solid border-neutral-300 flex flex-wrap items-center mobile-lg:max-[635px]:justify-center max-[305px]:justify-center justify-between gap-4">
                    <p className="text-200 text-primary bg-primary/5 font-medium leading-5 px-3 py-[4.5px] rounded-full">{timeLeft} left</p>

                    <Link to='/product/instagram'>
                    <TextButton
                        type="button"
                        extraClasses="text-500 text-primary font-medium leading-tight"
                    >
                        Purchase Now
                    </TextButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}
