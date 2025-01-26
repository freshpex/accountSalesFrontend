import { motion } from "framer-motion";
import Picture from "../../components/common/Picture";

export default function MarketplaceFeaturedNftCard({
  nftCardItem,
  extraClasses,
}) {
  const { nftImg, ownerImg, title, stockCount, price, motionDelay } =
    nftCardItem || {};
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 1, delay: motionDelay }}
      className={`space-y-8 ${extraClasses}`}
    >
      <div className="h-[424px]">
        <Picture
          src={nftImg}
          alt="nft picture"
          extraClasses="rounded-3xl cursor-pointer"
        />
      </div>

      <div className="flex flex-row items-center justify-between gap-4 max-[355px]:flex-col max-[355px]:justify-center">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Picture src={ownerImg} alt="nft owner" extraClasses="" />
          </div>

          <div className="space-y-1">
            <p className="text-600 text-neutral-900 font-bold leading-tight cursor-pointer">
              {title}
            </p>
            <p>{stockCount} in the stock</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-300 font-medium leading-tight max-[355px]:text-center">
            Highest Bid
          </p>

          <div className="flex items-center justify-between gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="#3A3A3A"
            >
              <g>
                <path
                  d="M1 2V14M9 2V14M3 6H7M3 10H7M2 2L8 14M8 2L2 14"
                  stroke="#3A3A3A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <p className="text-500 font-bold leading-tight">{price} Naira</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
