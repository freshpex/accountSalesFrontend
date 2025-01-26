import { motion } from "framer-motion";
import nft10 from "../../../../assets/images/nfts/nft10.png";
import nft11 from "../../../../assets/images/nfts/nft11.png";
import nft12 from "../../../../assets/images/nfts/nft12.png";
import nft13 from "../../../../assets/images/nfts/nft13.png";
import nft14 from "../../../../assets/images/nfts/nft14.png";
import Picture from "../../components/common/Picture";

const statData = [
  {
    nftImg: nft10,
    nftName: "Instagram Verified",
    price: "2,769.99",
    priceRate: 26.52,
    state: "increased",
  },
  {
    nftImg: nft11,
    nftName: "TikTok Pro",
    price: "1,299.99",
    priceRate: 10.52,
    state: "decreased",
  },
  {
    nftImg: nft12,
    nftName: "YouTube Partner",
    price: "5,232.39",
    priceRate: 2.52,
    state: "increased",
  },
  {
    nftImg: nft13,
    nftName: "Facebook Business",
    price: "1,769.39",
    priceRate: 1.52,
    state: "increased",
  },
  {
    nftImg: nft14,
    nftName: "WhatsApp Business",
    price: "2,999.99",
    priceRate: 2.52,
    state: "decreased",
  },
];

const listContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 1.3,
      staggerChildren: 0.2,
    },
  },
};

const listChildVariant = {
  hidden: {
    y: -30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

export default function MarketplaceStatistics({ extraClasses }) {
  return (
    <div className={`space-y-5 | ${extraClasses}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 1, delay: 1.1 }}
        className="space-y-3 max-mobile-md:text-center"
      >
        <h3 className="text-600 font-bold font-['Integral_CF',_sans-serif] leading-tight">
          Top Collections over
        </h3>
        <p className="text-500 text-primary font-bold leading-tight">
          Last 7 days
        </p>
      </motion.div>

      <motion.ol
        variants={listContainerVariant}
        initial="hidden"
        whileInView="visible"
        className="divide-y divide-solid divide-neutral-400 [counter-reset:count]"
      >
        {statData.map(({ nftImg, nftName, price, priceRate, state }, index) => (
          <motion.li
            variants={listChildVariant}
            key={index}
            className="flex max-mobile-md:flex-col items-center justify-between gap-x-6 gap-y-8 py-4 | [counter-increment:count]"
          >
            <div className="flex items-center justify-start gap-5 | before:[content:counter(count)] before:text-700 before:font-bold before:leading-[100%] before:tracking-tight before:w-4 before:flex before:justify-center before:items-center">
              <div className="relative h-[60px] w-[60px]">
                <Picture
                  src={nftImg}
                  alt="nft picture"
                  extraClasses="cursor-pointer"
                />
                {(index === 0 || index === 3) && (
                  <div className="absolute -top-1.5 -right-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <rect x="8" y="10" width="16" height="11" fill="white" />
                      <path
                        d="M28.7479 14.3182L26.9345 12.2115C26.5879 11.8115 26.3079 11.0648 26.3079 10.5315V8.26483C26.3079 6.8515 25.1479 5.6915 23.7345 5.6915H21.4679C20.9479 5.6915 20.1879 5.4115 19.7879 5.06483L17.6812 3.2515C16.7612 2.46483 15.2545 2.46483 14.3212 3.2515L12.2278 5.07817C11.8278 5.4115 11.0678 5.6915 10.5478 5.6915H8.24114C6.8278 5.6915 5.6678 6.8515 5.6678 8.26483V10.5448C5.6678 11.0648 5.3878 11.8115 5.05447 12.2115L3.25447 14.3315C2.48114 15.2515 2.48114 16.7448 3.25447 17.6648L5.05447 19.7848C5.3878 20.1848 5.6678 20.9315 5.6678 21.4515V23.7315C5.6678 25.1448 6.8278 26.3048 8.24114 26.3048H10.5478C11.0678 26.3048 11.8278 26.5848 12.2278 26.9315L14.3345 28.7448C15.2545 29.5315 16.7612 29.5315 17.6945 28.7448L19.8012 26.9315C20.2012 26.5848 20.9479 26.3048 21.4812 26.3048H23.7479C25.1612 26.3048 26.3212 25.1448 26.3212 23.7315V21.4648C26.3212 20.9448 26.6012 20.1848 26.9479 19.7848L28.7612 17.6782C29.5345 16.7582 29.5345 15.2382 28.7479 14.3182ZM21.5479 13.4782L15.1079 19.9182C14.9212 20.1048 14.6679 20.2115 14.4012 20.2115C14.1345 20.2115 13.8812 20.1048 13.6945 19.9182L10.4678 16.6915C10.0811 16.3048 10.0811 15.6648 10.4678 15.2782C10.8545 14.8915 11.4945 14.8915 11.8811 15.2782L14.4012 17.7982L20.1345 12.0648C20.5212 11.6782 21.1612 11.6782 21.5479 12.0648C21.9345 12.4515 21.9345 13.0915 21.5479 13.4782Z"
                        fill="#1E93FF"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-500 font-semibold text-neutral-900 leading-[100%] tracking-tight cursor-pointer">
                  {nftName}
                </p>

                <div className="flex items-center gap-2">
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
                  <p className="font-bold text-neutral-900/60 leading-[100%] tracking-tight">
                    {price}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p
                className={`text-600 font-semibold leading-[100%] tracking-tight ${state === "increased" ? "text-accent-300" : "text-accent-900"}`}
              >{`${state === "increased" ? "+" : "-"}${priceRate}%`}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
