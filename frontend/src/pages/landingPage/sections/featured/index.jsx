import { motion } from "framer-motion";
import avatar1sm from "../../../../assets/images/avatars/avatar1sm.png";
import nft1 from "../../../../assets/images/nfts/nft1.png";
import nft2 from "../../../../assets/images/nfts/nft2.png";
import nft3 from "../../../../assets/images/nfts/nft3.png";
import nft4 from "../../../../assets/images/nfts/nft4.png";
import nft5 from "../../../../assets/images/nfts/nft5.png";
import nft6 from "../../../../assets/images/nfts/nft6.png";
import nft7 from "../../../../assets/images/nfts/nft7.png";
import nft8 from "../../../../assets/images/nfts/nft8.png";
import nft9 from "../../../../assets/images/nfts/nft9.png";
import FeaturedNftCard from "./FeaturedNftCard";

const featuredNftData = [
    {
        id: 1,
        images: [nft4, nft2, nft8, nft9],
        title: 'Premium Instagram Bundle',
        nftOwner: 'Verified Seller',
        ownerImg: avatar1sm,
        totalItems: 24,
    },
    {
        id: 2,
        images: [nft1, nft8, nft2, nft3],
        title: 'TikTok Creator Pack',
        nftOwner: 'Top Seller',
        ownerImg: avatar1sm,
        totalItems: 18,
    },
    {
        id: 3,
        images: [nft6, nft5, nft7, nft2],
        title: 'YouTube Channel Bundle',
        nftOwner: 'Elite Seller',
        ownerImg: avatar1sm,
        totalItems: 15,
    },
];

export default function Featured() {
    return (
        <section
            aria-label="featured nft section"
            className="bg-neutral-200"
        >
            <div className="container tablet:px-10 laptop:px-20 | pt-16 pb-24">
                <div className="space-y-14">
                    <motion.h2
                        initial={{ y: -30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", duration: 1, delay: 0.3 }}
                        className="text-800 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight">
                        Featured Social Media Accounts
                    </motion.h2>
                    <div className="grid grid-cols-1 min-[530px]:grid-cols-2 laptop:grid-cols-3 gap-8">
                        {featuredNftData.map(item =>
                            <FeaturedNftCard key={item.id} item={item} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
