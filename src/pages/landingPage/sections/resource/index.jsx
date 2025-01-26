import { motion } from "framer-motion";
import OutlinedButton from "../../components/common/buttons/OutlinedButton";
import Filter from "./Filter";
import ResourceNftCard from "./ResourceNftCard";
import { nftData } from "./data.js";
import { Link } from "react-router-dom";

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
    rotate: 30,
    scale: 0,
    opacity: 0,
  },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

const Resource = () => {
  return (
    <section
      id="resource"
      aria-label="resource section"
      className="bg-neutral-200"
    >
      <div className="container tablet:px-10 laptop:px-20 | py-16">
        <div className="space-y-10">
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 1, delay: 0.3 }}
            className="text-800 text-neutral-900 font-bold font-['Integral_CF',_sans-serif] leading-tight"
          >
            Discover More Accounts
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ type: "spring", duration: 1, delay: 1.5 }}
          >
            <Filter />
          </motion.div>

          <motion.div
            variants={pictureContainerVariant}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 mobile-lg:grid-cols-2 laptop:grid-cols-3 min-[1360px]:grid-cols-4 gap-10"
          >
            {nftData.map((item) => (
              <motion.div variants={pictureChildVariant} key={item.id}>
                <ResourceNftCard item={item} />
              </motion.div>
            ))}
          </motion.div>

          <Link to="/product/instagram">
            <OutlinedButton
              type="button"
              extraClasses="px-10 py-5 text-600 font-medium bg-neutral-300 leading-tight mx-auto"
            >
              Load More
            </OutlinedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Resource;
