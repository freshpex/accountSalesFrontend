import { motion } from "framer-motion";
import Picture from "../../components/common/Picture";
import OutlinedButton from "../../components/common/buttons/OutlinedButton";

const pictureContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const pictureChildVariant = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

const imgDescContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 1.6,
      staggerChildren: 0.5,
    },
  },
};

const imgDescChildVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

export default function FeaturedNftCard({ item }) {
  const { images, title, nftOwner, ownerImg, totalItems } = item || {};
  return (
    <div className="space-y-7">
      <motion.div
        variants={pictureContainerVariant}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-3 grid-rows-3 gap-2"
      >
        {images.map((imgItem, index) => (
          <motion.div
            variants={pictureChildVariant}
            key={index}
            className={`${index !== 0 ? "h-[85px] min-[530px]:max-tablet:h-full" : "h-[272px] col-span-2 row-span-3 min-[530px]:max-tablet:col-span-3 min-[530px]:max-tablet:row-span-2"}`}
          >
            <Picture
              src={imgItem}
              alt="nft picture"
              extraClasses="rounded-xl cursor-pointer"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={imgDescContainerVariant}
        initial="hidden"
        whileInView="visible"
        className="space-y-3"
      >
        <motion.h3
          variants={imgDescChildVariant}
          className="text-600 text-neutral-900 font-bold leading-tight max-[275px]:text-center"
        >
          {title}
        </motion.h3>

        <motion.div
          variants={imgDescChildVariant}
          className="flex flex-wrap items-center justify-between max-[275px]:justify-center gap-4"
        >
          <div className="flex items-center gap-[10px]">
            <div className="h-7">
              <Picture src={ownerImg} alt="nft buyer" extraClasses="" />
            </div>
            <p className="font-semibold cursor-pointer">by {nftOwner}</p>
          </div>

          <OutlinedButton
            type="button"
            extraClasses="px-3 py-[9px] text-200 font-bold bg-neutral-300 leading-[100%]"
          >
            {totalItems}K Followers
          </OutlinedButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
